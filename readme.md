![restspec](/docs/restspec.png)

Interact or test REST resources from the command line.

## Installation

```bash
$ npm install @testingrequired/restspec
```

## Usage

### Rest Files

A rest file is a javascript file that defines a single request plus optional tests. They are intended to be edited as code and live with your project's tests.

#### Example

Rest files can be located anywhere.

```javascript
// ./tests/rest/google.js
module.exports = {
  name: "Google",
  url: "http://google.com",
  options: { method: "GET" },
  tests: (response, assert) => [() => assert.equal(response.status, 200)]
};
```

### Run

Calls url and prints response from rest file

```bash
$ restspec run ./tests/rest/google.js
```

### Test

Calls url and runs tests from rest file

```bash
$ restspec test ./tests/rest/google.js
```

## License

MIT - see LICENSE
