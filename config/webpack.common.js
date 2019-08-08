const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

function webpackCommonConfigCreator (options) {
  /**
   * options:
   *   mode // 开发模式
   */

  return {
    mode: options.mode,
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, '../build'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, '../src'),
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
          include: path.resolve(__dirname, '../src'),
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
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
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9' // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              }
            ]
          })
        },
        {
          test: /\.(css|scss)$/,
          exclude: path.resolve(__dirname, '../src'),
          use: [
            'style-loader/url',
            {
              loader: 'file-loader',
              options: {
                name: 'css/[name].css',
                publicPath: '/'
              }
            }
          ]
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
    plugins: [
      // 生成打包文件中的 index.html
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html'
      }),
      // 每次编译 都清除上次的编译结果
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve(process.cwd(), 'build/'), path.resolve(process.cwd(), 'dist/')]
      }),
      new ExtractTextPlugin({
        filename: 'css/[name][hash].css',
        disable: options.mode === 'development' // 开发环境下禁止抽离css文件，否则无法使用热更新
      })
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
