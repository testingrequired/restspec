const fetch = require("node-fetch");

module.exports = {
  name: "run",
  alias: ["r"],
  run: async toolbox => {
    const { loadRestFile } = toolbox;

    let restFile = loadRestFile(toolbox.parameters.first);

    toolbox.print.info(`Running: ${restFile.name}`);

    const response = await fetch(restFile.url, restFile.options);

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
