export const defaultState = {
  rafId: null,
  canvas: null,
  renderAnimation: true,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CANVAS':
      return {
        canvas: action.payload
      }

    default:
      return state
  }
 }
