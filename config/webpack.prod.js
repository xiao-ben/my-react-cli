
const webpackConfigCreator = require('./webpack.common')
const merge = require('webpack-merge')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  plugins: [
    new OptimizeCss({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new ExtractTextPlugin({
      filename: '[name][hash].css',
      disable: true
    })
  ]
}

const options = {
  mode: 'production'
}

module.exports = merge(webpackConfigCreator(options), config)
