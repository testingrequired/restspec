const loadRelativeFile = require("../utils/loadRelativeFile");
const validate = require("./validate");

module.exports = relativePath => {
  const file = loadRelativeFile(relativePath);

  const errors = validate(file);

  if (errors.length > 0) {
    throw new Error(`\n${errors.map(e => e.message).join("\n")}`);
  }

  return file;
};
