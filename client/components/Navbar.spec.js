/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Navbar from './navbar'
import store from '../store'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Navbar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Navbar store={store} />).dive()
  })

  it('renders the site title', () => {
    expect(wrapper.find('h1').text()).to.be.equal('Tiger Shopper')
  })
})
