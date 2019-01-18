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

const expectedResponseTime = 10;

let command;
let toolbox;
let load;
let mapForFetch;
let perf_hooks;
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

  perf_hooks = td.replace(
    "perf_hooks",
    td.object({
      performance: td.object({
        now: td.func()
      })
    })
  );

  td.when(perf_hooks.performance.now()).thenReturn(0, expectedResponseTime);

  fetch = td.replace("node-fetch");
  td.when(fetch(expectedRestFile.url, expectedFetchOptions)).thenResolve(
    expectedResponse
  );

  getTests = td.replace("../restfile/getTests");
  td.when(
    getTests(expectedRestFile.tests, expectedResponse, expectedResponseTime)
  ).thenResolve(expectedTests);

  runTests = td.replace("../restfile/runTests");

  command = require("./test");
});

test("should run correctly", async () => {
  await command.run(toolbox);

  td.verify(toolbox.print.info(`Testing: ${expectedRestFile.name}`));

  td.verify(toolbox.print.info(`Response time: ${expectedResponseTime} ms`));

  td.verify(
    runTests(
      expectedTests,
      td.matchers.isA(Function),
      td.matchers.isA(Function)
    )
  );
});
