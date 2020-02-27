import React, { Component } from 'react'
import songFile from '../music/song.mp3'

class Visualizer extends Component {
  constructor(){
    super()
    this.audio = new Audio(songFile)
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default Visualizer