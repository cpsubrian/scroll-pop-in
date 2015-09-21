import React from 'react'
import autobind from 'autobind-decorator'
import createThrottledEvent from '../lib/createThrottledEvent'
import Comic from './Comic'

const PADDING = 30 * 2

@autobind
class App extends React.Component {

  static propTypes = {

  }

  state = {
    bounds: null,
    height: 0,
    top: 0
  }

  componentDidMount () {
    // Set spacer height.
    let comicNode = React.findDOMNode(this.refs.comic)
    let bounds = comicNode.getBoundingClientRect(comicNode)
    this.setState({
      bounds: bounds,
      height: bounds.height + (window.innerHeight * 2) + PADDING
    })

    // Scroll.
    this._onScroll = createThrottledEvent('scroll', 'throttledScroll', window)
    window.addEventListener('throttledScroll', this.onScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this._onScroll)
    window.removeEventListener('throttledScroll', this.onScroll)
  }

  onScroll (e) {
    let top = window.scrollY - window.innerHeight
    let scrollY = window.scrollY

    if (top > 0) {
      if (top > (this.state.bounds.height - window.innerHeight + PADDING)) {
        top = this.state.bounds.height - window.innerHeight + PADDING
      }
    } else {
      top = 0
    }

    this.setState({top, scrollY})
  }

  render () {
    return (
      <div className='app'>
        <div className='scroller'>
          <Comic
            ref='comic'
            style={{transform: `translateY(-${this.state.top}px) translateZ(0)`}}
            scrollY={this.state.scrollY}
          />
        </div>
        <div className='spacer' style={{height: this.state.height}}/>
      </div>
    )
  }
}

export default App
