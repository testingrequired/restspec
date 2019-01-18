const assert = require("assert");

const proxiedMethods = [
  "deepEqual",
  "deepStrictEqual",
  "doesNotThrow",
  "equal",
  "fail",
  "ifError",
  "notDeepEqual",
  "notDeepStrictEqual",
  "notEqual",
  "notStrictEqual",
  "ok",
  "strictEquals",
  "throws"
];

const lazyAssert = new Proxy(assert, {
  get: (target, prop) =>
    proxiedMethods.includes(prop)
      ? (...args) => () => target[prop].apply(null, args)
      : target[prop],
  apply: (target, thisArg, args) => () => target.apply(thisArg, args)
});

module.exports = lazyAssert;
