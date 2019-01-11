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

  describe('action creators', () => {
    describe('addToCart', () => {
      it('returns properly formatted action', () => {
        expect(addToCart(id)).to.be.deep.equal({
          type: 'ADD_TO_CART',
          id
        })
      })
    })
  })

  //   describe('thunk creators', () => {
  //     let store
  //     let mockAxios
  //     beforeEach(() => {
  //       mockAxios = new MockAdapter(axios)
  //       store = mockStore(initialState)
  //     })

  //     afterEach(() => {
  //       mockAxios.restore()
  //       store.clearActions()
  //     })
  //     describe('pushToCart', () => {
  //       it('eventually dispatches the ADD TO CART action', async () => {
  //         mockAxios.onGet('/api/wines/1').replyOnce(200, id)
  //         await store.dispatch(pushToCart(1))
  //         const actions = store.getActions()
  //         expect(actions[0].type).to.equal('ADD_TO_CART')
  //         expect(actions[0].payload).to.deep.equal(id)
  //       })
  //     })
  //   })
})
