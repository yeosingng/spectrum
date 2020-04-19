import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'

// TODO possibly move to a config file
const HEIGHT = 512
const WIDTH = 1024

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

  drawBar(ctx, xPos, yPos, width) {
    ctx.save()
    ctx.beginPath()

    const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT)
    gradient.addColorStop(0, 'red')
    gradient.addColorStop(1, 'green')

    ctx.fillStyle = gradient
    ctx.fillRect(xPos, HEIGHT - yPos, width, yPos)
    ctx.stroke()
  }

  renderAnimation(canvas) {
    const { frequencyArray } = this.props

    let ctx = canvas.getContext('2d')
    ctx.canvas.height = HEIGHT
    ctx.canvas.width = WIDTH
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    const barWidth = Math.ceil(WIDTH / frequencyArray.length)

    let i
    for (i = 0; i < frequencyArray.length; i++) {
      const barHeightPercentage = frequencyArray[i]/255
      const yPos = barHeightPercentage * HEIGHT

      this.drawBar(ctx, i, yPos, barWidth)
    }
  }

  render() {
    return (
      <CanvasContainer height={HEIGHT}>
        <BoxShadow>
          <canvas ref={this.canvas} style={{ borderBottom: '1px solid light-gray', }} />
        </BoxShadow>
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
  overflow-x: hidden;
  height: 550px;
`

const BoxShadow = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 7px 15px 31px -13px rgba(0,0,0,0.75);
  width: 1024px;
  height: 512px;
`
