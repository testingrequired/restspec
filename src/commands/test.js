const fetch = require("node-fetch");
const loadFile = require("../utils/loadFile");
const assert = require("assert");

module.exports = {
  name: "test",
  alias: ["t"],
  run: async toolbox => {
    const { print, parameters } = toolbox;

    const filePath = parameters.first;

    let file;

    try {
      file = loadFile(filePath);
    } catch (e) {
      print.error(`Error loading file: ${e}`);
      process.exit(0);
    }

    const { name, url, options, tests } = file;

    print.info(`Testing: ${name}`);

    const response = await fetch(url, options);

    if (tests) {
      const allTests = tests(response, assert);
      allTests.forEach((test, i) => {
        try {
          test();
          print.success(`Test: ${i + 1} of ${allTests.length}: Passed!`);
        } catch (e) {
          print.warning(`Test: ${i + 1} of ${allTests.length}: Failed!: ${e}`);
        }
      });
    }
  }
};
