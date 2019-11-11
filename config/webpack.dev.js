const webpackConfigCreator = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const ManifestPlugin = require('webpack-manifest-plugin')
const WebpackBar = require('webpackbar')
const path = require('path')

const port = process.env.CLIENT_PORT || 5001
const config = {
  entry: [
    path.join(__dirname, '../client/index.js')
  ],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../build/client'),
    publicPath: '/public/'
  },
  devServer: {
    contentBase: path.join(__dirname, '../build/client'),
    hot: true,
    inline: true,
    port: port,
    publicPath: '/public/',
    sockPort: port,
    overlay: true,
    headers: {
      'access-control-allow-origin': '*'
    }
  },
  plugins: [
    new WebpackBar({
      name: 'client',
      color: 'green'
    }),
    new ManifestPlugin({
      writeToFileEmit: true,
      fileName: `manifest.json`
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html'
    })
  ],
  devtool: 'inline-source-map'
}

const options = {
  mode: 'development'
}

module.exports = merge(webpackConfigCreator(options), config)
