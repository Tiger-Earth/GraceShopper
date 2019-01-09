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
import {getWine, fetchWine} from './index' // action/thunk creators

describe('selectedWine reducer', () => {
  const wine = {
    name: 'Alessandro Viola - Sinfonia Di Grillo 2016',
    price: 38,
    color: 'red',
    imageURL:
      'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/alessandro-viola-sinfonia-di-grillo_1.jpg&w=155&h=184'
  }

  describe('action creators', () => {
    describe('getWine', () => {
      it('returns properly formatted action', () => {
        expect(getWine(wine)).to.be.deep.equal({
          type: 'GET_WINE',
          payload: wine
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
      mockAxios.restore()
      store.clearActions()
    })
    describe('fetchWine', () => {
      it('eventually dispatched the GET WINE action', async () => {
        mockAxios.onGet('/api/wines/1').replyOnce(200, wine)
        await store.dispatch(fetchWine(1))
        const actions = store.getActions()
        expect(actions[0].type).to.equal('GET_WINE')
        expect(actions[0].payload).to.deep.equal(wine)
      })
    })
  })
})
