// Preprocess all Dreamwidth HTML entries for lyrics/poetry multi-line links
// Usage: node preprocess_entries.js

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const entriesDir = path.resolve(__dirname, 'dreamwidth/entries');
const preDir = path.resolve(__dirname, 'preprocessed');
if (!fs.existsSync(preDir)) fs.mkdirSync(preDir);

// Parse --e parameter from command line
let entryNumber = null;
process.argv.forEach((arg, idx) => {
  if (arg === '--e' && process.argv[idx + 1]) {
    entryNumber = process.argv[idx + 1];
  }
});

// If --e is provided, only process that entry
if (entryNumber) {
  const testFile = `entry-${entryNumber}.html`;
  const filePath = path.join(entriesDir, testFile);
  const outPath = path.join(preDir, testFile);
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Preprocess <a> tags with <br> inside: split out the text before the last <br> as plain text, keep only the last line as the link
    Array.from(document.querySelectorAll('.entry-content a')).forEach(a => {
      if (a.querySelector('br')) {
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

    // Replace every sequence of <br>, <br/>, or <br /> (case-insensitive, optional whitespace) with \n\n
    let serialized = dom.serialize();
    serialized = serialized.replace(/(<br\s*\/?>\s*)+/gi, '\n\n');

    fs.writeFileSync(outPath, serialized);
    console.log(`Preprocessed: ${filePath} → ${outPath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
} else {
  fs.readdirSync(entriesDir).forEach(file => {
    if (!file.endsWith('.html')) return;
    const filePath = path.join(entriesDir, file);
    const outPath = path.join(preDir, file);
    const html = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Preprocess <a> tags with <br> inside: split out the text before the last <br> as plain text, keep only the last line as the link
    Array.from(document.querySelectorAll('.entry-content a')).forEach(a => {
      if (a.querySelector('br')) {
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

    // Replace every sequence of <br>, <br/>, or <br /> (case-insensitive, optional whitespace) with \n\n
    let serialized = dom.serialize();
    serialized = serialized.replace(/(<br\s*\/?>\s*)+/gi, '\n\n');

    fs.writeFileSync(outPath, serialized);
    console.log(`Preprocessed: ${filePath} → ${outPath}`);
  });
}
