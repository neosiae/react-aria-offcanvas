import React, { Component, Fragment } from 'react'
import OffCanvas from '../../src/index'

/* eslint react/prop-types: 0 */
export default class App extends Component {
  state = {
    isOpen: false,
  }

  open = () => {
    this.setState({ isOpen: true })
  }

  close = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const {
      isOpen,
      mainContainerSelector,
      returnFocusAfterClose,
      style,
      containerClassName,
    } = this.props

    return (
      <Fragment>
        <div data-testid="main" id="main" className={containerClassName}>
          <button onClick={this.open}>Open</button>
        </div>
        <OffCanvas
          isOpen={isOpen ? isOpen : this.state.isOpen}
          mainContainerSelector={mainContainerSelector}
          onClose={this.close}
          returnFocusAfterClose={returnFocusAfterClose}
          style={style}
        >
          <h1>Testing</h1>
        </OffCanvas>
      </Fragment>
    )
  }
}
