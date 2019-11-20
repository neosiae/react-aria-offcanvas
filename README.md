# react-aria-offcanvas

![npm](https://img.shields.io/npm/v/react-aria-offcanvas.svg?style=flat-square) ![Travis (.org) branch](https://img.shields.io/travis/neosiae/react-aria-offcanvas/master?style=flat-square) ![npm](https://img.shields.io/npm/dw/react-aria-offcanvas.svg?style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/min/react-aria-offcanvas.svg?style=flat-square) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Accessible Off-Canvas component for React.js

## Demo

https://neosiae.github.io/react-aria-offcanvas/

## Installation

Install `react-aria-offcanvas` using npm:

> npm install --save react-aria-offcanvas

Or via yarn:

> yarn add react-aria-offcanvas

## Usage

```javascript
import React, { Component, Fragment } from 'react'
import OffCanvas from 'react-aria-offcanvas'

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
    )
  }
}
```

## Props

The only required property for the component is `isOpen`, which controls whether the component is displayed or not.

| Prop                       | Type     | Default                        | Description                                                                                                                        |
| -------------------------- | -------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `isOpen`                   | `bool`   | `false`                        | Open or close OffCanvas.                                                                                                           |
| `width`                    | `string` | `300px`                        | The width of OffCanvas.                                                                                                            |
| `height`                   | `string` | `300px`                        | The height of OffCanvas.                                                                                                           |
| `position`                 | `string` | `left`                         | Position OffCanvas to the `left`, `right`, `top` or `bottom`.                                                                      |
| `mainContainerSelector`    | `string` |                                | Allow `OffCanvas` to push your page. Pass a valid CSS selector of an element that should be pushed.                                |
| `onClose`                  | `func`   |                                | Callback fired when the overlay is clicked or esc key is pressed.                                                                  |
| `closeOnEsc`               | `bool`   | `true`                         | Close OffCanvas on esc key.                                                                                                        |
| `closeOnOverlayClick`      | `bool`   | `true`                         | Close OffCanvas on overlay click.                                                                                                  |
| `lockBodyAfterOpen`        | `bool`   | `true`                         | Lock body overflow on menu open                                                                                               |
| `trapFocusAfterOpen`       | `bool`   | `true`                         | Trap focus when OffCanvas is open.                                                                                                 |
| `returnFocusAfterClose`    | `bool`   | `true`                         | Return focus to the element that had focus before opening OffCanvas.                                                               |
| `focusFirstChildAfterOpen` | `bool`   |                                | Set initial focus on the first focusable child inside OffCanvas.                                                                   |
| `focusThisChildAfterOpen`  | `string` |                                | Set initial focus on a specific child inside OffCanvas. Pass a valid CSS selector of an element that should receive initial focus. |
| `style`                    | `object` | `{ overlay: {}, content: {} }` | Inline styles object. It has two keys: `overlay` - overlay styles and `content` - OffCanvas styles.                                |
| `className`                | `string` |                                | Custom className for OffCanvas.                                                                                                    |
| `overlayClassName`         | `string` |                                | Custom className for the overlay.                                                                                                  |
| `role`                     | `string` |                                | Custom role for OffCanvas.                                                                                                         |
| `label`                    | `string` |                                | Custom aria-label for OffCanvas.                                                                                                   |
| `labelledby`               | `string` |                                | Custom aria-labelledby for OffCanvas.                                                                                              |

## License

MIT
