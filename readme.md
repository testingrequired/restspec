# restspec CLI

A CLI for restspec.

## Example file

```javascript
module.exports = {
  name: "Google",
  url: "http://google.com",
  options: { method: "GET" },
  tests: (res, assert) => [() => assert.equal(res.status, 200)]
};
```

## License

MIT - see LICENSE
