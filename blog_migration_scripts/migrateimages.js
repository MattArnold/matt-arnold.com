const fs = require('fs');
const path = require('path');

const srcDirs = [
  path.join(__dirname, '../dreamwidth/images'),
];
const destDir = path.join(__dirname, '../src/img/blog');

srcDirs.forEach(srcDir => {
  if (!fs.existsSync(srcDir)) return;
  fs.readdirSync(srcDir).forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied: ${file}`);
  });
});