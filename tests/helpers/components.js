import React, { Component, Fragment } from 'react';
import OffCanvas from 'react-off-canvas';

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
        <button onClick={this.open}>Open</button>
        <OffCanvas isOpen={this.state.isOpen} onClose={this.close}>
          <h1>Testing...</h1>
        </OffCanvas>
      </Fragment>
    );
  }
}
