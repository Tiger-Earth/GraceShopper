/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CartIcon from './CartIcon'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('CartIcon - displays cart total', () => {
  const cart = {}

  const renderedCart = shallow(<CartIcon cart={cart} />)

  it('does not render if there is no quantity', () => {
    expect(renderedCart.contains(<span />)).to.be.equal(false)
  })
})
