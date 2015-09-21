import React from 'react'
import Row from './Row'

class Comic extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    scrollY: React.PropTypes.number
  }

  componentWillMount () {
    this.rows = []
    for (let i = 0, count = 50; i < count; i++) {
      this.rows.push({height: 150 + (Math.floor(Math.random() * 3) * 100)})
    }
  }

  renderRows () {
    return this.rows.map((row) => {
      return <Row height={row.height} scrollY={this.props.scrollY}/>
    })
  }

  render () {
    return (
      <div className='comic' style={this.props.style}>
        <h1>Comic Title</h1>
        <div className='rows'>
          {this.renderRows()}
        </div>
      </div>
    )
  }
}

export default Comic
