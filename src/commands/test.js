const path = require("path");
const fetch = require("node-fetch");

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
      tests.forEach((test, i) => {
        try {
          test(response);
          print.success(`Test: ${i + 1} of ${tests.length}: Passed!`);
        } catch (e) {
          print.warning(`Test: ${i + 1} of ${tests.length}: Failed!: ${e}`);
        }
      });
    }
  }
};

function loadFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  const file = require(fullPath);
  return file;
}
