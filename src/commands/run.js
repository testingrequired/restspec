const path = require("path");
const fetch = require("node-fetch");

module.exports = {
  name: "run",
  alias: ["r"],
  run: async toolbox => {
    const { print, parameters } = toolbox;

    const filePath = parameters.first;

    let file;

    try {
      file = loadFile(filePath);
    } catch (e) {
      print.error(`Error loading file: ${e}`);
      process.exit(0);
    }

    const { name, url, options } = file;

    print.info(`Running: ${name}`);

    const response = await fetch(url, options);

    print.info(JSON.stringify(mapResponse(response), null, 2));
  }
};

function loadFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  const file = require(fullPath);
  return file;
}

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
