const td = require("testdouble");

const expectedTests = [td.func()];

const expectedRestFile = {
  name: "Test File",
  url: "expected url",
  tests: expectedTests
};

const expectedResponse = {
  url: "http://example.com",
  status: 200,
  statusText: "OK",
  headers: { _headers: { foo: "bar" } },
  bodyUsed: false,
  redirected: "follow",
  ok: true
};

let command;
let toolbox;
let getRestFileTests;
let runRestFileTests;

beforeEach(() => {
  toolbox = td.object({
    loadRestFile: td.func(),
    fetchUsingRestFile: td.func(),
    print: td.object({
      info: td.func(),
      success: td.func(),
      warning: td.func()
    }),
    parameters: td.object({
      first: "restFile.js"
    })
  });

  td.when(toolbox.loadRestFile(toolbox.parameters.first)).thenReturn(
    expectedRestFile
  );

  td.when(toolbox.fetchUsingRestFile(expectedRestFile)).thenResolve(
    expectedResponse
  );

  getRestFileTests = td.replace("../utils/getRestFileTests");

  runRestFileTests = td.replace("../utils/runRestFileTests");

  command = require("./test");
});

afterEach(() => {
  td.reset();
});

test("should run correctly", async () => {
  td.when(getRestFileTests(expectedRestFile, expectedResponse)).thenReturn(
    expectedTests
  );

  await command.run(toolbox);

  td.verify(toolbox.print.info(`Testing: ${expectedRestFile.name}`));
  td.verify(
    runRestFileTests(
      expectedTests,
      td.matchers.isA(Function),
      td.matchers.isA(Function)
    )
  );
});
