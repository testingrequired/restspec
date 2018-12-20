const mapRestFile = require("../../src/utils/mapRestFile");

const expectedUrl = "http://google.com";

const expectedOptions = {
  method: "GET"
};

const restFile = {
  name: "Google",
  url: expectedUrl,
  options: expectedOptions,
  tests: (response, assert) => [() => assert.equal(response.status, 200)]
};

test(`should map rest file correctly`, () => {
  const result = mapRestFile(restFile);

  expect(result).toHaveLength(2);
  expect(result[0]).toBe(expectedUrl);
  expect(result[1]).toEqual(expectedOptions);
});
