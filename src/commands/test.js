const fetch = require("node-fetch");
const assert = require("assert");

module.exports = {
  name: "test",
  alias: ["t"],
  run: async toolbox => {
    const { loadRestFile } = toolbox;

    let restFile = loadRestFile(toolbox.parameters.first);

    toolbox.print.info(`Testing: ${restFile.name}`);

    const response = await fetch(restFile.url, restFile.options);

    if (restFile.tests) {
      const tests = restFile.tests(response, assert);

      tests.forEach((test, i) => {
        try {
          test();
          toolbox.print.success(`Test: ${i + 1} of ${tests.length}: Passed!`);
        } catch (e) {
          toolbox.print.warning(
            `Test: ${i + 1} of ${tests.length}: Failed!: ${e}`
          );
        }
      });
    }
  }
};
