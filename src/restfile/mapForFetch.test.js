const mapForFetch = require("./mapForFetch");

const expectedUrl = "http://example.com/?foo=bar";

const expectedOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
  redirect: "follow",
  body: '{"value":1}'
};

const restFile = {
  name: "Google",
  method: "GET",
  url: "http://example.com/",
  redirect: "follow",
  body: {
    value: 1
  },
  parameters: { foo: "bar" },
  headers: {
    "Content-Type": "application/json"
  },
  tests: (response, assert) => [() => assert.equal(response.status, 200)]
};

let result;

beforeEach(() => {
  result = mapForFetch(restFile);
});

test(`should map correct number of arguments`, () => {
  expect(result).toHaveLength(2);
});

test(`should map first argument to url`, () => {
  expect(result[0]).toBe(expectedUrl);
});

test(`should map second argument to options`, () => {
  expect(result[1]).toEqual(expectedOptions);
});

test("should map if url parameters not set", () => {
  expect(() => {
    mapForFetch({
      name: "Google",
      method: "GET",
      url: "http://example.com/"
    });
  }).not.toThrow();
});
