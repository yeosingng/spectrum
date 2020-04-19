import addEffect from '../helpers/addEffect'

export const defaultState = {
  audioPlaying: false,
  context: null,
  source: null,
  analyser: null,
  audio: null,
  frequencyArray: null,
  lastNode: null,
}

export const audioContext = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_AUDIO':
      const { audio, context } = action.payload

      if (state.audio) {
        state.audio.pause()
      }

      const source = context.createMediaElementSource(audio)
      const analyser = context.createAnalyser()
      analyser.smoothingTimeConstant = 1

      source.connect(analyser)
      analyser.connect(context.destination)

      const frequencyArray = new Uint8Array(analyser.frequencyBinCount)

      return {
        ...state,
        audio,
        context,
        source,
        analyser,
        frequencyArray,
        lastNode: analyser,
      }

    case 'PLAY_AUDIO':
      if (state.audio) {
        state.audio.play()
        state.context.resume()

        return {
          ...state,
          audioPlaying: true,
        }
      }
      return {
        ...state,
      }

    case 'PAUSE_AUDIO':
      if (state.audio) {
        state.audio.pause()
        return {
          ...state,
          audioPlaying: false,
        }
      }

      return {
        ...state,
      }

    case 'ADD_EFFECT':
      const newLastNode = addEffect(state.lastNode, action.payload)
      // newLastNode.connect(context.destination)

      return {
        ...state,
        lastNode: newLastNode,
      }

    default:
      return state
  }
 }

