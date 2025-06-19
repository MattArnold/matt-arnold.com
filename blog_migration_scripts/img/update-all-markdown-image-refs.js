#!/usr/bin/env node

/**
 * Updates all markdown files to replace external image URLs with local references
 * regardless of whether the images were successfully downloaded or not.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const AUDIT_FILE = path.join(__dirname, 'blog-image-audit-1750289898893.json');
const BLOG_POSTS_DIR = path.join(__dirname, '..', 'src', 'blog', 'posts');
const IMAGES_BASE_URL = '/img/blog';

// Results tracking
const results = {
  totalFiles: 0,
  filesUpdated: 0,
  totalReplacements: 0,
  errors: []
};

// Helper function to escape regex special characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper function to generate safe filename
function generateSafeFilename(url, index) {
  try {
    const urlObj = new URL(url);
    let filename = path.basename(urlObj.pathname);
    
    // If no extension or filename, create one
    if (!filename || !filename.includes('.')) {
      const ext = urlObj.pathname.includes('.') ? 
        '.' + urlObj.pathname.split('.').pop() : '.jpg';
      filename = `image_${index}${ext}`;
    }
    
    // Clean filename
    filename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    // Add hash for uniqueness
    const hash = require('crypto').createHash('md5').update(url).digest('hex').substring(0, 8);
    const ext = path.extname(filename);
    const base = path.basename(filename, ext);
    
    return `${base}_${hash}${ext}`;
  } catch (error) {
    // If URL parsing fails, create a generic filename
    const hash = require('crypto').createHash('md5').update(url).digest('hex').substring(0, 8);
    return `image_${index}_${hash}.jpg`;
  }
}

// Helper function to update markdown file
function updateMarkdownFile(filePath, replacements) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let replacementCount = 0;
    
    for (const { oldUrl, newUrl } of replacements) {
      const escapedOldUrl = escapeRegex(oldUrl);
      
      // Replace markdown image patterns: ![alt](url)
      const markdownRegex = new RegExp(`!\\[([^\\]]*)\\]\\(${escapedOldUrl}\\)`, 'g');
      const markdownMatches = content.match(markdownRegex);
      if (markdownMatches) {
        content = content.replace(markdownRegex, `![$1](${newUrl})`);
        replacementCount += markdownMatches.length;
      }
      
      // Replace HTML image tags: <img src="url">
      const htmlRegex = new RegExp(`<img([^>]+)src=["']${escapedOldUrl}["']([^>]*)>`, 'gi');
      const htmlMatches = content.match(htmlRegex);
      if (htmlMatches) {
        content = content.replace(htmlRegex, `<img$1src="${newUrl}"$2>`);
        replacementCount += htmlMatches.length;
      }
      
      // Replace bare URLs that might be in image contexts
      const bareUrlRegex = new RegExp(`(?<!src=["'])\\b${escapedOldUrl}\\b(?!["'])`, 'g');
      const bareMatches = content.match(bareUrlRegex);
      if (bareMatches) {
        content = content.replace(bareUrlRegex, newUrl);
        replacementCount += bareMatches.length;
      }
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return replacementCount;
    }
    
    return 0;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    results.errors.push({
      file: filePath,
      error: error.message
    });
    return 0;
  }
}

// Main processing function
async function updateMarkdownFiles() {
  console.log('Starting markdown file updates...');
  
  // Read the audit file
  if (!fs.existsSync(AUDIT_FILE)) {
    console.error(`Audit file not found: ${AUDIT_FILE}`);
    process.exit(1);
  }
  
  const audit = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8'));
  console.log(`Found ${audit.externalImages.length} external images to process`);
  
  // Group images by post
  const imagesByPost = {};
  audit.externalImages.forEach(imageInfo => {
    const pagePath = imageInfo.page;
    const match = pagePath.match(/blog\/([^\/]+)\/index\.html/);
    if (match) {
      const postFile = `${match[1]}.md`;
      if (!imagesByPost[postFile]) {
        imagesByPost[postFile] = [];
      }
      imagesByPost[postFile].push(imageInfo);
    }
  });
  
  console.log(`Found ${Object.keys(imagesByPost).length} markdown files to update`);
  
  // Process each markdown file
  for (const [postFile, images] of Object.entries(imagesByPost)) {
    console.log(`\nProcessing ${postFile} (${images.length} images)...`);
    
    const markdownPath = path.join(BLOG_POSTS_DIR, postFile);
    if (!fs.existsSync(markdownPath)) {
      console.log(`  ↳ Markdown file not found: ${markdownPath}`);
      continue;
    }
    
    results.totalFiles++;
    
    // Create replacement mappings
    const replacements = [];
    let imageIndex = 0;
    
    for (const imageInfo of images) {
      imageIndex++;
      const { src: oldUrl } = imageInfo;
      
      // Generate the expected local path
      const filename = generateSafeFilename(oldUrl, imageIndex);
      const newUrl = `${IMAGES_BASE_URL}/${postFile.replace('.md', '')}/${filename}`;
      
      replacements.push({ oldUrl, newUrl });
    }
    
    // Update the markdown file
    const replacementCount = updateMarkdownFile(markdownPath, replacements);
    
    if (replacementCount > 0) {
      results.filesUpdated++;
      results.totalReplacements += replacementCount;
      console.log(`  ↳ Updated ${replacementCount} image references`);
    } else {
      console.log(`  ↳ No replacements needed`);
    }
  }
  
  // Print summary
  console.log('\n=== SUMMARY ===');
  console.log(`Total markdown files: ${results.totalFiles}`);
  console.log(`Files updated: ${results.filesUpdated}`);
  console.log(`Total replacements: ${results.totalReplacements}`);
  
  if (results.errors.length > 0) {
    console.log(`\nErrors encountered: ${results.errors.length}`);
    results.errors.forEach(error => {
      console.log(`  - ${error.file}: ${error.error}`);
    });
  }
  
  console.log('\nNext steps:');
  console.log('1. Review the updated markdown files');
  console.log('2. Run the site build to check for broken images');
  console.log('3. Commit the changes to git');
}

// Run the script
updateMarkdownFiles().catch(console.error);
