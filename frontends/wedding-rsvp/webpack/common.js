'use strict'

const webpack = require('webpack')

module.exports = {
  resolve: {
    fallback: {
      'stream': require.resolve('stream-browserify'),
      'crypto': require.resolve('crypto-browserify'),
      'vm': require.resolve("vm-browserify")
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
  node: {
    global: true,
  },
}
