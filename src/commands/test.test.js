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

const expectedFetchOptions = { foo: "bar" };

let command;
let toolbox;
let load;
let mapForFetch;
let fetch;
let getTests;
let runTests;

beforeEach(() => {
  toolbox = td.object({
    print: td.object({
      info: td.func(),
      success: td.func(),
      warning: td.func()
    }),
    parameters: td.object({
      first: "restFile.js"
    })
  });

  load = td.replace("../restfile/load");
  td.when(load(toolbox.parameters.first)).thenReturn(expectedRestFile);

  mapForFetch = td.replace("../restfile/mapForFetch");
  td.when(mapForFetch(expectedRestFile)).thenReturn([
    expectedRestFile.url,
    expectedFetchOptions
  ]);

  fetch = td.replace("node-fetch");
  td.when(fetch(expectedRestFile.url, expectedFetchOptions)).thenResolve(
    expectedResponse
  );

  getTests = td.replace("../restfile/getTests");
  td.when(getTests(expectedRestFile.tests, expectedResponse)).thenReturn(
    expectedTests
  );

  runTests = td.replace("../restfile/runTests");

  command = require("./test");
});

test("should run correctly", async () => {
  await command.run(toolbox);

  td.verify(toolbox.print.info(`Testing: ${expectedRestFile.name}`));

  td.verify(
    runTests(
      expectedTests,
      td.matchers.isA(Function),
      td.matchers.isA(Function)
    )
  );
});
