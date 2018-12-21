const assert = require("assert");

module.exports = toolbox => {
  toolbox.runRestFileTests = (restFile, response) => {
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
  };
};
