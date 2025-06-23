const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

module.exports = () => {
  const dataPath = path.join(__dirname, 'content-updates.yml');
  if (fs.existsSync(dataPath)) {
    const content = fs.readFileSync(dataPath, 'utf8');
    return yaml.load(content) || {};
  }
  return {};
};
