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
  if (contentPaths.some(p => filePath.includes(p))) return true;
  if (filePath === 'src/index.njk') return true;
  if (filePath.includes('src/pages/') && filePath.match(/\.(md|html)$/)) return true;
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

  let changedFiles = [];
  try {
    const gitStatus = execSync('git diff-tree --no-commit-id --name-only -r HEAD', { encoding: 'utf8', cwd });
    changedFiles = gitStatus.split('\n').filter(f => f.trim());
  } catch {
    try {
      const gitUnstaged = execSync('git diff --name-only', { encoding: 'utf8', cwd });
      changedFiles = gitUnstaged.split('\n').filter(f => f.trim());
    } catch {
      console.error('No git repository found or no changes');
      process.exit(1);
    }
  }

  const contentChanges = changedFiles.filter(isContentFile);
  if (!contentChanges.length) {
    console.log('No content changes detected');
    return;
  }

  const dateString = new Date().toISOString().split('T')[0];
  contentData.lastContentUpdate = dateString;
  contentData.updates = contentData.updates || [];

  const links = contentChanges.map(file => {
    if (file.includes('src/blog/')) {
      const slug = path.basename(file, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      return { url: `/blog/${slug}`, title: slug.replace(/-/g,' ') };
    }
    if (file.includes('src/pages/')) {
      const name = path.basename(file, path.extname(file));
      return { url: `/${name}`, title: name.charAt(0).toUpperCase() + name.slice(1) };
    }
    if (file === 'src/index.njk') {
      return { url: '/', title: 'Home' };
    }
    if (file.includes('src/img/')) {
      return { url: '/gallery', title: 'Gallery' };
    }
    return { url: '/', title: path.basename(file) };
  }).filter((l,i,a) => a.findIndex(x=>x.url===l.url)===i);

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
