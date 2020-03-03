import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCanvas } from '../store/actions/visualizeAudio'
import styled from 'styled-components'

const CanvasContainer = styled.div`
  display: flex;
  justify-content: center;
`

class Visualizer extends Component {
  constructor(props){
    super(props)
    this.canvas = React.createRef()
    this.tick = this.tick.bind(this)

    this.props.setCanvas(this.canvas)
  }

  tick = () => {
    const { frequencyArray } = this.props

    this.renderAnimation(this.canvas)
    this.analyser.getByteTimeDomainData(frequencyArray);
    this.rafId = requestAnimationFrame(this.tick);
  }

  drawBar(ctx, startX, startY, endX, endY, color) {
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(50, 0)
    ctx.lineTo(400, 50)
    ctx.stroke()
  }

  renderAnimation(canvas) {
    canvas.width = 800
    canvas.height = 400

    let ctx = canvas.getContext('2d')
    this.drawBar(ctx)
  }

  render() {
    return (
      <CanvasContainer>
        <canvas ref={this.canvas} height='400' width='800' />
      </CanvasContainer>
    )
  }
}

const mapStateToProps = ({ audioContext }) => ({
  frequencyArray: audioContext.frequencyArray
})

const mapDispatchToProps = {
  setCanvas,
}

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer)