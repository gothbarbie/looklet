import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

let component
let groupBy
let sortData
let props

describe('components/App', () => {
  beforeEach(() => {
    sortData = jest.fn()
    groupBy = jest.fn()

    props = {
      sortData,
      groupBy,
    }
    
    component = shallow(<App {...props} state={{
      data: [{}],
      order: '',
    }} />)
  
  })

  it('renders App', () => {
    expect(component).toMatchSnapshot()
  })

})
