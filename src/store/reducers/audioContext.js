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

      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;

      source.connect(analyser)
      analyser.connect(context.destination)

      analyser.smoothingTimeConstant = 1

      const frequencyArray = new Uint8Array(analyser.frequencyBinCount)


      console.log(context)
      // const frequencyArray  = new Float32Array(analyser.frequencyBinCount)

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
