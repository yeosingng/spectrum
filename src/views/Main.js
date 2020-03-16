import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import FadeIn from 'react-fade-in'
import MusicController from '../components/MusicController'
import Visualizer from '../components/Visualizer'
import EffectsController from '../components/EffectsController'

const MainContainer = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  width: 1024px;
  flex-direction: column;
  margin: auto;
`

class Main extends Component {
  render() {
    return(
      <MainContainer>
        <FadeIn>
          <Visualizer />
          <MusicController />
          <EffectsController />
        </FadeIn>
      </MainContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  something: state
})

export default connect(mapStateToProps, null)(Main)