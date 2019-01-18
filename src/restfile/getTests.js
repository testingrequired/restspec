const lazyAssert = require("./lazyAssert");

module.exports = (getTests, response, responseTime) =>
  getTests(response, responseTime, lazyAssert);
