![restspec](/docs/restspec.png)

## Usage

### Example file

```javascript
// ./rest-files/google.js
module.exports = {
  name: "Google",
  url: "http://google.com",
  options: { method: "GET" },
  tests: (res, assert) => [() => assert.equal(res.status, 200)]
};
```

### Run

Calls url and prints response

```bash
$ restspec run ./rest-files/google.js
```

### Test

Calls url and runs tests

```bash
$ restspec test ./rest-files/google.js
```

## License

MIT - see LICENSE
