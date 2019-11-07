import React from 'react'
import Router from 'koa-router'
import App from '../client/App'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import c2k from 'koa-connect'
import proxy from 'http-proxy-middleware'
import { renderToString } from 'react-dom/server'
import Koa from 'koa'
import { renderHtml } from './template'

let server = null
const port = process.env.SERVER_PORT || 5000
const clientPort = process.env.SERVER_PORT || 5001
const app = new Koa()
const router = new Router()

router.get('/public/*', c2k(proxy('/public', {
  target: `http://localhost:${clientPort}`
})))

router.get('/*', ctx => {
  const css = new Set()
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
  const body = renderToString(
    <StyleContext.Provider value={{ insertCss }}>
      <App />
    </StyleContext.Provider>
  )
  const html = renderHtml(css, body)
  ctx.body = html
})

app.use(router.routes())

if (module.hot) {
  process.once('SIGUSR2', () => {
    console.log('Got HMR signal from webpack StartServerPlugin.')
  })
  module.hot.accept('../client/App')
  module.hot.dispose(() => server.close())
}

server = app.listen(port, () => {
  console.log(`服务器已启动，请访问http://127.0.0.1:${port}`)
})
