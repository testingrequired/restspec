module.exports = restFile => {
  const errors = [];

  if (!restFile.name) {
    errors.push(new Error("Name is required"));
  }

  if (!restFile.url) {
    errors.push(new Error("Url is required"));
  }

  if (!restFile.method) {
    errors.push(new Error("Method is required"));
  }

  return errors;
};
