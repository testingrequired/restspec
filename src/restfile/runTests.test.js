const runTests = require("./runTests");

const expectedTests = [td.func(), td.func()];
const expectedError = new Error("Expected Error");

const onPass = td.func();
const onFailure = td.func();

test("should run every test", () => {
  runTests(expectedTests, onPass, onFailure);

  td.verify(expectedTests[0]());
  td.verify(expectedTests[1]());
});

test("should call onPass for each passing test", () => {
  runTests(expectedTests, onPass, onFailure);

  td.verify(onPass(0));
  td.verify(onPass(1));
});

test("should call onFailure for each failing test", () => {
  td.when(expectedTests[0]()).thenThrow(expectedError);
  td.when(expectedTests[1]()).thenThrow(expectedError);

  runTests(expectedTests, onPass, onFailure);

  td.verify(onFailure(0, expectedError));
  td.verify(onFailure(1, expectedError));
});
