/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {WinesList} from './winesList'
import WinesIcon from './winesIcon'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('winesList', () => {
  let winesList
  let testWines = [
    {id: 2, name: 'Sauvignon blanc', price: 50, color: 'red'},
    {id: 3, name: 'Pinot grigio', price: 20, color: 'white'}
  ]

  beforeEach(() => {
    winesList = shallow(<WinesList wines={testWines} />)
  })

  xit('contains a <WinesIcon/> component', function() {
    expect(winesList.find(WinesIcon)).to.have.length(2)
  })
})
