import React, { Component } from 'react'
import { loadAudio, playAudio, pauseAudio } from '../store/actions/controlAudio'
import { connect } from 'react-redux'
import styled from 'styled-components'

class MusicController extends Component {
  constructor() {
    super()
    this.onClickPlay = this.onClickPlay.bind(this)
    this.onClickPause = this.onClickPause.bind(this)
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
        <button onClick={this.onClickPause} style={{ marginLeft: 10 }}>PAUSE</button>
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

const ControlContainer = styled.div`
  display: flex;
  justify-content: center;
  height: fit-content;
  margin-top: 30px;
`
