
const webpack = require('webpack')
const webpackServerConfig = require('../config/webpack.server.js')
const webpackConfig = require('../config/webpack.prod.js')

webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err || stats.toJson('minimal'))
  }
})

webpack(webpackServerConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err || stats.toJson('minimal'))
  }
})
