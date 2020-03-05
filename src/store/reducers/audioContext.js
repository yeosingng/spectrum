export const defaultState = {
  audioPlaying: false,
  context: null,
  source: null,
  analyser: null,
  audio: null,
  frequencyArray: null,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_AUDIO':
      const { audio, context } = action.payload

      const source = context.createMediaElementSource(audio)
      const analyser = context.createAnalyser()

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
      }

    case 'PLAY_AUDIO':
      state.audio.play()
      state.context.resume()
      return {
        ...state,
        audioPlaying: true,
      }

    case 'PAUSE_AUDIO':
      state.audio.pause()
      return {
        ...state,
        audioPlaying: false,
      }

    default:
      return state
  }
 }