
const webpackConfigCreator = require('./webpack.common')
const path = require('path')
const merge = require('webpack-merge')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')

const config = {
  entry: [
    path.join(__dirname, '../client/index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../build/client'),
    publicPath: '/'
  },
  plugins: [
    new OptimizeCss({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
}

const options = {
  mode: 'production'
}

module.exports = merge(webpackConfigCreator(options), config)
