/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CartIcon from './CartIcon'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('CartIcon with items', () => {
  const props = {cart: {1: 21}}

  const renderedMiniCart = shallow(<CartIcon props={props} />)

  it('renders the badge with cart quantity', () => {
    expect(renderedMiniCart.find('span').text()).to.be.equal('21')
  })
})

// describe('CartIcon with empty cart', () => {
//   const cart = {}

//   const renderedCart = shallow(<CartIcon cart={cart} />)

//   it('does not render if there is no quantity', () => {
//     expect(renderedCart.contains(<span />)).to.be.equal(false)
//   })
// })
