
const webpackConfigCreator = require('./webpack.common')
const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
const merge = require('webpack-merge')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')

const config = {
  entry: [
    path.join(__dirname, '../client/index.js')
  ],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../build/client'),
    publicPath: '/'
  },
  plugins: [
    new OptimizeCss({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new ManifestPlugin({
      writeToFileEmit: true,
      fileName: `manifest.json`
    })
  ]
}

const options = {
  mode: 'production'
}

module.exports = merge(webpackConfigCreator(options), config)
