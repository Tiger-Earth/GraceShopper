import axios from 'axios'
//import user from './user'

// Rhianna and McRae worked on this for 15000 hours with Jan

/**
 * INITIAL STATE
 */

// retrieve initial state from localStorage or supply empty object if nothing stored in localStorage

const initialCart = localStorage.getItem('reduxCart')
  ? JSON.parse(localStorage.getItem('reduxCart'))
  : {}

// const initialCart = {}

/**
 * ACTION TYPES
 */

// add to cart, NOT LOGGED IN
const ADD_TO_CART = 'ADD_TO_CART'

const GET_CART = 'GET_CART'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const UPDATE_CART = 'UPDATE_CART'

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

export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const deletedFromCart = id => {
  return {
    type: DELETE_CART_ITEM,
    id
  }
}

export const updatedCart = (id, quantity) => {
  return {
    type: UPDATE_CART,
    id,
    quantity
  }
}

/**
 * THUNK CREATORS
 */
export const pushToCart = (wineId, quantity) => async (dispatch, getState) => {
  const user = getState().user
  try {
    if (Object.keys(user).length) {
      await axios.post(`/api/cart/${wineId}`, {quantity})
    }
    dispatch(addToCart(wineId, quantity))
  } catch (err) {
    console.error(err)
  }
}

export const updateCart = (wineId, quantity) => async (dispatch, getState) => {
  const user = getState().user
  try {
    if (Object.keys(user).length) {
      await axios.put(`/api/cart/${wineId}`, {quantity})
    }
    dispatch(updatedCart(wineId, quantity))
  } catch (err) {
    console.error(err)
  }
}

export const fetchCart = () => async (dispatch, getState) => {
  const user = getState().user
  try {
    if (Object.keys(user).length) {
      const {data} = await axios.get(`/api/cart`)
      dispatch(getCart(data))
    }
  } catch (err) {
    console.error(err)
  }
}

export const deleteFromCart = id => async (dispatch, getState) => {
  const user = getState().user
  try {
    if (Object.keys(user).length) {
      await axios.delete(`/api/cart/${id}`)
    }
    dispatch(deletedFromCart(id))
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
    case GET_CART: {
      return action.cart
    }
    case ADD_TO_CART: {
      const id = action.id
      const quantity = +action.quantity
      const copy = {...state}
      if (copy[id]) {
        copy[id] += quantity
      } else {
        copy[id] = quantity
      }
      return copy
    }
    case UPDATE_CART: {
      const copy = {...state}
      copy[action.id] = action.quantity
      return copy
    }
    case DELETE_CART_ITEM: {
      const copy = {...state}
      delete copy[action.id]
      return copy
    }
    default:
      return state
  }
}
