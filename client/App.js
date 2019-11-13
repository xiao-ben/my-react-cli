import React from 'react'
import { hot } from 'react-hot-loader/root'
import withStyles from 'isomorphic-style-loader/withStyles'
import Home from './pages/Home/Home'
import styles from './App.css'

if (typeof window !== 'undefined') {
  var VConsole = require('vconsole')
  /* eslint-disable no-unused-vars */
  var vConsole = new VConsole()
}

class App extends React.Component {
  render () {
    console.log('app-render------')
    return (
      <div>
        <div className={styles.title} onClick={() => {
          console.log(111231)
        }}>
          hot
        </div>
        <Home />
      </div>
    )
  }
}

App.getInitialData = () => {}

export default withStyles(styles)(hot(App))
