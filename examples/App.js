import React, { Component, Fragment } from 'react'
import OffCanvas from '../src/index'

const Navigation = () => (
  <nav id="menu">
    <ul>
      <li>
        <a href="#m-i-1">Menu Item 1</a>
      </li>
      <li>
        <a href="#m-i-2">Menu Item 2</a>
      </li>
      <li>
        <a href="#m-i-3">Menu Item 3</a>
      </li>
      <li>
        <a href="#m-i-4">Menu Item 4</a>
      </li>
      <li>
        <a href="#m-i-5">Menu Item 5</a>
      </li>
    </ul>
  </nav>
)

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '2.5rem',
  },
  subtitle: {
    fontSize: '1.5rem',
  },
  github: {
    marginTop: '2.5rem',
  },
}

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
    return (
      <Fragment>
        <div id="main" style={styles.container}>
          <h1>react-aria-offcanvas</h1>
          <p style={styles.subtitle}>
            Accessible Off-Canvas component for React.js
          </p>
          <button
            id="menu-button"
            aria-label="Menu"
            aria-controls="menu"
            aria-expanded={this.state.isOpen}
            onClick={this.open}
          >
            Open
          </button>
          <p style={styles.github}>
            <a
              target="_blank"
              href="https://github.com/neosiae/react-aria-offcanvas"
            >
              View source on GitHub
            </a>
          </p>
        </div>
        <OffCanvas
          isOpen={this.state.isOpen}
          height="100%"
          mainContainerSelector="#main"
          onClose={this.close}
          labelledby="menu-button"
        >
          <button onClick={this.close}>Close</button>
          <Navigation />
        </OffCanvas>
      </Fragment>
    )
  }
}
