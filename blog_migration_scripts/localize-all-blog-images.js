#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

// Configuration
const BLOG_POSTS_DIR = path.join(__dirname, '..', 'src', 'blog', 'posts');
const IMAGES_DIR = path.join(__dirname, '..', 'src', 'img', 'blog');
const AUDIT_FILE = path.join(__dirname, 'blog-image-audit-1750289898893.json');

// Results tracking
const results = {
  totalImages: 0,
  downloaded: 0,
  failed: 0,
  updated: 0,
  errors: []
};

// Helper function to download an image
async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        return downloadImage(response.headers.location, outputPath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }
      
      const file = fs.createWriteStream(outputPath);
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(outputPath, () => {}); // Clean up partial file
        reject(err);
      });
    });
    
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.abort();
      reject(new Error('Request timeout'));
    });
  });
}

// Helper function to generate a safe filename
function generateSafeFilename(url, index) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const extension = path.extname(pathname) || '.jpg';
    const basename = path.basename(pathname, extension);
    
    // Create a hash of the URL for uniqueness
    const hash = crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
    
    // Clean up the basename
    const cleanBasename = basename.replace(/[^a-zA-Z0-9\-_]/g, '_').substring(0, 50);
    
    return `${cleanBasename}_${hash}${extension}`;
  } catch (error) {
    return `image_${index}_${crypto.createHash('md5').update(url).digest('hex').substring(0, 8)}.jpg`;
  }
}

// Helper function to update markdown files
function updateMarkdownFile(filePath, oldUrl, newUrl) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const oldContent = content;
    
    // Replace various markdown image patterns
    content = content.replace(new RegExp(`!\\[([^\\]]*)\\]\\(${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'), `![$1](${newUrl})`);
    content = content.replace(new RegExp(`<img[^>]+src=["']${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'gi'), (match) => {
      return match.replace(oldUrl, newUrl);
    });
    
    if (content !== oldContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Main processing function
async function processImages() {
  console.log('Starting image localization process...');
  
  // Read the audit file
  if (!fs.existsSync(AUDIT_FILE)) {
    console.error(`Audit file not found: ${AUDIT_FILE}`);
    process.exit(1);
  }
  
  const audit = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8'));
  console.log(`Found ${audit.externalImages.length} external images to process`);
  
  // Create directories
  fs.mkdirSync(path.join(IMAGES_DIR, 'livejournal'), { recursive: true });
  fs.mkdirSync(path.join(IMAGES_DIR, 'googlephotos'), { recursive: true });
  fs.mkdirSync(path.join(IMAGES_DIR, 'external'), { recursive: true });
  
  results.totalImages = audit.externalImages.length;
  
  // Group images by post for organization
  const imagesByPost = {};
  audit.externalImages.forEach(imageInfo => {
    // Extract post filename from page path (e.g., "blog/posts/2004-06-22-post-title/index.html" -> "2004-06-22-post-title.md")
    const pagePath = imageInfo.page;
    const match = pagePath.match(/blog\/posts\/([^\/]+)\/index\.html/);
    if (match) {
      const postFile = `${match[1]}.md`;
      if (!imagesByPost[postFile]) {
        imagesByPost[postFile] = [];
      }
      imagesByPost[postFile].push(imageInfo);
    }
  });
  
  // Process each image
  let imageIndex = 0;
  for (const [postFile, images] of Object.entries(imagesByPost)) {
    console.log(`\nProcessing ${images.length} images for ${postFile}...`);
    
    // Create a subfolder for this post's images
    const postImageDir = path.join(IMAGES_DIR, postFile.replace('.md', ''));
    fs.mkdirSync(postImageDir, { recursive: true });
    
    for (const imageInfo of images) {
      imageIndex++;
      const { src: url } = imageInfo;
      
      console.log(`[${imageIndex}/${results.totalImages}] Processing: ${url}`);
      
      try {
        // Generate safe filename
        const filename = generateSafeFilename(url, imageIndex);
        const outputPath = path.join(postImageDir, filename);
        const relativePath = `/img/blog/${path.basename(postImageDir)}/${filename}`;
        
        // Skip if already downloaded
        if (fs.existsSync(outputPath)) {
          console.log(`  ↳ Already exists: ${filename}`);
          results.downloaded++;
          
          // Update markdown file
          const markdownPath = path.join(BLOG_POSTS_DIR, postFile);
          if (fs.existsSync(markdownPath)) {
            const updated = updateMarkdownFile(markdownPath, url, relativePath);
            if (updated) {
              results.updated++;
              console.log(`  ↳ Updated markdown reference`);
            }
          }
          continue;
        }
        
        // Download the image
        await downloadImage(url, outputPath);
        console.log(`  ↳ Downloaded: ${filename}`);
        results.downloaded++;
        
        // Update markdown file
        const markdownPath = path.join(BLOG_POSTS_DIR, postFile);
        if (fs.existsSync(markdownPath)) {
          const updated = updateMarkdownFile(markdownPath, url, relativePath);
          if (updated) {
            results.updated++;
            console.log(`  ↳ Updated markdown reference`);
          }
        }
        
      } catch (error) {
        console.log(`  ↳ Failed: ${error.message}`);
        results.failed++;
        results.errors.push({
          url,
          error: error.message,
          file: postFile
        });
      }
      
      // Add a small delay to be respectful to servers
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  // Write error report
  const errorReportPath = path.join(__dirname, 'image-download-errors.json');
  fs.writeFileSync(errorReportPath, JSON.stringify(results.errors, null, 2));
  
  // Print summary
  console.log('\n=== SUMMARY ===');
  console.log(`Total images: ${results.totalImages}`);
  console.log(`Successfully downloaded: ${results.downloaded}`);
  console.log(`Failed downloads: ${results.failed}`);
  console.log(`Markdown files updated: ${results.updated}`);
  console.log(`Success rate: ${Math.round((results.downloaded / results.totalImages) * 100)}%`);
  
  if (results.errors.length > 0) {
    console.log(`\nError report written to: ${errorReportPath}`);
  }
  
  console.log('\nNext steps:');
  console.log('1. Review downloaded images in src/img/blog/');
  console.log('2. Check that the site builds correctly');
  console.log('3. Verify that images display correctly in blog posts');
  console.log('4. Commit the changes to git');
  console.log('5. Review the error report if needed');
}

// Run the script
processImages().catch(console.error);
