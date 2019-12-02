import React from 'react'

const Context = React.createContext()
function AutoFetch (Component) {
  class AutoFetch extends Component {
    constructor (props, context) {
      super(props, context)
      this.state = {
        ssrData: props.ssrData,
        setContext: this.setContext
      }
    }

    setContext = data => {
      this.setState({
        ...this.state,
        ...data
      })
    }

    componentDidMount () {
      if (!this.props.ssrData) {
        Component.getInitialData().then(res => {
          this.setState({
            ssrData: res
          })
        })
      }
    }

    render () {
      return (
        <Context.Provider value={this.state}>
          <Context.Consumer>
            {value => <Component {...value} />}
          </Context.Consumer>
        </Context.Provider>
      )
    }
  }
  return AutoFetch
}

export default AutoFetch
