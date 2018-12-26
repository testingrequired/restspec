const assert = require("assert");

module.exports = (restFile, response) => {
  return restFile.tests(response, assert);
};
