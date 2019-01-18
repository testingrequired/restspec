const expectedRestFile = {
  name: "Test File"
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

const expectedMappedResponse = {
  url: "http://example.com",
  status: 200,
  statusText: "OK",
  bodyUsed: false,
  redirected: "follow",
  headers: { foo: "bar" },
  ok: true
};

const expectedFetchOptions = { foo: "bar" };

const expectedResponseTime = 10;

let command;
let toolbox;
let load;
let perf_hooks;
let fetch;

beforeEach(() => {
  toolbox = td.object({
    print: td.object({
      info: td.func()
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

  command = require("./run");
});

test("should run correctly", async () => {
  await command.run(toolbox);

  td.verify(toolbox.print.info(`Running: ${expectedRestFile.name}`));

  td.verify(toolbox.print.info(`Response time: ${expectedResponseTime} ms`));

  td.verify(
    toolbox.print.info(JSON.stringify(expectedMappedResponse, null, 2))
  );
});
