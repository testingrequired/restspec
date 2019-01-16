module.exports = function mapRestFile(restFile) {
  const { name, url, tests, parameters, body, ...options } = restFile;
  const formattedUrl = parameters ? `${url}?${qs(parameters)}` : url;
  const formattedBody = JSON.stringify(body);
  return [formattedUrl, Object.assign({}, options, { body: formattedBody })];
};

const qs = params =>
  Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
