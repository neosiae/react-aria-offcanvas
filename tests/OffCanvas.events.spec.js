import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import OffCanvas from '../src/index'
import App from './helpers/components'

describe('OffCanvas', () => {
  afterEach(cleanup)

  describe('returnFocusAfterClose', () => {
    it('returns focus to the last focused element by default', () => {
      const { getByText, getByTestId } = render(<App />)
      const button = getByText('Open')
      const content = getByTestId('content')

      button.focus()
      fireEvent.click(button)
      button.blur()
      fireEvent.keyDown(content, { key: 'ESC', keyCode: 27 })
      fireEvent.transitionEnd(content)

      expect(document.activeElement).toBe(button)
    })

    it('does not return focus to the last focused element if set to false', () => {
      const { getByText, getByTestId } = render(
        <App returnFocusAfterClose={false} />,
      )
      const button = getByText('Open')
      const content = getByTestId('content')

      button.focus()
      fireEvent.click(button)
      button.blur()
      fireEvent.keyDown(content, { key: 'ESC', keyCode: 27 })

      expect(document.activeElement).not.toBe(button)
    })
  })

  describe('trapFocusAfterOpen', () => {
    it('traps focus inside the OffCanvas content by default', () => {
      const Buttons = () => (
        <div>
          <button>First</button>
          <button>Second</button>
        </div>
      )

      const { getByText } = render(
        <OffCanvas isOpen={true}>
          <Buttons />
        </OffCanvas>,
      )

      const first = getByText('First')
      const second = getByText('Second')

      fireEvent.keyDown(second, { key: 'TAB', keyCode: 9 })

      expect(document.activeElement).toBe(first)
    })

    it('does not trap focus inside the OffCanvas content if set to false', () => {
      const Buttons = () => (
        <div>
          <button>First</button>
          <button>Second</button>
        </div>
      )

      const { getByText } = render(
        <OffCanvas isOpen={true} trapFocusAfterOpen={false}>
          <Buttons />
        </OffCanvas>,
      )

      const first = getByText('First')
      const second = getByText('Second')

      fireEvent.keyDown(second, { key: 'TAB', keyCode: 9 })

      expect(document.activeElement).not.toBe(first)
    })
  })

  describe('closeOnOverlayClick', () => {
    it('should close on overlay click by default', () => {
      const handleClose = jest.fn()
      const { getByTestId } = render(
        <OffCanvas isOpen={true} onClose={handleClose} />,
      )
      const overlay = getByTestId('overlay')

      fireEvent.click(overlay)

      expect(handleClose).toHaveBeenCalled()
    })

    it('should not close on overlay click if set to false', () => {
      const handleClose = jest.fn()
      const { getByTestId } = render(
        <OffCanvas
          isOpen={true}
          closeOnOverlayClick={false}
          onClose={handleClose}
        />,
      )
      const overlay = getByTestId('overlay')

      fireEvent.click(overlay)

      expect(handleClose).not.toHaveBeenCalled()
    })
  })

  describe('closeOnEsc', () => {
    it('should close on ESC key by default', () => {
      const handleClose = jest.fn()
      const { getByTestId } = render(
        <OffCanvas isOpen={true} onClose={handleClose} />,
      )
      const content = getByTestId('content')

      fireEvent.keyDown(content, { key: 'ESC', keyCode: 27 })

      expect(handleClose).toHaveBeenCalled()
    })

    it('should not close on ESC key if set to false', () => {
      const handleClose = jest.fn()
      const { getByTestId } = render(
        <OffCanvas isOpen={true} closeOnEsc={false} onClose={handleClose} />,
      )
      const content = getByTestId('content')

      fireEvent.keyDown(content, { key: 'ESC', keyCode: 27 })

      expect(handleClose).not.toHaveBeenCalled()
    })
  })
})
