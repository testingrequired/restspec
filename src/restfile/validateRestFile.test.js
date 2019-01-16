const validateRestFile = require("./validateRestFile");

const expectedName = "expected name";
const expectedUrl = "expected url";
const expectedMethod = "expected method";

test("should throw error if name is missing", () => {
  const restFile = {
    url: expectedUrl,
    method: expectedMethod
  };

  const errors = validateRestFile(restFile);

  expect(errors).toHaveLength(1);
  expect(errors[0].message).toBe("Name is required");
});

test("should throw error if url is missing", () => {
  const restFile = {
    name: expectedName,
    method: expectedMethod
  };

  const errors = validateRestFile(restFile);

  expect(errors).toHaveLength(1);
  expect(errors[0].message).toBe("Url is required");
});

test("should throw error if method is missing", () => {
  const restFile = {
    name: expectedName,
    url: expectedUrl
  };

  const errors = validateRestFile(restFile);

  expect(errors).toHaveLength(1);
  expect(errors[0].message).toBe("Method is required");
});

test("should return all errors", () => {
  const restFile = {};

  const errors = validateRestFile(restFile);

  expect(errors).toHaveLength(3);
});
