'use strict'

const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseWebpackConfig = require('./base')
const resolve = require('./resolve')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: resolve('build'),
    filename: path.posix.join('static', 'js/[name].[chunkhash].js'),
    chunkFilename: path.posix.join('static', 'js/[id].[chunkhash].js'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      `...`,
      new CssMinimizerPlugin()
    ],
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      // to remove the local development console warning from vue.runtime.esm-bundler.js:
      // Feature flags __VUE_OPTIONS_API__, __VUE_PROD_DEVTOOLS__ are not explicitly defined.
      // see: https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      // remove local development console warning from vue.runtime.esm-bundler.js from vue 3.4 onwards
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      // to remove the local development console warning from vue-i18n.esm-bundler.js:
      // You are running the esm-bundler build of vue-i18n.
      // It is recommended to configure your bundler to explicitly replace feature flag globals
      // with boolean literals to get proper tree-shaking in the final bundle.
      // TODO: in the future we can turn these off for even reduced bundle size.
      // see: https://vue-i18n.intlify.dev/guide/advanced/optimization#feature-build-flags
      // SO reference: https://stackoverflow.com/questions/66140411/you-are-running-the-esm-bundler-build-of-vue-i18n-it-is-recommended-to-configur
      __INTLIFY_PROD_DEVTOOLS__: false,
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: true,
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: resolve('build/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunksSortMode: 'auto',
      templateData: {
        environment: 'production',
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    // copy custom static assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('static'),
          to: 'static',
          globOptions: {
            ignore: ['.*'],
          },
        },
      ],
    }),
  ]
})

module.exports = webpackConfig
