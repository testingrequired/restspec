const lazyProxy = require("./lazyProxy");

describe("lazyProxy", () => {
  const expectedValue = "bar";
  let target;

  describe("object", () => {
    beforeEach(() => {
      target = { foo: () => expectedValue };
    });

    it(`should curry object methods`, () => {
      const lazy = lazyProxy(target);

      expect(lazy.foo()).toBeInstanceOf(Function);
    });

    it(`should return value from curry`, () => {
      const lazy = lazyProxy(target);

      expect(lazy.foo()()).toBe(expectedValue);
    });
  });

  describe("function", () => {
    beforeEach(() => {
      target = () => expectedValue;
    });

    it(`should curry function`, () => {
      const lazy = lazyProxy(target);

      expect(lazy()).toBeInstanceOf(Function);
    });

    it(`should return value from curry`, () => {
      const lazy = lazyProxy(target);

      expect(lazy()()).toBe(expectedValue);
    });
  });
});
