const td = require("testdouble");

const command = require("../.././src/commands/run");

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

let toolbox;

beforeEach(() => {
  toolbox = td.object({
    loadRestFile: td.func(),
    fetchUsingRestFile: td.func(),
    print: td.object({
      info: td.func()
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
});

afterEach(() => {
  td.reset();
});

test("should run correctly", async () => {
  await command.run(toolbox);

  td.verify(toolbox.print.info(`Running: ${expectedRestFile.name}`));
  td.verify(
    toolbox.print.info(JSON.stringify(expectedMappedResponse, null, 2))
  );
});
