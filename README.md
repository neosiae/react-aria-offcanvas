# react-aria-offcanvas
[![Build Status](https://travis-ci.com/neosiae/react-aria-offcanvas.svg?branch=master)](https://travis-ci.com/neosiae/react-aria-offcanvas) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Accessible Off-Canvas component for React.js

## Demo

https://neosiae.github.io/react-aria-offcanvas

## Installation

Install `react-aria-offcanvas` using npm:

> npm install --save react-aria-offcanvas

Or via yarn:

> yarn add react-aria-offcanvas

## Usage

```javascript
import React, { Component, Fragment } from 'react';
import OffCanvas from 'react-aria-offcanvas';

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
        <button
          id="menu-button"
          aria-label="Menu"
          aria-controls="menu"
          aria-expanded={this.state.isOpen}
          onClick={this.open}
        >
          Click here
        </button>
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
```

## Props 

The only required property for the component is `isOpen`, which controls whether the component is displayed or not.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `isOpen` | `bool` | `false` | Open or close OffCanvas. |
| `width` | `string` | `300px` | The width of OffCanvas. | 
| `height` | `string` | `300px` | The height of OffCanvas. |
| `position` | `string` | `left` | Position OffCanvas to the `left`, `right`, `top` or `bottom`. |
| `onClose` | `func` | | Callback fired when the overlay is clicked or esc key is pressed. |
| `closeOnEsc` | `bool` | `true` | Close OffCanvas on esc key. |
| `closeOnOverlayClick` | `bool` | `true` | Close OffCanvas on overlay click. | 
| `trapFocusAfterOpen` | `bool` | `true` | Trap focus when OffCanvas is open. |
| `returnFocusAfterClose` | `bool` | `true` | Return focus to the element that had focus before opening OffCanvas. |
| `focusFirstChildAfterOpen` | `bool` | | Set initial focus on the first focusable child inside OffCanvas. |
| `focusThisChildAfterOpen` | `string` | | Set initial focus on a specific child inside OffCanvas. The `string` must be a valid CSS selector, because it is passed to `document.querySelector()`.
| `style` | `object` | `{ overlay: {}, content: {} }` | Inline styles object. It has two keys: `overlay` - overlay styles and `content` - OffCanvas styles. |
| `className` | `string` | | Custom className for OffCanvas. |
| `overlayClassName` | `string` | | Custom className for the overlay. | 
| `role` | `string` | | Custom role for OffCanvas. |
| `label` | `string` | | Custom aria-label for OffCanvas. |
| `labelledby` | `string` | | Custom aria-labelledby for OffCanvas. |
