import axios from 'axios'
import user from './user'
import history from '../history'

// Rhianna and McRae worked on this for 15000 hours with Jan

/**
 * INITIAL STATE
 */
const initialCart = {}

/**
 * ACTION TYPES
 */

// add to cart, NOT LOGGED IN
const ADD_TO_CART = 'ADD_TO_CART'

// TODO add to cart, LOGGING IN!

// const GET_CART = 'GET_CART'
// const CLEAR_CART = 'CLEAR_CART'

/**
 * ACTION CREATORS
 */
export const addToCart = (id, quantity) => {
  return {
    type: ADD_TO_CART,
    id,
    quantity
  }
}

/**
 * THUNK CREATORS
 */
export const pushToCart = wineId => async dispatch => {
  try {
    if (user) {
      const test = await axios.post(`/api/cart/${wineId}`)
      console.log('TEST', test.data.wines)
    }
    dispatch(addToCart(wineId))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialCart, action) {
  switch (action.type) {
    // add to cart NOT logged in
    case ADD_TO_CART: {
      const id = action.id
      const quantity = action.quantity
      const copy = {...state}
      if (copy[id]) {
        copy[id] += quantity
      } else {
        copy[id] = quantity
      }
      return copy
    }
    default:
      return state
  }
}
