const expectedResponseTime = 10;

let expectedResponse;
let getTestsFn;
let assert;
let lazyProxy;
let lazyAssert;
let getTests;

beforeEach(() => {
  expectedResponse = td.func();

  getTestsFn = td.func();

  lazyAssert = td.func();

  assert = td.replace("assert");

  lazyProxy = td.replace("../utils/lazyProxy");
  td.when(lazyProxy(assert)).thenReturn(lazyAssert);

  getTests = require("./getTests");
});

test("should call getTests function ", () => {
  getTests(getTestsFn, expectedResponse, expectedResponseTime);
  td.verify(getTestsFn(expectedResponse, expectedResponseTime, lazyAssert));
});
