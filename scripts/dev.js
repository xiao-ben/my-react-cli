
const webpack = require('webpack')
const opn = require('opn')
const webpackServerConfig = require('../config/webpack.server.js')
const WebpackDevServer = require('webpack-dev-server')
const webpackClientConfig = require('../config/webpack.dev.js')

const port = process.env.SERVER_PORT || 5000
const clientPort = process.env.CLIENT_PORT || 5001
const clientCompiler = compile(webpackClientConfig)
const clientDevServer = new WebpackDevServer(
  clientCompiler,
  webpackClientConfig.devServer
)

clientDevServer.listen(webpackClientConfig.devServer.port, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Webpack-dev-server listening at :${clientPort}`)
  }
})

function compile (config) {
  let compiler
  try {
    compiler = webpack(config)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
  return compiler
}

const serverCompiler = compile(webpackServerConfig)
let triedOpenBrowser = false
serverCompiler.watch(
  {
    quiet: true,
    stats: 'none'
  },
  (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(err || stats.toJson('minimal'))
      return
    }
    console.log('Webpack compile done (server js).')
    if (!triedOpenBrowser) {
      try {
        setTimeout(
          opn.bind(null, `http://localhost:${port}`),
          1500
        )
      } catch (_) {}
      triedOpenBrowser = true
    }
  }
)
