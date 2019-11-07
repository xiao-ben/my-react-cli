const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const autoprefixer = require('autoprefixer')

function webpackCommonConfigCreator (options) {
  return {
    mode: options.mode,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react'],
                plugins: ['react-hot-loader/babel']
              }
            }
          ]
        },
        {
          test: /\.(css|scss)$/,
          use: [
            'isomorphic-style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: '[path][name]_[local]--[hash:base64:5]'
                },
                importLoaders: 1,
                localsConvention: 'camelCase'
              }
            },
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: loader => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  autoprefixer()
                ]
              }
            }
          ].filter(Boolean)
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        },
        {
          test: /\.(jpg|png|svg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240,
                name: 'images/[hash].[ext]',
                publicPath: '/'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new WebpackBar()
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 1
      }
    }
  }
}

module.exports = webpackCommonConfigCreator
