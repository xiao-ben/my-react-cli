import React from 'react'
import AutoFetch from './hocs/Autofetch'
import { hot } from 'react-hot-loader/root'
import withStyles from 'isomorphic-style-loader/withStyles'
import Home from './pages/Home/Home'
import styles from './App.css'

if (typeof window !== 'undefined') {
  // var VConsole = require('vconsole')
  /* eslint-disable no-unused-vars */
  // var vConsole = new VConsole()
}

class App extends React.Component {
  render () {
    const { setContext, ssrData } = this.props
    console.log('app-render------')
    return (
      <div>
        <div className={styles.title} onClick={() => {
          setContext({
            ssrData: {
              a: 1
            }
          })
        }}>
          hot123
        </div>
        <div>{JSON.stringify(ssrData)}</div>
        <Home />
      </div>
    )
  }
}

App.getInitialData = () => {
  return new Promise((resolve, reject) => {
    resolve({ a: '123134' })
  })
}

export default AutoFetch(withStyles(styles)(hot(App)))
