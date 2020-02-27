import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import MusicController from './MusicController'

const MainContainer = styled.div`
  height: calc(100vh - 100px);
`

class Main extends Component {
  render() {
    return(
      <MainContainer>
        <MusicController />
      </MainContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  something: state
})

export default connect(mapStateToProps, null)(Main)