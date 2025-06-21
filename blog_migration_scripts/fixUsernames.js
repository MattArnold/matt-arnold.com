const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const DREAMWIDTH_DIR = path.join(__dirname, '..', 'dreamwidth');
const BLOG_DIR = path.join(__dirname, '..', 'src', 'blog');

// Recursively collect file paths by extension
async function collectFiles(dir, ext) {
  let results = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await collectFiles(fullPath, ext);
      results.push(...nested);
    } else if (entry.name.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

// Escape string for regex
function escapeRegex(str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

(async () => {
  // 1. Gather all HTML files in dreamwidth
  const htmlFiles = await collectFiles(DREAMWIDTH_DIR, '.html');

  for (let htmlPath of htmlFiles) {
    const html = await fs.promises.readFile(htmlPath, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Find all <user> tags
    const userTags = document.querySelectorAll('user');
    userTags.forEach(async (el) => {
      const username = el.getAttribute('user');
      if (!username) return;

      // Find containing paragraph (<p> or parent div)
      let container = el.closest('p') || el.parentElement;
      const rawHtml = container.innerHTML;

      // Build text snippet with placeholder
      const snippetHtml = rawHtml.replace(/<user[^>]*>/g, '{{USER}}').replace(/<\/user>/g, '');
      // Strip HTML tags to plain text
      const snippetText = snippetHtml.replace(/<[^>]+>/g, '');
      const placeholderText = snippetText.replace('{{USER}}', '');

      // Build regex for matching in Markdown
      const escaped = escapeRegex(placeholderText.trim());
      // allow flexible whitespace
      const pattern = escaped.replace(/\\\s+/g, '\\s+');
      const regex = new RegExp(pattern, 'm');

      // Search blog markdown files
      const mdFiles = await collectFiles(BLOG_DIR, '.md');
      for (let mdPath of mdFiles) {
        let content = await fs.promises.readFile(mdPath, 'utf8');
        if (regex.test(content)) {
          // Insert username at placeholder position
          const replacement = snippetText.replace('{{USER}}', username);
          const contentEscaped = escapeRegex(placeholderText);
          const replaceRegex = new RegExp(escapeRegex(placeholderText), 'm');
          const updated = content.replace(replaceRegex, replacement);
          await fs.promises.writeFile(mdPath, updated, 'utf8');
          console.log(`Inserted user '${username}' into ${path.relative(process.cwd(), mdPath)}`);
          break;
        }
      }
    });
  }
})();
