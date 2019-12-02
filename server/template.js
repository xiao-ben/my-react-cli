import path from 'path'
import appRoot from 'app-root-dir'
import fs from 'fs'
const isProd = process.env.NODE_ENV === 'production'

export const reader = () => JSON.parse(fs.readFileSync(path.join(appRoot.get(), '/build/client/manifest.json'), 'utf8'))
export const renderHtml = (css, body, jsPath, data) => {
  return `<!doctype html>
  <html>
    <head>
      <style>${[...css].join('')}</style>
    </head>
    <body>
      <div id="root">${body}</div>
      <textarea id="ssr-data" style="display: none">${JSON.stringify(data)}</textarea>
      <script type="text/javascript" src=${jsPath['vendors~main.js'].replace(isProd ? '/public' : '', '')}></script>
      <script type="text/javascript" src="${jsPath['main.js'].replace(isProd ? '/public' : '', '')}"></script>
    </body>
  </html>`
}
