const fetch = require("node-fetch");
const getTests = require("../restfile/getTests");
const runTests = require("../restfile/runTests");
const mapForFetch = require("../restfile/mapForFetch");
const load = require("../restfile/load");

module.exports = {
  name: "test",
  alias: ["t"],
  run: async toolbox => {
    const { print, parameters } = toolbox;

    let restFile = load(parameters.first);
    toolbox.print.info(`Testing: ${restFile.name}`);

    const [url, options] = mapForFetch(restFile);

    const response = await fetch(url, options);

    const tests = getTests(restFile.tests, response);

    runTests(
      tests,
      i => print.success(`Test: ${i + 1} of ${tests.length}: Passed!`),
      (i, e) =>
        print.warning(`Test: ${i + 1} of ${tests.length}: Failed!: ${e}`)
    );
  }
};
