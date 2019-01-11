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
import {gotWines, getWines} from './index' // action/thunk creators

describe('allWines reducer', () => {
  const wines = [
    {
      name: 'Alessandro Viola - Sinfonia Di Grillo 2016',
      price: 38,
      color: 'red',
      imageURL:
        'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/alessandro-viola-sinfonia-di-grillo_1.jpg&w=155&h=184'
    },
    {
      name: 'Hurr Hurr',
      price: 38,
      color: 'white',
      imageURL:
        'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/alessandro-viola-sinfonia-di-grillo_1.jpg&w=155&h=184'
    }
  ]

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
    describe('getWines', () => {
      xit('(needs fix) eventually dispatched the GET WINE action', async () => {
        mockAxios.onGet('/api/wines').replyOnce(200, wines)
        await store.dispatch(gotWines)
        const actions = store.getActions()
        expect(actions[0].type).to.equal('GET_WINES')
        expect(actions[0].payload).to.deep.equal(wines)
      })
    })
  })
})
