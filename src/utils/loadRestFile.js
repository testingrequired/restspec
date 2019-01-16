const loadRelativeFile = require("./loadRelativeFile");
const validateRestFile = require("./validateRestFile");

module.exports = relativePath => {
  const file = loadRelativeFile(relativePath);

  const errors = validateRestFile(file);

  if (errors.length > 0) {
    throw new Error(`\n${errors.map(e => e.message).join("\n")}`);
  }

  return file;
};
