const webpackConfigCreator = require('./webpack.common')
const merge = require('webpack-merge')
const WebpackBar = require('webpackbar')
const StartServerPlugin = require('start-server-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

const config = {
  target: 'node',
  entry: [!isProd && 'webpack/hot/signal', './server/index.js'].filter(Boolean),
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
    !isProd && new StartServerPlugin({
      name: 'server.js',
      keyboard: true,
      signal: true
    })
  ].filter(Boolean),
  externals: [nodeExternals({
    whitelist: ['webpack/hot/signal']
  })]
}

const options = {
  mode: isProd ? 'production' : 'development'
}

module.exports = merge(webpackConfigCreator(options), config)
