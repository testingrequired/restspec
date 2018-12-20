const fetch = require("node-fetch");

function map(restFile) {
  const { url, options } = restFile;
  return [url, options];
}

module.exports = toolbox => {
  toolbox.fetchUsingRestFile = async restFile => fetch(...map(restFile));
};
