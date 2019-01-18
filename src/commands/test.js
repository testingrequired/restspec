const { performance } = require("perf_hooks");
const fetch = require("node-fetch");
const { load, mapForFetch, getTests, runTests } = require("../restfile");

module.exports = {
  name: "test",
  alias: ["t"],
  run: async toolbox => {
    const { print, parameters } = toolbox;

    let restFile = load(parameters.first);
    toolbox.print.info(`Testing: ${restFile.name}`);

    const [url, options] = mapForFetch(restFile);

    const startTime = performance.now();

    const response = await fetch(url, options);

    const endTime = performance.now();

    const responseTime = endTime - startTime;

    toolbox.print.info(`Response time: ${responseTime} ms`);

    const tests = await getTests(restFile.tests, response, responseTime);

    runTests(
      tests,
      i => print.success(`Test: ${i + 1} of ${tests.length}: Passed!`),
      (i, e) =>
        print.warning(`Test: ${i + 1} of ${tests.length}: Failed!: ${e}`)
    );
  }
};
