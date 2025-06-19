#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the audit results
const auditFile = process.argv[2];
if (!auditFile) {
  console.log('Usage: node analyze-audit.js <audit-json-file>');
  process.exit(1);
}

if (!fs.existsSync(auditFile)) {
  console.error(`Audit file not found: ${auditFile}`);
  process.exit(1);
}

const audit = JSON.parse(fs.readFileSync(auditFile, 'utf8'));

console.log('📋 BLOG IMAGE AUDIT ANALYSIS');
console.log('============================\n');

console.log('🔍 QUICK STATS:');
console.log(`   Total pages: ${audit.summary.totalPages}`);
console.log(`   Total images: ${audit.summary.totalImages}`);
console.log(`   Missing local images: ${audit.summary.missingLocalCount}`);
console.log(`   External images: ${audit.summary.externalImageCount}`);
console.log(`   Conversion rate: ${((audit.summary.externalImageCount / audit.summary.totalImages) * 100).toFixed(1)}% of images are external\n`);

// Analyze external images by domain
console.log('🌐 EXTERNAL IMAGE BREAKDOWN:');
const domainStats = {};
audit.externalImages.forEach(img => {
  const url = img.src;
  let domain;
  
  try {
    if (url.startsWith('//')) {
      domain = url.split('/')[2];
    } else {
      domain = new URL(url).hostname;
    }
  } catch (error) {
    domain = 'Invalid URL';
  }
  
  if (!domainStats[domain]) {
    domainStats[domain] = { count: 0, category: img.category, urls: [] };
  }
  domainStats[domain].count++;
  domainStats[domain].urls.push(url);
});

// Sort domains by count
const sortedDomains = Object.entries(domainStats)
  .sort(([,a], [,b]) => b.count - a.count);

sortedDomains.forEach(([domain, stats]) => {
  console.log(`   ${domain}: ${stats.count} images (${stats.category})`);
});

console.log('\n📋 RECOMMENDED ACTIONS:\n');

console.log('1. 🔴 HIGH PRIORITY - Fix Missing Local Images:');
audit.missingLocalImages.forEach(img => {
  console.log(`   • "${img.src}" in ${img.page}`);
  console.log(`     Expected: ${img.fullPath}`);
});

console.log('\n2. 🟡 MEDIUM PRIORITY - Consider Downloading External Images:');

// Group recommendations by category
const recommendations = {
  'LiveJournal': {
    priority: 'HIGH',
    reason: 'LiveJournal images may become unavailable',
    action: 'Download and host locally'
  },
  'Google Photos': {
    priority: 'HIGH', 
    reason: 'Google Photos links often expire or change',
    action: 'Download and host locally'
  },
  'Picasa': {
    priority: 'HIGH',
    reason: 'Picasa was discontinued, links may break',
    action: 'Download and host locally'
  },
  'Your Domain (External)': {
    priority: 'LOW',
    reason: 'Already on your domain, probably stable',
    action: 'Verify links are still working'
  },
  'Fluidity Forum': {
    priority: 'MEDIUM',
    reason: 'Third-party site, may change',
    action: 'Consider downloading if images are important'
  },
  'Other External': {
    priority: 'MEDIUM',
    reason: 'Various external sites, may change over time',
    action: 'Review and download important images'
  }
};

Object.entries(audit.summary.externalByCategory).forEach(([category, count]) => {
  const rec = recommendations[category] || {
    priority: 'MEDIUM',
    reason: 'External dependency',
    action: 'Review and consider downloading'
  };
  
  console.log(`   ${category}: ${count} images - ${rec.priority} priority`);
  console.log(`     Reason: ${rec.reason}`);
  console.log(`     Action: ${rec.action}`);
});

console.log('\n3. 🔧 TOOLS TO HELP YOU:');
console.log('   • Use wget or curl to download images');
console.log('   • Consider using a script to batch download');
console.log('   • Update your blog posts to reference local copies');
console.log('   • Set up proper image directory structure (/img/blog/...)');

console.log('\n4. 📊 SAMPLE DOWNLOAD SCRIPT:');
console.log(`
# Create download script for external images
mkdir -p img/blog/external
cd img/blog/external

# Example for downloading Google Photos images:
`);

// Show a few example Google Photos URLs
const googlePhotos = audit.externalImages
  .filter(img => img.category === 'Google Photos')
  .slice(0, 3);

googlePhotos.forEach((img, index) => {
  const filename = `google_photo_${index + 1}.jpg`;
  console.log(`wget "${img.src}" -O ${filename}`);
});

console.log('\n5. 🎯 PRIORITY ORDER:');
console.log('   1. Fix the 2 missing local images first');
console.log('   2. Download LiveJournal images (289 images) - HIGH RISK');
console.log('   3. Download Google Photos images (231 images) - HIGH RISK'); 
console.log('   4. Review "Other External" images (254 images) - case by case');
console.log('   5. Check your own domain external links (47 images)');
console.log('   6. Consider Fluidity Forum images (14 images) if important');

console.log(`\n📄 For complete details, see the full audit report.`);
