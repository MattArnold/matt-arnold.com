const fs = require("fs");
const path = require("path");

// Regular expression to match periods not preceded by 'www' and not followed by certain characters
const regex = /(?<!www)\.(?!\s|[.,/#!$%^&*;:{}=\-_`~()"'<>?0\[\]\|]|njk|com|org|net|html|php|css|js|jpg|png|gif|svg|\n|\r)/g;

// Updated regex: match period between two word characters, but not if followed by listed extensions, punctuation, or '0', and not preceded by 'www'
const regexWord = /(?<!www)(\w)\.(?![.,/#!$%^&*;:{}=\-_`~()"'<>?0\[\]\|]|njk|com|org|net|html|php|css|js|jpg|png|gif|svg)(\w)/g;

// Recursively get all .md files in src/blog/posts
function getAllFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else if (file.endsWith(".md")) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getAllFiles(path.join(__dirname, "src/blog/posts"));
const output = [];

// Process each file
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  let match;
  // Use the new regexWord to match periods between two word characters
  while ((match = regexWord.exec(text)) !== null) {
    // Find the full token (from whitespace to whitespace) containing the match
    const idx = match.index;
    let start = idx;
    let end = idx;
    while (start > 0 && !/\s/.test(text[start - 1])) start--;
    while (end < text.length && !/\s/.test(text[end])) end++;
    const token = text.slice(start, end);
    // Discard if the token looks like a URL (starts with http://, https://, or contains www.[domain].[tld])
    if (
      /https?:\/\//.test(token) ||
      /www\.[a-zA-Z0-9\-]+\.(com|org|net|html|php|css|js|jpg|png|gif|svg)/.test(token) ||
      /\b([A-Z]\.){1,}[A-Z]\b/.test(token) // filter out common abbreviations like A.I., U.S., etc.
    ) continue;
    // Only print the filename, not the full path
    const filename = file.split(path.sep).pop();
    output.push(`${filename}: ${token}`);
  }
}

fs.writeFileSync("periodmatch.txt", output.join("\n"));