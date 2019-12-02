import React from 'react'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import ReactDOM from 'react-dom'
import App from './App.js'

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

let ssrData = null
if (document.getElementById('ssr-data')) {
  ssrData = JSON.parse(document.getElementById('ssr-data').value)
}

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
renderMethod(
  <StyleContext.Provider value={{ insertCss }}>
    <App ssrData={ssrData} />
  </StyleContext.Provider>
  , document.getElementById('root'))
