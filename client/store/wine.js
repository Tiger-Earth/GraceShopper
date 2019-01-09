import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SELECT_WINE = 'SELECT_WINE'

/**
 * INITIAL STATE
 */
const defaultWine = {}

/**
 * ACTION CREATORS
 */
const selectWine = wine => ({
  type: SELECT_WINE,
  payload: wine
})

/**
 * THUNK CREATORS
 */
export const fetchWine = wineId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/wines/${wineId}`)
    dispatch(selectWine(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultWine, action) {
  switch (action.type) {
    case SELECT_WINE:
      return action.payload
    default:
      return state
  }
}
