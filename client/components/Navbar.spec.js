/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Navbar from './navbar'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Navbar', () => {
  let navbar
  let isLoggedIn = true

  beforeEach(() => {
    navbar = shallow(<Navbar props={isLoggedIn} />)
  })

  it('renders the Home link when someone is logged in', () => {
    expect(navbar.find('Link').text()).to.be.equal('Home')
  })
})
