const expectedFileName = "expected file name";

const expectedFile = "";
const expectedErrors = [];

let load;
let loadRelativeFile;
let validate;

beforeEach(() => {
  loadRelativeFile = td.replace("../utils/loadRelativeFile");
  td.when(loadRelativeFile(expectedFileName)).thenReturn(expectedFile);

  validate = td.replace("./validate");

  load = require("./load");
});

test(`should throw if validation fails`, () => {
  td.when(validate(expectedFile)).thenReturn([
    new Error("foo"),
    new Error("bar")
  ]);

  expect(() => load(expectedFileName)).toThrowError("\nfoo\nbar");
});

test("should return file when validation passes", () => {
  td.when(validate(expectedFile)).thenReturn(expectedErrors);
  const result = load(expectedFileName);

  expect(result).toBe(expectedFile);
});
