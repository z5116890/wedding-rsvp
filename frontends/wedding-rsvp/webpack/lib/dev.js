'use strict'

const dotenv = require('dotenv')

if (process.env.DOTENV) {
  dotenv.config({ path: process.env.DOTENV })
} else {
  dotenv.config()
}

const fs = require('fs')
const path = require('path')
const resolve = require('./resolve')

  ; (function () {

    const keys = Object.keys(process.env);
    const items = keys.filter(key => key.match(/^CONFIG_/));

    console.log('ENV VARIABLEfff:', JSON.stringify(items));

    const values = items.reduce((total, key) => {
      return {
        ...total,
        [key.replace(/^CONFIG_/, '')]: process.env[key]
      }
    }, {})

    const file = `window.__APPCONFIG__ = ${JSON.stringify(values)}\n`
    fs.writeFileSync(resolve('static/config.js'), file)

  })()

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./base')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT && Number(process.env.PORT) || 8080

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',

  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') },
      ],
    },
    hot: true,
    static: false,
    // static: {
    //   // contentBase: false, // since we use CopyWebpackPlugin.
    //   watch: {
    //     poll: 3000,
    //     ignored: ['node_modules'],
    //   },
    // },
    compress: true,
    host: HOST,
    port: PORT,
    allowedHosts: 'all',
    open: false,
    client: {
      logging: 'warn',
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    devMiddleware: {
      publicPath: '/',
    },
    proxy: {
      '/api': {
        target: process.env.SERVER_URL || 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          ['^/api']: '',
        },
      },
    },
  },
  plugins: [
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
        NODE_ENV: '"development"'
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      templateData: {
        environment: 'development',
      },
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

module.exports = devWebpackConfig
