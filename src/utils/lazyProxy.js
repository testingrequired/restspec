module.exports = obj =>
  new Proxy(obj, {
    get: (target, prop) => (...args) => () => target[prop].apply(null, args),
    apply: (target, thisArg, args) => () => target.apply(thisArg, args)
  });
