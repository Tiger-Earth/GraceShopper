import axios from 'axios'
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

// TK

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
