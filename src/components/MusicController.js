import React, { Component } from 'react'
import songFile from '../music/song5.mp3'
import { loadAudio, playAudio, pauseAudio } from '../store/actions/controlAudio'
import { connect } from 'react-redux'
import styled from 'styled-components'

const ControlContainer = styled.div`
  display: flex;
  justify-content: center;
  height: fit-content;
  margin-top: 30px;
`

class MusicController extends Component {
  constructor() {
    super()
    this.audio = new Audio(songFile)
    this.onClickPlay = this.onClickPlay.bind(this)
    this.onClickPause = this.onClickPause.bind(this)
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

  render() {
    return (
      <ControlContainer>
        <button onClick={this.onClickPlay}>PLAY</button>
        <button onClick={this.onClickPause}>PAUSE</button>
      </ControlContainer>
    )
  }
}

const mapStateToProps = ({ audioContext }) => ({
  audio: audioContext.audio
})

const mapDispatchToProps = {
  loadAudio,
  playAudio,
  pauseAudio,
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicController)