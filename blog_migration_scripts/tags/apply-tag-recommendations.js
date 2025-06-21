#!/usr/bin/env node

// Script to apply tag recommendations from tag_recommendations.yaml to markdown files.
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');

// Load recommendations
const recs = yaml.load(fs.readFileSync(path.join(process.cwd(), 'tag_recommendations.yaml'), 'utf8'));

recs.forEach(entry => {
  for (const [relPath, tags] of Object.entries(entry)) {
    const mdPath = path.join(process.cwd(), relPath);
    if (!fs.existsSync(mdPath)) {
      console.warn(`Warning: File not found: ${mdPath}`);
      continue;
    }
    // Read and parse markdown frontmatter
    const file = fs.readFileSync(mdPath, 'utf8');
    const parsed = matter(file);

    // Update tags in frontmatter
    parsed.data.tags = tags;

    // Stringify back to markdown
    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(mdPath, newContent, 'utf8');
    console.log(`Updated tags in ${mdPath}`);
  }
});
