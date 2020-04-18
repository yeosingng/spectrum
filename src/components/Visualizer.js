import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCanvas } from '../store/actions/visualizeAudio'
import styled from 'styled-components'
import _ from 'lodash'

const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 1024px;
  margin-top: 100px;
`

const HEIGHT = 350

class Visualizer extends Component {
  constructor(props){
    super(props)
    this.canvas = React.createRef()
    // this.tick = this.tick.bind(this)

    this.tick = _.throttle(this.tick.bind(this), 10)
    this.props.setCanvas(this.canvas)
  }

  componentDidUpdate(prevProps, _prevState, _snapshot) {
    if (prevProps.audioPlaying !== this.props.audioPlaying) {
      if (!prevProps.audioPlaying) {
        this.rafId = requestAnimationFrame(this.tick)
      } else {
        cancelAnimationFrame(this.rafId)
      }
    }
  }

  tick = () => {
    const { frequencyArray, analyser } = this.props
    this.renderAnimation(this.canvas.current)
    analyser.getByteTimeDomainData(frequencyArray)
    this.rafId = requestAnimationFrame(this.tick)
  }

  drawBar(ctx, x, y) {
    ctx.save()
    ctx.beginPath()

    ctx.moveTo(x, HEIGHT)
    ctx.lineTo(x, y)

    ctx.stroke()
  }

  renderAnimation(canvas) {
    const { frequencyArray } = this.props
    let ctx = canvas.getContext('2d')
    ctx.canvas.height = HEIGHT
    ctx.canvas.width = window.innerWidth - 100
    ctx.clearRect(0, 0, window.innerWidth - 100, HEIGHT)

    let i
    for (i = 0; i < frequencyArray.length; i++) {
      this.drawBar(ctx, i, frequencyArray[i])
    }
  }

  render() {
    return (
      <CanvasContainer>
        <canvas ref={this.canvas} style={{ borderBottom: '1px solid light-gray'}} />
      </CanvasContainer>
    )
  }
}

const mapStateToProps = ({ audioContext }) => ({
  frequencyArray: audioContext.frequencyArray,
  audioPlaying: audioContext.audioPlaying,
  analyser: audioContext.analyser,
  audio: audioContext.audio,
})

const mapDispatchToProps = {
  setCanvas,
}

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer)