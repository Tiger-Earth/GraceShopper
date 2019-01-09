/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleWineContainer} from './SingleWineContainer'
import SingleWine from './SingleWine'
const adapter = new Adapter()
enzyme.configure({adapter})
const wine = {
  id: 1,
  name: 'Alessandro Viola - Sinfonia Di Grillo 2016',
  price: 38,
  color: 'red',
  imageURL:
    'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/alessandro-viola-sinfonia-di-grillo_1.jpg&w=155&h=184'
}

describe('SingleWine', () => {
  describe('<SingleWineContainer /> component', () => {})
  describe('<SingleWine /> component', () => {})
})
