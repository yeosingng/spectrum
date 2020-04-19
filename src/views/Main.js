import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import FadeIn from 'react-fade-in'
import MusicController from '../components/MusicController'
import Visualizer from '../components/Visualizer'
import EffectsController from '../components/EffectsController'
import FileSelector from '../components/FileSelector'

class Main extends Component {
  render() {
    return(
      <MainContainer>
        <FadeIn>
          <FileSelector />
          <Visualizer />
          <MusicController />
          {/* <EffectsController /> */}
        </FadeIn>
      </MainContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  something: state
})

export default connect(mapStateToProps, null)(Main)

const MainContainer = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  margin: auto;
  width: calc(max(calc(100vw - 200px), 320px));
`
