import React from 'react'
import { hot } from 'react-hot-loader/root'
import withStyles from 'isomorphic-style-loader/withStyles'
import Home from './pages/Home/Home'
import styles from './App.css'

class App extends React.Component {
  render () {
    console.log('app-render------')
    return (
      <div>
        <div className={styles.title} onClick={() => {
          console.log(11)
        }}>
          hot1
        </div>
        <Home />
      </div>
    )
  }
}

App.getInitialData = () => {}

export default withStyles(styles)(hot(App))
