# Testing this library
This library colocates test files with implementations. This means that for `src/index.js` you will find a `src/index.test.js` that tests the former.

The `test` directory contains general test setup, utils and fixtures (data used for testing):

- [`test/mocha.opts`](https://mochajs.org/#mocha-opts) is a convention file loaded by mocha for specifying the command line arguments. We tell it to require
- `test/setup.js`, which will call `babel-register` with a babel-plugin that overwrites node's builtin `assert` functionality with [`power-assert`](https://github.com/power-assert-js/power-assert).
- `test/passing-configs` are example real world webpack configs, for which we know they should be valid. They are used as test data in `src/index.test.js`.
- `test/utils` provides test utility functions.
