/* eslint-disable */

require('babel-register')({
  plugins: ['babel-plugin-espower']
});

const assert = require('power-assert');
global.assert = assert;
