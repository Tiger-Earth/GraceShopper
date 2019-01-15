const SET_INFO = 'SET_INFO'

export const setInfo = infoObj => {
  return {
    type: SET_INFO,
    infoObj
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    // add to cart NOT logged in
    case SET_INFO: {
      return action.infoObj
    }
    default:
      return state
  }
}
