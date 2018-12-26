module.exports = relativePath => {
  const path = require("path");
  const fullPath = path.join(process.cwd(), relativePath);
  return require(fullPath);
};
