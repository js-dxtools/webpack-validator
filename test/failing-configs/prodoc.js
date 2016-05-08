const path = require('path')

/**
 * This is a minimal reproduction from https://github.com/caojinli/prodoc/blob/master/build/webpack.config.js
 * to reproduce the error that was discussed in https://github.com/reactjs/redux/issues/1681
 */

module.exports = {
  target: 'web',
  resolve: {
    root: path.join(__dirname, 'prodoc'),
    extensions: ['', '.js', '.jsx', '.json'],
  },
}
