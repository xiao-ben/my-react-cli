
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../config/webpack.dev.js')

const compiler = webpack(webpackConfig)
const options = Object.assign({}, webpackConfig.devServer, {
  open: true
})
const server = new WebpackDevServer(compiler, options)

server.listen(5000, '127.0.0.1', () => {
  console.log('Starting server on http://localhost:5000')
})
