#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Read the audit results
const auditFile = process.argv[2];
if (!auditFile) {
  console.log('Usage: node generate-download-script.js <audit-json-file>');
  process.exit(1);
}

if (!fs.existsSync(auditFile)) {
  console.error(`Audit file not found: ${auditFile}`);
  process.exit(1);
}

const audit = JSON.parse(fs.readFileSync(auditFile, 'utf8'));

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

// Generate the download script
console.log('#!/bin/bash');
console.log('# Blog Image Download Script');
console.log('# Generated automatically from blog audit');
console.log('');
console.log('set -e  # Exit on any error');
console.log('');
console.log('# Create directories');
console.log('mkdir -p img/blog/livejournal');
console.log('mkdir -p img/blog/googlephotos');
console.log('mkdir -p img/blog/external');
console.log('');

// Sort images by priority (LiveJournal and Google Photos first)
const highPriorityImages = audit.externalImages.filter(img => 
  img.category === 'LiveJournal' || 
  img.category === 'Google Photos'
);

const otherImages = audit.externalImages.filter(img => 
  img.category !== 'LiveJournal' && 
  img.category !== 'Google Photos' &&
  img.category !== 'Your Domain (External)'
);

console.log('echo "Downloading high priority images..."');
console.log('');

console.log('# HIGH PRIORITY: LiveJournal Images');
const livejournalImages = highPriorityImages.filter(img => img.category === 'LiveJournal');
livejournalImages.forEach((img, index) => {
  const filename = generateSafeFilename(img.src, index);
  console.log(`echo "Downloading LiveJournal image ${index + 1}/${livejournalImages.length}..."`);
  console.log(`wget -t 3 -T 10 "${img.src}" -O "img/blog/livejournal/${filename}" || echo "Failed to download: ${img.src}"`);
  console.log('');
});

console.log('# HIGH PRIORITY: Google Photos Images');
const googlePhotosImages = highPriorityImages.filter(img => img.category === 'Google Photos');
googlePhotosImages.forEach((img, index) => {
  const filename = generateSafeFilename(img.src, index);
  console.log(`echo "Downloading Google Photos image ${index + 1}/${googlePhotosImages.length}..."`);
  console.log(`wget -t 3 -T 10 "${img.src}" -O "img/blog/googlephotos/${filename}" || echo "Failed to download: ${img.src}"`);
  console.log('');
});

console.log('# MEDIUM PRIORITY: Other External Images');
console.log('# Uncomment the lines below if you want to download these as well');
console.log('');

otherImages.slice(0, 50).forEach((img, index) => {
  const filename = generateSafeFilename(img.src, index);
  console.log(`# echo "Downloading external image ${index + 1}..."`);
  console.log(`# wget -t 3 -T 10 "${img.src}" -O "img/blog/external/${filename}" || echo "Failed to download: ${img.src}"`);
  console.log('');
});

if (otherImages.length > 50) {
  console.log(`# ... and ${otherImages.length - 50} more external images`);
  console.log('# (Edit this script to include more if needed)');
}

console.log('');
console.log('echo "Download complete!"');
console.log('echo "Next steps:"');
console.log('echo "1. Review downloaded images in img/blog/ directories"');
console.log('echo "2. Update your blog posts to reference the local copies"');
console.log('echo "3. Remove or replace broken external links"');

// Also generate a mapping file for reference
console.log('');
console.log('# Generate mapping file for reference');
console.log('cat > img/blog/url-mapping.txt << EOF');

// Add LiveJournal mappings
livejournalImages.forEach((img, index) => {
  const filename = generateSafeFilename(img.src, index);
  console.log(`${img.src} -> img/blog/livejournal/${filename}`);
});

// Add Google Photos mappings
googlePhotosImages.forEach((img, index) => {
  const filename = generateSafeFilename(img.src, index);
  console.log(`${img.src} -> img/blog/googlephotos/${filename}`);
});

console.log('EOF');
