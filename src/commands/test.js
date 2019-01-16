const getRestFileTests = require("../utils/getRestFileTests");
const runRestFileTests = require("../utils/runRestFileTests");
const fetch = require("node-fetch");
const mapRestFile = require("../utils/mapRestFile");
const loadRestFile = require("../utils/loadRestFile");

module.exports = {
  name: "test",
  alias: ["t"],
  run: async toolbox => {
    const { print, parameters } = toolbox;

    let restFile = loadRestFile(parameters.first);
    toolbox.print.info(`Testing: ${restFile.name}`);

    const [url, options] = mapRestFile(restFile);

    const response = await fetch(url, options);

    const tests = getRestFileTests(restFile.tests, response);

    runRestFileTests(
      tests,
      i => print.success(`Test: ${i + 1} of ${tests.length}: Passed!`),
      (i, e) =>
        print.warning(`Test: ${i + 1} of ${tests.length}: Failed!: ${e}`)
    );
  }
};
