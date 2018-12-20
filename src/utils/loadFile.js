const path = require("path");

module.exports = function loadFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  const file = require(fullPath);
  return file;
};
