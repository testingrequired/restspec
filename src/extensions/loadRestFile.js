module.exports = toolbox => {
  toolbox.loadRestFile = relativePath => {
    let file;

    try {
      file = toolbox.loadRelativeFile(relativePath);
    } catch (e) {
      toolbox.print.error(`Error loading file: ${e}`);
      process.exit(0);
    }

    return file;
  };
};