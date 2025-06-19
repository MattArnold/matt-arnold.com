#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Configuration
const SITE_DIR = path.join(__dirname, '_site');
const BLOG_DIR = path.join(SITE_DIR, 'blog');
const IMG_DIR = path.join(SITE_DIR, 'img');
const BASE_URL = 'http://localhost:8080'; // Adjust if your local server runs on different port

// Results storage
const results = {
  totalPages: 0,
  totalImages: 0,
  missingLocalImages: [],
  externalImages: [],
  brokenReferences: [],
  summary: {}
};

// Helper function to recursively find all HTML files in blog directory
function findBlogPages(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        traverse(itemPath);
      } else if (item.endsWith('.html')) {
        files.push(itemPath);
      }
    }
  }
  
  if (fs.existsSync(dir)) {
    traverse(dir);
  }
  
  return files;
}

// Check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

// Determine if URL is external
function isExternalUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
}

// Categorize external domains
function categorizeExternalDomain(url) {
  const domain = url.split('/')[2] || url.split('/')[0];
  
  if (domain.includes('livejournal.com')) return 'LiveJournal';
  if (domain.includes('dreamwidth.org')) return 'Dreamwidth';
  if (domain.includes('ggpht.com') || domain.includes('googleusercontent.com')) return 'Google Photos';
  if (domain.includes('picasaweb.google.com')) return 'Picasa';
  if (domain.includes('matt-arnold.com')) return 'Your Domain (External)';
  if (domain.includes('fluidityforum.org')) return 'Fluidity Forum';
  
  return 'Other External';
}

// Process a single HTML file
function processHtmlFile(filePath) {
  const relativePath = path.relative(SITE_DIR, filePath);
  console.log(`Processing: ${relativePath}`);
  
  try {
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    
    // Find all images
    const images = document.querySelectorAll('img');
    const pageResults = {
      path: relativePath,
      images: [],
      missingLocal: [],
      external: []
    };
    
    images.forEach((img, index) => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || '';
      
      if (!src) {
        pageResults.images.push({
          index: index + 1,
          src: '[NO SRC]',
          alt,
          status: 'NO_SOURCE',
          issue: 'Image tag has no src attribute'
        });
        return;
      }
      
      if (isExternalUrl(src)) {
        const category = categorizeExternalDomain(src);
        const imageInfo = {
          index: index + 1,
          src,
          alt,
          status: 'EXTERNAL',
          category,
          page: relativePath
        };
        
        pageResults.external.push(imageInfo);
        results.externalImages.push(imageInfo);
      } else {
        // Local image - check if it exists
        let fullPath;
        
        if (src.startsWith('/')) {
          // Absolute path from site root
          fullPath = path.join(SITE_DIR, src.substring(1));
        } else {
          // Relative path from current page
          const pageDir = path.dirname(filePath);
          fullPath = path.resolve(pageDir, src);
        }
        
        const exists = fileExists(fullPath);
        const imageInfo = {
          index: index + 1,
          src,
          alt,
          status: exists ? 'LOCAL_FOUND' : 'LOCAL_MISSING',
          fullPath,
          page: relativePath
        };
        
        if (!exists) {
          pageResults.missingLocal.push(imageInfo);
          results.missingLocalImages.push(imageInfo);
        }
        
        pageResults.images.push(imageInfo);
      }
    });
    
    results.totalImages += images.length;
    
    if (pageResults.missingLocal.length > 0 || pageResults.external.length > 0) {
      results.brokenReferences.push(pageResults);
    }
    
    return pageResults;
    
  } catch (error) {
    console.error(`Error processing ${relativePath}: ${error.message}`);
    return null;
  }
}

// Generate summary statistics
function generateSummary() {
  // Count external images by category
  const externalByCategory = {};
  results.externalImages.forEach(img => {
    externalByCategory[img.category] = (externalByCategory[img.category] || 0) + 1;
  });
  
  // Count missing images by directory
  const missingByDirectory = {};
  results.missingLocalImages.forEach(img => {
    const dir = path.dirname(img.src);
    missingByDirectory[dir] = (missingByDirectory[dir] || 0) + 1;
  });
  
  results.summary = {
    totalPages: results.totalPages,
    totalImages: results.totalImages,
    missingLocalCount: results.missingLocalImages.length,
    externalImageCount: results.externalImages.length,
    externalByCategory,
    missingByDirectory,
    pagesWithIssues: results.brokenReferences.length
  };
}

// Generate detailed report
function generateReport() {
  const timestamp = new Date().toISOString();
  const reportPath = path.join(__dirname, `blog-image-audit-${Date.now()}.json`);
  const textReportPath = path.join(__dirname, `blog-image-audit-${Date.now()}.txt`);
  
  // Save detailed JSON report
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  
  // Generate human-readable text report
  let textReport = `Blog Image Audit Report
Generated: ${timestamp}
==============================================

SUMMARY:
- Total blog pages processed: ${results.summary.totalPages}
- Total images found: ${results.summary.totalImages}
- Missing local images: ${results.summary.missingLocalCount}
- External images: ${results.summary.externalImageCount}
- Pages with issues: ${results.summary.pagesWithIssues}

EXTERNAL IMAGES BY SOURCE:
`;

  Object.entries(results.summary.externalByCategory).forEach(([category, count]) => {
    textReport += `- ${category}: ${count} images\n`;
  });

  textReport += `\nMISSING LOCAL IMAGES BY DIRECTORY:\n`;
  Object.entries(results.summary.missingByDirectory).forEach(([dir, count]) => {
    textReport += `- ${dir}: ${count} images\n`;
  });

  textReport += `\n\nDETAILED FINDINGS:\n\n`;

  if (results.missingLocalImages.length > 0) {
    textReport += `MISSING LOCAL IMAGES (${results.missingLocalImages.length}):\n`;
    textReport += `${'='.repeat(50)}\n`;
    
    results.missingLocalImages.forEach((img, i) => {
      textReport += `${i + 1}. Page: ${img.page}\n`;
      textReport += `   Image: ${img.src}\n`;
      textReport += `   Alt text: "${img.alt}"\n`;
      textReport += `   Expected path: ${img.fullPath}\n\n`;
    });
  }

  if (results.externalImages.length > 0) {
    textReport += `\n\nEXTERNAL IMAGES (${results.externalImages.length}):\n`;
    textReport += `${'='.repeat(50)}\n`;
    
    // Group by category
    const grouped = {};
    results.externalImages.forEach(img => {
      if (!grouped[img.category]) grouped[img.category] = [];
      grouped[img.category].push(img);
    });
    
    Object.entries(grouped).forEach(([category, images]) => {
      textReport += `\n${category.toUpperCase()} (${images.length} images):\n`;
      textReport += `${'-'.repeat(30)}\n`;
      
      images.forEach((img, i) => {
        textReport += `${i + 1}. Page: ${img.page}\n`;
        textReport += `   URL: ${img.src}\n`;
        textReport += `   Alt text: "${img.alt}"\n\n`;
      });
    });
  }

  fs.writeFileSync(textReportPath, textReport);
  
  console.log(`\n📊 AUDIT COMPLETE!`);
  console.log(`📄 Detailed JSON report: ${reportPath}`);
  console.log(`📄 Human-readable report: ${textReportPath}`);
  
  return { reportPath, textReportPath };
}

// Main execution
function main() {
  console.log('🔍 Starting blog image audit...');
  console.log(`📂 Scanning: ${BLOG_DIR}`);
  
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`❌ Blog directory not found: ${BLOG_DIR}`);
    console.log('Make sure you have built your site first with your build command.');
    process.exit(1);
  }
  
  // Find all blog HTML files
  const blogPages = findBlogPages(BLOG_DIR);
  results.totalPages = blogPages.length;
  
  console.log(`📄 Found ${blogPages.length} blog pages`);
  
  if (blogPages.length === 0) {
    console.log('No blog pages found to process.');
    return;
  }
  
  // Process each page
  console.log('\n🔍 Processing pages...');
  blogPages.forEach(processHtmlFile);
  
  // Generate summary and report
  generateSummary();
  const { textReportPath } = generateReport();
  
  // Print quick summary to console
  console.log('\n📊 QUICK SUMMARY:');
  console.log(`   Pages processed: ${results.summary.totalPages}`);
  console.log(`   Total images: ${results.summary.totalImages}`);
  console.log(`   Missing local: ${results.summary.missingLocalCount}`);
  console.log(`   External images: ${results.summary.externalImageCount}`);
  console.log(`   Pages with issues: ${results.summary.pagesWithIssues}`);
  
  if (results.summary.missingLocalCount > 0) {
    console.log('\n⚠️  MISSING LOCAL IMAGES:');
    results.missingLocalImages.slice(0, 5).forEach(img => {
      console.log(`   • ${img.src} (in ${img.page})`);
    });
    if (results.missingLocalImages.length > 5) {
      console.log(`   • ... and ${results.missingLocalImages.length - 5} more`);
    }
  }
  
  if (results.summary.externalImageCount > 0) {
    console.log('\n🌐 EXTERNAL IMAGES BY SOURCE:');
    Object.entries(results.summary.externalByCategory).forEach(([category, count]) => {
      console.log(`   • ${category}: ${count} images`);
    });
  }
  
  console.log(`\n📖 For complete details, see: ${textReportPath}`);
}

// Run the audit
main();
