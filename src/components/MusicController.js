import React, { Component } from 'react'
import songFile from '../music/song.mp3'
import { loadAudio, playAudio, pauseAudio } from '../store/actions/controlAudio'
import { connect } from 'react-redux'

class Visualizer extends Component {
  constructor(){
    super()
    this.state = {
      audioPlaying: false,
    }

    this.audio = new Audio(songFile)
    this.onClickPlay = this.onClickPlay.bind(this)
    this.onClickPause = this.onClickPause.bind(this)
    this.canvas = React.createRef()
  }

  componentDidMount() {
    const { loadAudio } = this.props
    const audio = new Audio(songFile)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    loadAudio(audio, audioContext)
  }

  onClickPlay() {
    const { playAudio } = this.props
    playAudio()
  }

  onClickPause() {
    const { pauseAudio } = this.props
    pauseAudio()
  }

  tick = () => {
    this.animationLooper(this.canvas.current);
    this.analyser.getByteTimeDomainData(this.frequency_array);
    this.rafId = requestAnimationFrame(this.tick);
  }

  render() {

    return (
      <div>
        <button onClick={this.onClickPlay}>PLAY</button>
        <button onClick={this.onClickPause}>PAUSE</button>

        <canvas ref={this.canvas} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  loadAudio,
  playAudio,
  pauseAudio,
}

export default connect(null, mapDispatchToProps)(Visualizer)