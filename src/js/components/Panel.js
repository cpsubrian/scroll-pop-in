import React from 'react'

class Panel extends React.Component {

  static propTypes = {
    show: React.PropTypes.bool,
    color: React.PropTypes.string
  }

  render () {
    return (
      <div
        className={`panel${this.props.show ? ' show' : ''}`}
        style={{backgroundColor: this.props.color}}
      />
    )
  }
}

export default Panel
