/**
 * ACTION TYPES
 */
const SET_FILTERS = 'SET_FILTERS'

/**
 * ACTION CREATORS
 */
export const setFilters = filters => ({type: SET_FILTERS, filters})

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_FILTERS:
      return action.filters
    default:
      return state
  }
}
