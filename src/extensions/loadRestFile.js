const loadRelativeFile = require("../utils/loadRelativeFile");
const validateRestFile = require("../utils/validateRestFile");

module.exports = toolbox => {
  toolbox.loadRestFile = relativePath => {
    let file;

    try {
      file = loadRelativeFile(relativePath);
    } catch (e) {
      toolbox.print.error(`Error loading file: ${e}`);
      process.exit(0);
    }

    const errors = validateRestFile(file);

    if (errors.length > 0) {
      throw new Error(`\n${errors.map(e => e.message).join("\n")}`);
    }

    return file;
  };
};
