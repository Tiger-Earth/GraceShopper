/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CartIcon from './CartIcon'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('CartIcon', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CartIcon cart="21" />)
  })

  it('renders the badge with cart quantity', () => {
    expect(wrapper.find('span').text()).to.be.equal('21')
  })
})
