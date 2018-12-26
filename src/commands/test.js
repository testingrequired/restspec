const getRestFileTests = require("../utils/getRestFileTests");

const runRestFileTests = require("../utils/runRestFileTests");

module.exports = {
  name: "test",
  alias: ["t"],
  run: async toolbox => {
    const { loadRestFile, fetchUsingRestFile, print } = toolbox;

    let restFile = loadRestFile(toolbox.parameters.first);
    toolbox.print.info(`Testing: ${restFile.name}`);

    const response = await fetchUsingRestFile(restFile);

    const tests = getRestFileTests(restFile, response);

    runRestFileTests(
      tests,
      i => print.success(`Test: ${i + 1} of ${tests.length}: Passed!`),
      (i, e) =>
        print.warning(`Test: ${i + 1} of ${tests.length}: Failed!: ${e}`)
    );
  }
};
