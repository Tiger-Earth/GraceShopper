import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_WINE = 'GET_WINE'

/**
 * INITIAL STATE
 */
const selectedWine = {}

/**
 * ACTION CREATORS
 */
export const getWine = wine => ({
  type: GET_WINE,
  payload: wine
})

/**
 * THUNK CREATORS
 */
export const fetchWine = wineId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/wines/${wineId}`)
    dispatch(getWine(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = selectedWine, action) {
  switch (action.type) {
    case GET_WINE:
      return action.payload
    default:
      return state
  }
}
