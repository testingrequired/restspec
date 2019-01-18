const { performance } = require("perf_hooks");
const fetch = require("node-fetch");
const { load, mapForFetch } = require("../restfile");

module.exports = {
  name: "run",
  alias: ["r"],
  run: async toolbox => {
    const { print, parameters } = toolbox;

    let restFile = load(parameters.first);

    print.info(`Running: ${restFile.name}`);

    const [url, options] = mapForFetch(restFile);

    const startTime = performance.now();

    const response = await fetch(url, options);

    const endTime = performance.now();

    const responseTime = endTime - startTime;

    toolbox.print.info(`Response time: ${responseTime} ms`);

    toolbox.print.info(JSON.stringify(mapResponse(response), null, 2));
  }
};

function mapResponse(response) {
  const {
    url,
    status,
    statusText,
    headers: headersRaw,
    bodyUsed,
    redirected,
    ok
  } = response;
  const headers = headersRaw._headers;
  return { url, status, statusText, bodyUsed, redirected, headers, ok };
}
