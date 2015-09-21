import React from 'react'
import randomColor from 'randomcolor'
import Panel from './Panel'

class Row extends React.Component {

  static propTypes = {
    height: React.PropTypes.number,
    scrollY: React.PropTypes.scrollY
  }

  state = {
    bounds: null
  }

  componentWillMount () {
    this.panels = []
    for (let i = 0, count = Math.ceil(Math.random() * 3); i < count; i++) {
      this.panels.push({color: randomColor()})
    }
  }

  componentDidMount () {
    let node = React.findDOMNode(this)
    let bounds = node.getBoundingClientRect()
    this.setState({bounds})
  }

  getStyle () {
    let style = {height: this.props.height}
    return style
  }

  renderPanels () {
    let show = false
    return this.panels.map((panel, i) => {
      if (this.state.bounds) {
        show = (this.props.scrollY - (window.innerHeight / (4 - i))) > this.state.bounds.top
      }
      return <Panel color={panel.color} show={show}/>
    })
  }

  render () {
    return (
      <div className='row' style={this.getStyle()}>
        {this.renderPanels()}
      </div>
    )
  }
}

export default Row
