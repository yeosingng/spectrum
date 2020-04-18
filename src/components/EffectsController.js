import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { addEffect } from '../store/actions/audioEffects'

class EffectsController extends Component {
  render() {
    const { addEffect } = this.props

    const EffectControls = () => {
      return <div>Controls here</div>
    }

    return (
      <EffectsContainer>
        <EffectSelector>
          Effects:
          {effects.map(effect => (
            <EffectsButton onClick={() => addEffect(effect)}>
              {effect}
            </EffectsButton>
          ))}
        </EffectSelector>

        <EffectControls />
      </EffectsContainer>
    )
  }
}

const mapDispatchToProps = {
  addEffect,
}

export default connect(null, mapDispatchToProps)(EffectsController)

const EffectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  color: white;
`

const EffectSelector = styled.div`
  display: flex;
`

const EffectsButton = styled.button`
  margin-left: 15px;
`

const effects = [
  'Pan',
  'Reverb',
  'Low Pass Filter',
]
