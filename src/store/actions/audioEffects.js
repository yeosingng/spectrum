export const addEffect = (effect) => ({
  type: 'ADD_EFFECT', payload: { effect }
})

export const removeEffect = (effect) => ({
  type: 'REMOVE_EFFECT', payload: { effect }
})
