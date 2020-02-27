export const loadAudio = (audio, context) => ({
  type: 'LOAD_AUDIO', payload: { audio, context }
})

export const playAudio = () => ({
  type: 'PLAY_AUDIO',
})

export const pauseAudio = () => ({
  type: 'PAUSE_AUDIO',
})