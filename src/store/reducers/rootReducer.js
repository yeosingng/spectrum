import { combineReducers } from 'redux'
import audioContext from './audioContext'
import visualizer from './visualizer'

export default combineReducers({
  audioContext,
  visualizer,
})
