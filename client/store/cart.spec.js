import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {}

const store = mockStore(initialState)
import reducer from './index'
import {SELECT_WINE} from './index' // action types
import {addToCart, pushToCart} from './index' // action/thunk creators

describe('cart reducer', () => {
  const id = 15
  const quantity = 3

  describe('action creators', () => {
    describe('addToCart', () => {
      it('returns properly formatted action', () => {
        console.log(addToCart(id, quantity))
        expect(addToCart(id, quantity)).to.be.deep.equal({
          type: 'ADD_TO_CART',
          id,
          quantity: 3
        })
      })
    })
  })

  describe('thunk creators', () => {
    let store
    let mockAxios
    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.reset()
      store.clearActions()
    })

    // after(() => {
    //   mockAxios.restore()
    // })

    describe('pushToCart', () => {
      xit('eventually dispatches the ADD TO CART action', async () => {
        mockAxios.onPost('/api/cart/1', {quantity}).replyOnce(201)
        await store.dispatch(pushToCart(1, quantity))
        const actions = store.getActions()
        expect(actions[0].type).to.equal('ADD_TO_CART')
        expect(actions[0].id).to.equal(1)
        expect(actions[0].quantity).to.equal(quantity)
      })
    })
  })
})
