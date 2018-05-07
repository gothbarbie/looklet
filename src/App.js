import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 600px;
  padding: 2%;
  margin: 0 auto;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  font-size: 0.75rem;

  & span {
    width: 100px;
    font-weight: bold;
  }
`

const Button = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  margin: 0 1%;
  cursor: pointer;
`

class App extends Component<State> {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      order: '',
    }
  }

  componentWillMount () {
    this.setState({
      data: [
        { timestamp: 1505278252166, product: 'Apple', customer: 'John Smith' },
        { timestamp: 1505278252166, product: 'Apple', customer: 'Jane Doe' },
        { timestamp: 1505278282166, product: 'Pear', customer: 'Will Smith' },
        { timestamp: 1505278282166, product: 'Pear', customer: 'Some Smith' },
        { timestamp: 1505278282166, product: 'Potato', customer: 'Anne Smith' },
        { timestamp: 1505298282166, product: 'Potato', customer: 'Lisa Smith' },
        { timestamp: 1505298282166, product: 'Carrot', customer: 'Eric Smith' },
      ],
      order: 'unsorted',
    })
  }

  groupBy (collection, orderBy) {
    if (orderBy === 'unsorted') return collection

    // Make an array of all groups so they can be sorted

    const groupNames = []

    collection.forEach(item => {
      const exists = groupNames.includes(item[orderBy])
      if (!exists) {
        groupNames.push(item[orderBy])
      }
    })

    groupNames.sort()

    // Rebuild data as an Object

    const groups = {}

    collection.forEach(item => {
      groupNames.forEach(propName => {
        if (!groups.hasOwnProperty(propName)) {
          groups[propName] = []
        }
        if (item[orderBy] === propName) {
          groups[propName].push(item)
        }
      })
    })

    return groups
  }

  sortData () {
    const { data, order } = this.state
    return this.groupBy(data, order)
  }

  renderJSON () {
    return (
      <div>
        <pre>{JSON.stringify(this.sortData(), null, 2)}</pre>
      </div>
    )
  }

  render () {
    return (
      <Wrapper>
        <Nav>
          <span>Group by:</span>
          <Button className="product" onClick={() => this.setState({ order: 'product' })}>
            Product
          </Button>
          <Button className="timestamp" onClick={() => this.setState({ order: 'timestamp' })}>
            Timestamp
          </Button>
          <Button className="customer" onClick={() => this.setState({ order: 'customer' })}>
            Customer
          </Button>
        </Nav>
        {this.renderJSON()}
      </Wrapper>
    )
  }
}

export default App
