import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import MusicController from './MusicController'
import Visualizer from './Visualizer'

const MainContainer = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  flex-direction: column;
`

class Main extends Component {
  render() {
    return(
      <MainContainer>
        <Visualizer />
        <MusicController />
      </MainContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  something: state
})

export default connect(mapStateToProps, null)(Main)