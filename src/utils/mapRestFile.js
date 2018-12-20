module.exports = function mapRestFile(restFile) {
  const { name, url, tests, parameters, ...options } = restFile;
  const formattedUrl = `${url}?${qs(parameters)}`;
  return [formattedUrl, options];
};

const qs = params =>
  Object.keys(params)
    .map(k => `${k}=${params[k]}`)
    .join("&");
