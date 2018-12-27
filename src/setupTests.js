const td = require("testdouble");
global.td = td;
require("testdouble-jest")(td, jest);

afterEach(() => {
  td.reset();
});
