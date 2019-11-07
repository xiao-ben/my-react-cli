import React from 'react'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import ReactDom from 'react-dom'
import App from './App.js'

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

ReactDom.hydrate(
  <StyleContext.Provider value={{ insertCss }}>
    <App />
  </StyleContext.Provider>
  , document.getElementById('root'))
