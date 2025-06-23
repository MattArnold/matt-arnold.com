#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');

const cwd = process.cwd();

const contentPaths = [
  'src/blog/',
  'src/img/'
];

function isContentFile(filePath) {
  // Only consider files in src/ directory
  if (!filePath.startsWith('src/')) return false;
  if (contentPaths.some(p => filePath.includes(p))) return true;
  if (filePath === 'src/index.njk') return true;
  if (filePath.includes('src/pages/') && filePath.match(/\.(md|html|njk)$/)) return true;
  if (filePath.match(/\.(jpg|jpeg|png|gif|svg|webp)$/) &&
      !filePath.includes('_includes/') &&
      !filePath.includes('_data/') &&
      !filePath.includes('scripts/') &&
      !filePath.includes('styles/')) return true;
  if (filePath.match(/\.md$/) && !filePath.includes('_includes/') && !filePath.includes('_data/')) return true;
  return false;
}

function updateContentTracking() {
  const contentUpdatesPath = path.join(cwd, 'src/_data/content-updates.yml');
  let contentData = {};

  if (fs.existsSync(contentUpdatesPath)) {
    const yamlContent = fs.readFileSync(contentUpdatesPath, 'utf8');
    contentData = yaml.load(yamlContent) || {};
  }

  // Collect staged and unstaged changes
  let changedFiles = [];
  try {
    const staged = execSync('git diff --cached --name-only', { encoding: 'utf8', cwd });
    changedFiles = staged.split('\n').filter(f => f.trim());
  } catch {}
  try {
    const unstaged = execSync('git diff --name-only', { encoding: 'utf8', cwd });
    changedFiles.push(...unstaged.split('\n').filter(f => f.trim()));
  } catch {}
  // Deduplicate
  changedFiles = Array.from(new Set(changedFiles));

  const contentChanges = changedFiles.filter(isContentFile);
  if (!contentChanges.length) {
    console.log('No content changes detected');
    return;
  }

  const dateString = new Date().toISOString().split('T')[0];
  contentData.lastContentUpdate = dateString;
  contentData.updates = contentData.updates || [];

  const links = contentChanges.map(file => {
    if (file.startsWith('src/blog/') || (file.startsWith('src/pages/') && file.match(/\.(md|njk)$/))) {
      // Link to individual headers within markdown/nunjucks pages
      // Read file and extract headers
      const srcPath = path.join(cwd, file);
      let content = fs.readFileSync(srcPath, 'utf8');
      const lines = content.split(/\r?\n/);
      const slugify = s => s.toLowerCase().trim().replace(/\s+/g,'-').replace(/[^\w\-]+/g,'');
      const headerLinks = [];
      lines.forEach(line => {
        const match = line.match(/^##+\s+(.*)/);
        if (match) {
          const text = match[1].trim();
          const slug = slugify(text);
          const base = file.startsWith('src/blog/')
            ? `/blog/${path.basename(file, '.md').replace(/^[0-9\-]+/, '')}`
            : `/${path.basename(file, path.extname(file))}`;
          headerLinks.push({ url: `${base}#${slug}`, title: text });
        }
      });
      return headerLinks;
    } else if (file === 'src/index.njk') {
      return { url: '/', title: 'Home' };
    } else if (file.startsWith('src/img/')) {
      return { url: '/gallery', title: 'Gallery' };
    }
    return null;
  }).flat().filter(l=>l).filter((l,i,a) => a.findIndex(x=>x.url===l.url)===i);

  const entry = { date: dateString, type: 'auto', links };
  const idx = (contentData.updates || []).findIndex(u => u.date === dateString && u.type === 'auto');
  if (idx >= 0) contentData.updates[idx] = entry;
  else contentData.updates.unshift(entry);

  contentData.updates = contentData.updates.slice(0,50);

  const yamlOut = yaml.dump(contentData, { indent: 2, lineWidth: 120, noRefs: true });
  fs.writeFileSync(contentUpdatesPath, yamlOut, 'utf8');
  console.log(`Updated content-updates.yml with ${contentChanges.length} changes`);
}

updateContentTracking();
