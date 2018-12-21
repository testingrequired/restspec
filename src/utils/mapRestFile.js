module.exports = function mapRestFile(restFile) {
  const { name, url, tests, parameters, body, ...options } = restFile;
  const formattedUrl = `${url}?${qs(parameters)}`;
  const formattedBody = JSON.stringify(body);
  return [formattedUrl, Object.assign({}, options, { body: formattedBody })];
};

const qs = params =>
  Object.keys(params)
    .map(k => `${k}=${params[k]}`)
    .join("&");
