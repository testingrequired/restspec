const mapRestFile = require("../utils/mapRestFile");

const fetch = require("node-fetch");

module.exports = toolbox => {
  toolbox.fetchUsingRestFile = async restFile =>
    fetch(...mapRestFile(restFile));
};
