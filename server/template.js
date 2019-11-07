export const renderHtml = (css, body) => `<!doctype html>
<html>
  <head>
    <style>${[...css].join('')}</style>
  </head>
  <body>
    <div id="root">${body}</div>
    <script type="text/javascript" src="/public/vendors~main.js"></script>
    <script type="text/javascript" src="/public/main.js"></script>
  </body>
</html>`
