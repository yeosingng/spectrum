import React, { Component } from 'react'
import songFile from '../music/song.mp3'
import { connect } from 'react-redux'

class Visualizer extends Component {
  constructor(){
    super()

  }

  render() {
    return (
      <canvas ref={this.canvas} />
    )
  }

}

const mapStateToProps = ({

})

export default connect(mapStateToProps, null)(Visualizer)