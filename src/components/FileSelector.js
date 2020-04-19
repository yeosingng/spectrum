import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadAudio } from '../store/actions/controlAudio'
import styled from 'styled-components'

class FileSelector extends Component {
  constructor() {
    super()
    this.handleSelection = this.handleSelection.bind(this)
  }

  handleSelection(e) {
    const file = e?.target?.files?.[0]

    if (file) {
      const { loadAudio } = this.props
      const audioUrl = URL.createObjectURL(file)
      const audioFile = new Audio(audioUrl)
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      loadAudio(audioFile, audioContext)
    }
  }

  render() {
    return (
      <FileSelectorContainer>
        <input type='file' accept='audio/*' onChange={e => this.handleSelection(e)} />
      </FileSelectorContainer>
    )
  }
}

const mapDispatchToProps = {
  loadAudio
}

export default connect(null, mapDispatchToProps)(FileSelector)

const FileSelectorContainer = styled.div`
  margin: 40px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`
