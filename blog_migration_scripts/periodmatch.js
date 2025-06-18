const fs = require("fs");
const path = require("path");

const blogDir = path.join(__dirname, "src/blog/posts");
const outFile = path.join(__dirname, "periodmatch.txt");
const regexWord = /(\w)\.(\w)/g;

function getAllFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else if (file.endsWith(".md")) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getAllFiles(blogDir);
let output = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  let match;
  while ((match = regexWord.exec(text)) !== null) {
    // Check if the three characters before the period are 'www'
    const idx = match.index;
    if (idx >= 3 && text.slice(idx - 3, idx) === 'www') continue;
    // Find the full token (from whitespace to whitespace) containing the match
    let start = idx;
    let end = idx;
    while (start > 0 && !/\s/.test(text[start - 1])) start--;
    while (end < text.length && !/\s/.test(text[end])) end++;
    const token = text.slice(start, end);
    output.push(`${file}: ${token}`);
  }
}

fs.writeFileSync(outFile, output.join("\n"));
console.log(`Wrote ${output.length} matches to periodmatch.txt`);
