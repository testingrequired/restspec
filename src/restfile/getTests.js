const assert = require("assert");

module.exports = (getTests, response, responseTime) =>
  getTests(response, responseTime, assert);
