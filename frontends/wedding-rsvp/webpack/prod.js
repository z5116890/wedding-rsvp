'use strict'

const { merge } = require('webpack-merge')
const commonWebpackConfig = require('./common')
const libWebpackConfig = require('./lib/prod')

module.exports = merge(libWebpackConfig, commonWebpackConfig)
