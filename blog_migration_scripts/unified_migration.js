#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');
const { JSDOM } = require('jsdom');
const matter = require('gray-matter');
const yaml = require('js-yaml');

// Configuration
const DREAMWIDTH_DIR = path.resolve(__dirname, '../dreamwidth/entries');
const OUTPUT_DIR = path.resolve(__dirname, '../src/blog');
const COMMENTERS_YML = path.resolve(__dirname, 'comments/commenters.yml');
const IMAGE_AUDIT_FILE = path.resolve(__dirname, 'img/blog-image-audit-1750289898893.json');
const EMBED_PLAN_FILE = path.resolve(__dirname, 'embeds/embed-restoration-plan.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Load commenters mapping
let commenters = {};
if (fs.existsSync(COMMENTERS_YML)) {
  commenters = yaml.load(fs.readFileSync(COMMENTERS_YML, 'utf8')) || {};
}

// Load image audit for URL mapping
let imageMapping = {};
if (fs.existsSync(IMAGE_AUDIT_FILE)) {
  try {
    const imageAudit = JSON.parse(fs.readFileSync(IMAGE_AUDIT_FILE, 'utf8'));
    // The audit file has a different structure - it's an object with arrays
    if (imageAudit.externalImages && Array.isArray(imageAudit.externalImages)) {
      imageAudit.externalImages.forEach(img => {
        if (img.src && img.localFilename) {
          imageMapping[img.src] = `/img/blog/${img.localFilename}`;
        }
      });
    }
  } catch (error) {
    console.warn('Could not load image audit file:', error.message);
  }
}

// Load embed restoration plan
let embedPlan = {};
if (fs.existsSync(EMBED_PLAN_FILE)) {
  try {
    const embedData = JSON.parse(fs.readFileSync(EMBED_PLAN_FILE, 'utf8'));
    // The embed file has posts array
    if (embedData.posts && Array.isArray(embedData.posts)) {
      embedData.posts.forEach(entry => {
        if (entry.mdFile) {
          const filename = path.basename(entry.mdFile);
          embedPlan[filename] = {
            videoUrls: entry.videoUrls || [],
            siteEmbedTags: entry.siteEmbedTags || []
          };
        }
      });
    }
  } catch (error) {
    console.warn('Could not load embed restoration plan:', error.message);
  }
}

// Configure Turndown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// Parse command line arguments
const args = process.argv.slice(2);
let specificEntry = null;
let dryRun = false;
let verbose = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--entry' && i + 1 < args.length) {
    specificEntry = args[i + 1];
    i++;
  } else if (args[i] === '--dry-run') {
    dryRun = true;
  } else if (args[i] === '--verbose') {
    verbose = true;
  } else if (args[i] === '--help') {
    console.log(`
Usage: node unified_migration.js [options]

Options:
  --entry NUM     Process only entry-NUM.html
  --dry-run       Show what would be done without writing files
  --verbose       Show detailed processing information
  --help          Show this help message

Examples:
  node unified_migration.js --entry 1504
  node unified_migration.js --dry-run
  node unified_migration.js --verbose
    `);
    process.exit(0);
  }
}

function log(message, level = 'info') {
  if (level === 'verbose' && !verbose) return;
  console.log(message);
}

function preprocessHTML(html, filename) {
  log(`Preprocessing ${filename}...`, 'verbose');
  
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Step 1: Handle <a> tags with <br> inside (from preprocessblog.js)
  // Split out text before the last <br> as plain text, keep only the last line as the link
  Array.from(document.querySelectorAll('.entry-content a')).forEach(a => {
    if (a.querySelector('br')) {
      log(`  Processing link with line breaks: ${a.textContent.substring(0, 50)}...`, 'verbose');
      
      const nodes = Array.from(a.childNodes);
      let segments = [];
      let buffer = '';
      
      nodes.forEach(n => {
        if (n.nodeName === 'BR') {
          if (buffer !== '') {
            segments.push(buffer);
            buffer = '';
          }
        } else {
          buffer += n.textContent || '';
        }
      });
      
      if (buffer !== '') segments.push(buffer);
      
      const parent = a.parentNode;
      // Insert each previous segment as a <p> before the <a>
      for (let i = 0; i < segments.length - 1; i++) {
        const p = document.createElement('p');
        p.textContent = segments[i] || '\u00A0';
        parent.insertBefore(p, a);
      }
      
      // Set the <a> text to only the last segment
      if (segments.length > 0) {
        a.innerHTML = segments[segments.length - 1];
      }
      
      if (!a.innerHTML.trim()) {
        parent.removeChild(a);
      }
    }
  });

  // Step 2: Convert line breaks to paragraphs
  // This is the key fix - instead of removing <br> tags or converting to \n\n,
  // we convert sequences of <br> tags to proper paragraph breaks
  const entryContent = document.querySelector('.entry-content');
  if (entryContent) {
    log(`  Converting line breaks to paragraphs...`, 'verbose');
    
    // Split content by <br> sequences and wrap each non-empty segment in <p> tags
    let innerHTML = entryContent.innerHTML;
    
    // Replace sequences of <br> tags (with optional whitespace and attributes) with a placeholder
    const BR_PLACEHOLDER = '___PARAGRAPH_BREAK___';
    innerHTML = innerHTML.replace(/(<br\s*\/?>\s*)+/gi, BR_PLACEHOLDER);
    
    // Split by placeholder and wrap non-empty segments in paragraphs
    const segments = innerHTML.split(BR_PLACEHOLDER);
    const paragraphs = segments
      .map(segment => segment.trim())
      .filter(segment => segment && segment !== '')
      .map(segment => {
        // If the segment doesn't start with a block element, wrap it in <p>
        if (!/^\s*<(p|div|h[1-6]|ul|ol|li|blockquote|pre|table)/i.test(segment)) {
          return `<p>${segment}</p>`;
        }
        return segment;
      });
    
    entryContent.innerHTML = paragraphs.join('\n\n');
  }

  // Step 3: Replace <div><strong>...</strong></div> and <p><strong>...</strong></p> with <h2>...</h2>
  ['div', 'p'].forEach(tag => {
    Array.from(document.querySelectorAll(tag)).forEach(parent => {
      if (
        parent.children.length === 1 &&
        parent.children[0].tagName === 'STRONG' &&
        Array.from(parent.childNodes).every(node =>
          node.nodeType === 3 ? /^\s*$/.test(node.textContent) : node === parent.children[0]
        )
      ) {
        log(`  Converting ${tag}/strong to h2: ${parent.textContent.substring(0, 30)}...`, 'verbose');
        const h2 = document.createElement('h2');
        h2.innerHTML = parent.children[0].innerHTML;
        parent.parentNode.replaceChild(h2, parent);
      }
    });
  });

  return dom.serialize();
}

function extractPostData(document) {
  // Extract the title from <h3 class="entry-title"><a>...</a></h3>
  const title = document.querySelector('h3.entry-title a')?.textContent.trim() || 'Untitled';
  
  // Extract date from <span class="datetime">...</span>
  const dateText = document.querySelector('span.datetime')?.textContent.trim() || '2000-01-01';
  const parsedDate = new Date(dateText);
  let date = '2000-01-01T00:00:00Z';
  if (!isNaN(parsedDate)) {
    // Remove milliseconds, keep Z
    date = parsedDate.toISOString().replace(/\.\d{3}Z$/, 'Z');
  }
  
  // Extract tags from <div class="tag"><ul><li><a rel="tag">...</a></li></ul></div>
  const tags = Array.from(document.querySelectorAll('div.tag ul li a[rel="tag"]')).map(a => a.textContent.trim());
  
  // Extract original Dreamwidth URL from <li class="entry-permalink"><a href="..."></a></li>
  const original_url = document.querySelector('li.entry-permalink a')?.getAttribute('href') || '';
  
  // Extract userpic src if present
  const userpic = document.querySelector('div.userpic img')?.getAttribute('src') || '';

  return { title, date, tags, original_url, userpic };
}

function extractComments(document) {
  log(`  Extracting comments...`, 'verbose');
  
  const commentNodes = Array.from(document.querySelectorAll('div.dwexpcomment'));
  const comments = {};
  
  commentNodes.forEach(node => {
    const id = node.id || '';
    const header = node.querySelector('.header');
    const authorEl = node.querySelector('.ljuser a');
    let authorText = authorEl ? authorEl.textContent : '';
    
    // Replace ext_XXXXX with mapped username if available
    if (authorText && commenters[authorText]) {
      authorText = commenters[authorText];
    }
    
    const author = authorEl ? `[${authorText}](${authorEl.getAttribute('href')})` : 'Anonymous';
    const date = header?.querySelector('.datetime span:last-child')?.textContent.trim() || '';
    const title = header?.querySelector('.comment-title')?.textContent.trim() || '';
    const bodyHtml = node.querySelector('.comment-content')?.innerHTML || '';
    const bodyMd = turndownService.turndown(bodyHtml);
    
    // Find parent by traversing up to closest .dwexpcomment
    let parent = null;
    let parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.classList && parentNode.classList.contains('dwexpcomment')) {
        parent = parentNode.id;
        break;
      }
      parentNode = parentNode.parentElement;
    }
    
    comments[id] = { id, author, date, title, bodyMd, parent, children: [] };
  });
  
  // Build tree
  Object.values(comments).forEach(comment => {
    if (comment.parent && comments[comment.parent]) {
      comments[comment.parent].children.push(comment);
    }
  });
  
  // Get top-level comments
  return Object.values(comments).filter(c => !c.parent);
}

function renderCommentsMd(comments) {
  let md = '';
  comments.forEach((comment, idx) => {
    if (idx > 0) md += '\n\n---\n\n';
    md += `**${comment.author}** on ${comment.date}`;
    if (comment.title) md += ` — *${comment.title}*`;
    md += `\n\n${comment.bodyMd}`;
    if (comment.children.length > 0) {
      // Render children as flat, separated by ---
      md += '\n\n---\n\n' + renderCommentsMd(comment.children).replace(/^---\n\n/, '');
    }
  });
  return md;
}

function convertImageUrls(markdown) {
  log(`  Converting image URLs to local references...`, 'verbose');
  
  let updatedMarkdown = markdown;
  let replacementCount = 0;
  
  for (const [originalUrl, localUrl] of Object.entries(imageMapping)) {
    const escapedUrl = originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Replace markdown image patterns: ![alt](url)
    const markdownRegex = new RegExp(`!\\[([^\\]]*)\\]\\(${escapedUrl}\\)`, 'g');
    const markdownMatches = updatedMarkdown.match(markdownRegex);
    if (markdownMatches) {
      updatedMarkdown = updatedMarkdown.replace(markdownRegex, `![$1](${localUrl})`);
      replacementCount += markdownMatches.length;
      log(`    Replaced ${markdownMatches.length} markdown image references: ${originalUrl}`, 'verbose');
    }
    
    // Replace HTML image tags: <img src="url">
    const htmlRegex = new RegExp(`<img([^>]+)src=["']${escapedUrl}["']([^>]*)>`, 'gi');
    const htmlMatches = updatedMarkdown.match(htmlRegex);
    if (htmlMatches) {
      updatedMarkdown = updatedMarkdown.replace(htmlRegex, `<img$1src="${localUrl}"$2>`);
      replacementCount += htmlMatches.length;
      log(`    Replaced ${htmlMatches.length} HTML image tags: ${originalUrl}`, 'verbose');
    }
  }
  
  if (replacementCount > 0) {
    log(`  Converted ${replacementCount} image URLs to local references`, 'verbose');
  }
  
  return updatedMarkdown;
}

function createEmbedCode(video) {
  switch (video.type) {
    case 'YouTube':
      return `<div class="video-embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.videoId}" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
</div>`;
    
    case 'Vimeo':
      return `<div class="video-embed">
<iframe src="https://player.vimeo.com/video/${video.videoId}" 
        width="640" height="360" frameborder="0" 
        allow="autoplay; fullscreen; picture-in-picture" 
        allowfullscreen></iframe>
</div>`;
    
    default:
      return `<!-- Unknown video type: ${video.type} -->`;
  }
}

function restoreEmbeds(markdown, filename) {
  const embedData = embedPlan[filename];
  if (!embedData || !embedData.videoUrls || embedData.videoUrls.length === 0) {
    return markdown;
  }
  
  log(`  Restoring ${embedData.videoUrls.length} video embeds...`, 'verbose');
  
  let updatedMarkdown = markdown;
  let restoredCount = 0;
  
  // Try to restore each video
  embedData.videoUrls.forEach((video, index) => {
    const embedCode = createEmbedCode(video);
    
    // Look for site-embed tags first
    if (embedData.siteEmbedTags && embedData.siteEmbedTags[index]) {
      const tag = embedData.siteEmbedTags[index];
      if (updatedMarkdown.includes(tag)) {
        updatedMarkdown = updatedMarkdown.replace(tag, embedCode);
        log(`    Replaced site-embed tag with ${video.type} embed (${video.videoId})`, 'verbose');
        restoredCount++;
        return;
      }
    }
    
    // If no direct replacement found, try pattern matching
    const patterns = [
      /\n\n\n+/,  // Multiple blank lines (use first occurrence)
      /(\. Do you have a second\?)\n\n+/,
      /(Despite the ending of the video being a punchline[^.]*\.)\n\n+/,
    ];
    
    for (const pattern of patterns) {
      if (pattern.test(updatedMarkdown)) {
        updatedMarkdown = updatedMarkdown.replace(pattern, (match, ...args) => {
          const prefix = args.length > 0 ? args[0] : '';
          return prefix + '\n\n' + embedCode + '\n\n';
        });
        log(`    Inserted ${video.type} embed (${video.videoId}) using pattern matching`, 'verbose');
        restoredCount++;
        break;
      }
    }
  });
  
  if (restoredCount > 0) {
    log(`  Restored ${restoredCount} video embeds`, 'verbose');
  }
  
  return updatedMarkdown;
}

function processEntry(filename) {
  const filePath = path.join(DREAMWIDTH_DIR, filename);
  
  if (!fs.existsSync(filePath)) {
    log(`File not found: ${filePath}`);
    return false;
  }

  log(`Processing ${filename}...`);
  
  try {
    // Read and preprocess HTML
    const originalHtml = fs.readFileSync(filePath, 'utf8');
    const preprocessedHtml = preprocessHTML(originalHtml, filename);
    
    // Parse with JSDOM
    const dom = new JSDOM(preprocessedHtml);
    const document = dom.window.document;

    // Extract post metadata
    const { title, date, tags, original_url, userpic } = extractPostData(document);
    log(`  Title: ${title}`, 'verbose');
    log(`  Date: ${date}`, 'verbose');
    log(`  Tags: ${tags.join(', ')}`, 'verbose');

    // Extract the article body
    const body = document.querySelector('.entry-content')?.innerHTML || '';
    let markdown = turndownService.turndown(body);

    // Convert external image URLs to local references
    markdown = convertImageUrls(markdown);

    // Extract and convert comments
    const commentsTree = extractComments(document);
    let commentsMd = '';
    
    if (commentsTree.length > 0) {
      commentsMd = '\n\n## Comments\n\n---\n\n' + renderCommentsMd(commentsTree);
      log(`  Found ${commentsTree.length} top-level comments`, 'verbose');
    } else {
      commentsMd = '\n\n## Comments\n\n---\n\nnone';
    }

    // Combine content and comments
    let fullMarkdown = markdown + commentsMd;

    // Create output filename and restore embeds if available
    const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const outFile = `${date.slice(0, 10)}-${safeTitle}.md`;
    
    // Restore video embeds
    fullMarkdown = restoreEmbeds(fullMarkdown, outFile);

    // Create markdown with front matter
    const mdWithFrontMatter = matter.stringify(fullMarkdown, {
      layout: 'layouts/post.njk',
      title,
      date: new Date(date),
      tags,
      original_url,
      userpic
    }, { delimiters: '---' });

    const outPath = path.join(OUTPUT_DIR, outFile);

    if (dryRun) {
      log(`[DRY RUN] Would write: ${outFile}`);
      if (verbose) {
        log('--- Preview of generated markdown ---');
        log(mdWithFrontMatter.substring(0, 500) + '...');
        log('--- End preview ---');
      }
    } else {
      fs.writeFileSync(outPath, mdWithFrontMatter);
      log(`✓ Converted: ${filename} → ${outFile}`);
    }

    return true;
  } catch (error) {
    log(`✗ Error processing ${filename}: ${error.message}`);
    if (verbose) {
      log(error.stack);
    }
    return false;
  }
}

// Main execution
function main() {
  log(`Starting unified blog migration...`);
  log(`Source: ${DREAMWIDTH_DIR}`);
  log(`Output: ${OUTPUT_DIR}`);
  if (dryRun) log(`Mode: DRY RUN (no files will be written)`);
  log('');

  let filesToProcess = [];
  
  if (specificEntry) {
    // Process specific entry
    const filename = `entry-${specificEntry}.html`;
    filesToProcess = [filename];
    log(`Processing specific entry: ${filename}`);
  } else {
    // Process all entries
    filesToProcess = fs.readdirSync(DREAMWIDTH_DIR)
      .filter(file => file.endsWith('.html'))
      .sort();
    log(`Found ${filesToProcess.length} HTML files to process`);
  }

  let successCount = 0;
  let errorCount = 0;

  for (const filename of filesToProcess) {
    if (processEntry(filename)) {
      successCount++;
    } else {
      errorCount++;
    }
  }

  log('');
  log(`Migration complete!`);
  log(`✓ Successfully processed: ${successCount}`);
  if (errorCount > 0) {
    log(`✗ Errors: ${errorCount}`);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { processEntry, preprocessHTML, extractPostData, extractComments };
