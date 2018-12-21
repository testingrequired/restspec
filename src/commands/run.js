module.exports = {
  name: "run",
  alias: ["r"],
  run: async toolbox => {
    const { loadRestFile, parameters, fetchUsingRestFile } = toolbox;

    let restFile = loadRestFile(parameters.first);

    toolbox.print.info(`Running: ${restFile.name}`);

    const response = await fetchUsingRestFile(restFile);

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
