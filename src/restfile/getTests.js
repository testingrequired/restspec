const assert = require("assert");
const lazyProxy = require("../utils/lazyProxy");

module.exports = (getTests, response, responseTime) =>
  getTests(response, responseTime, lazyProxy(assert));
