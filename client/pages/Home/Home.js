import React from 'react'
import withStyles from 'isomorphic-style-loader/withStyles'
import styles from './Home.css'

function Home () {
  return (
    <div className={styles.title}>
      hello react
    </div>
  )
}

export default withStyles(styles)(Home)
