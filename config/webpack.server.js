const webpackConfigCreator = require('./webpack.common')
const merge = require('webpack-merge')
const WebpackBar = require('webpackbar')
const StartServerPlugin = require('start-server-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const config = {
  target: 'node',
  entry: ['webpack/hot/signal', './server/index.js'],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../build/server'),
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new WebpackBar({
      name: 'server',
      color: 'yellow'
    }),
    new StartServerPlugin({
      name: 'server.js',
      keyboard: true,
      signal: true
    })
  ],
  externals: [nodeExternals({
    whitelist: ['webpack/hot/signal']
  })]
}

const options = {
  mode: 'development'
}

module.exports = merge(webpackConfigCreator(options), config)
