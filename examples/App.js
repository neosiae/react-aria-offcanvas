import React, { Component, Fragment } from 'react';
import OffCanvas from 'react-off-canvas';

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
);

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '2.5rem',
  },
  subtitle: {
    fontSize: '1.5rem',
  },
};

export default class App extends Component {
  state = {
    isOpen: false,
  };

  open = () => {
    this.setState({ isOpen: true });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <Fragment>
        <div style={styles.container}>
          <h1>react-off-canvas</h1>
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
            Click here
          </button>
        </div>
        <OffCanvas
          isOpen={this.state.isOpen}
          onClose={this.close}
          labelledby="menu-button"
        >
          <button onClick={this.close}>Close</button>
          <Navigation />
        </OffCanvas>
      </Fragment>
    );
  }
}
