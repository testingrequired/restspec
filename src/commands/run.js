const fetch = require("node-fetch");
const loadRestFile = require("../utils/loadRestFile");
const mapRestFile = require("../utils/mapRestFile");

module.exports = {
  name: "run",
  alias: ["r"],
  run: async toolbox => {
    const { print, parameters } = toolbox;

    let restFile = loadRestFile(parameters.first);

    print.info(`Running: ${restFile.name}`);

    const [url, options] = mapRestFile(restFile);

    const response = await fetch(url, options);

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
