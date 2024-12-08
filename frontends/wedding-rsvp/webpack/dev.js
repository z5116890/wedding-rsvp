'use strict'

const { merge } = require('webpack-merge')
const commonWebpackConfig = require('./common')
const libWebpackConfig = require('./lib/dev')

module.exports = merge(libWebpackConfig, commonWebpackConfig)
