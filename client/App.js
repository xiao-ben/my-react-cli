import React from 'react'
import AutoFetch from './hocs/Autofetch'
import { hot } from 'react-hot-loader/root'
import withStyles from 'isomorphic-style-loader/withStyles'
import Home from './pages/Home/Home'
import styles from './App.css'

if (typeof window !== 'undefined') {
  const VConsole = require('vconsole')
  /* eslint-disable no-unused-vars */
  const vConsole = new VConsole()
}

function addClass (node, str) {
  if (!new RegExp('(^|\\s+)' + str).test(node.className)) {
    node.className = node.className + ' ' + str
  }
}

function removeClass (node, str) {
  if (new RegExp('(^|\\s+)' + str).test(node.className)) {
    node.className = node.className.replace(new RegExp('(^|\\s+)' + str), '')
  }
}

let currentSelectDom = null
class App extends React.Component {
  state = {
    domTree: []
  }

  ref = React.createRef()

  componentDidMount () {
    const currentPath = []
    const domTree = []
    function traversal (node, index = 0) {
      // 对node的处理
      if (node && node.nodeType === 1) {
        currentPath.push(`${node.tagName.toLowerCase()}${index !== undefined ? '-' + index : ''}`)
        domTree.push({
          tagName: node.tagName,
          path: `${currentPath.join('/')}`
        })
      }
      let i = 0
      const childNodes = Array.from(node.childNodes).filter(node => node && node.nodeType === 1)
      let item
      if (childNodes && childNodes.length) {
        for (; i < childNodes.length; i++, currentPath.pop()) {
          item = childNodes[i]
          if (item.nodeType === 1) {
            // 递归先序遍历子节点
            traversal(item, i)
          }
        }
      }
      return domTree
    }
    this.setState({
      domTree: traversal(this.ref.current)
    })
  }

  onClick = (e, item) => {
    let node = document.querySelector('#root')
    item.path.split('/').forEach(i => {
      node = node.childNodes[i.split('-')[1]]
    })
    if (currentSelectDom) {
      removeClass(currentSelectDom, styles.zaBorder)
      currentSelectDom.removeEventListener('click', this.handleZaClick)
    }
    addClass(node, styles.zaBorder)
    currentSelectDom = node
    node.addEventListener('click', this.handleZaClick)
    console.log(node, item.path.split('/'), item.path)
  }

  handleZaClick = e => {
    console.log('click', e.target.getAttribute('za-data'))
  }

  render () {
    const { setContext, ssrData } = this.props
    const { domTree } = this.state
    console.log(domTree, 'app-render------')
    return (
      <div ref={this.ref}>
        <div className={styles.title} onClick={() => {
          setContext({
            ssrData: {
              a: 1
            }
          })
        }}>
          <ul>
            <li>1234</li>
          </ul>
        </div>
        <div id='demo' za-data={JSON.stringify(ssrData)} >{JSON.stringify(ssrData)}</div>
        <Home />
        {
          domTree.map(item => (
            <div key={item.path} onClick={e => this.onClick(e, item)}>{item.path}</div>
          ))
        }
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
