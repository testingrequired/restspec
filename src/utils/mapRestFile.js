module.exports = function mapRestFile(restFile) {
  const { url, options } = restFile;
  return [url, options];
};
