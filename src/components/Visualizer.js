import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'

const HEIGHT = 400

class Visualizer extends Component {
  constructor(props){
    super(props)
    this.canvas = React.createRef()
    this.tick = _.throttle(this.tick.bind(this), 10)
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

  drawBar(ctx, xPos, yPos, width, padding) {
    ctx.save()
    ctx.beginPath()

    const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT)
    gradient.addColorStop(0, 'red')
    gradient.addColorStop(1, 'green')

    ctx.fillStyle = gradient
    ctx.fillRect(xPos + padding, HEIGHT - yPos, width, yPos)
    ctx.stroke()
  }

  renderAnimation(canvas) {
    const { frequencyArray } = this.props

    const width = window.innerWidth

    let ctx = canvas.getContext('2d')
    ctx.canvas.height = HEIGHT
    ctx.canvas.width = width
    ctx.clearRect(0, 0, width, HEIGHT)

    const barWidth = Math.ceil(width / frequencyArray.length)
    const padding = Math.floor((width - frequencyArray.length) / 2)

    let i
    for (i = 0; i < frequencyArray.length; i++) {
      const barHeightPercentage = frequencyArray[i]/255
      const yPos = barHeightPercentage * HEIGHT

      this.drawBar(ctx, i, yPos, barWidth, padding)
      i = i + Math.ceil(barWidth)
    }
  }

  render() {
    return (
      <CanvasContainer height={HEIGHT}>
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

export default connect(mapStateToProps, null)(Visualizer)

const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  min-height: ${({ height }) => `${height}px;`}
`
