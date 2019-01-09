/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import WinesIcon from './winesIcon'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('winesIcon', () => {
  let winesIcon
  let testWine = {id: 2, name: 'Sauvignon blanc', price: 50, color: 'red'}

  beforeEach(() => {
    winesIcon = shallow(<WinesIcon wine={testWine} />)
  })

  it('renders the wine name in an h2', () => {
    expect(winesIcon.find('h2').text()).to.be.equal('Sauvignon blanc')
  })
})
