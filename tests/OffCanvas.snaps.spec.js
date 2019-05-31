import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import OffCanvas from '../src/index'

// Mock ReactDOM.createPortal
ReactDOM.createPortal = jest.fn((element, node) => element)

describe('OffCanvas', () => {
  it('renders correctly when open', () => {
    const tree = renderer.create(<OffCanvas isOpen={true} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when closed', () => {
    const tree = renderer.create(<OffCanvas />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
