module.exports = {
  name: "test",
  alias: ["t"],
  run: async toolbox => {
    const { loadRestFile, fetchUsingRestFile, runRestFileTests } = toolbox;

    let restFile = loadRestFile(toolbox.parameters.first);
    toolbox.print.info(`Testing: ${restFile.name}`);

    const response = await fetchUsingRestFile(restFile);
    runRestFileTests(restFile, response);
  }
};
