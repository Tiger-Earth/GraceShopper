import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_WINES = 'GET_WINES'

/**
 * ACTION CREATORS
 */
export const gotWines = wines => ({type: GET_WINES, wines})

/**
 * THUNK CREATORS
 */
export const getWines = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/wines')
    dispatch(gotWines(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_WINES:
      return action.wines
    default:
      return state
  }
}
