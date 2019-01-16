module.exports = (tests, onPass, onFailure) => {
  tests.forEach((test, i) => {
    try {
      test();
      onPass(i);
    } catch (e) {
      onFailure(i, e);
    }
  });
};
