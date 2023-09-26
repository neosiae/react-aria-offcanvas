/**
 * @jest-environment jsdom
 */


import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { getOverlay, getContent } from './helpers/tests'
import OffCanvas from '../src/index'
import App from './helpers/components'

describe('OffCanvas', () => {
  afterEach(cleanup)

  describe('container', () => {
    it('removes extra styles when a custom className is passed', () => {
      const { getByTestId, getByText } = render(
        <App
          mainContainerSelector="#main"
          containerClassName="containerClassName"
        />,
      )
      const mainContainer = getByTestId('main')
      const button = getByText('Open')

      fireEvent.click(button)

      expect(mainContainer.style.transition).toBe('')
    })
  })

  describe('overlay', () => {
    it('supports inline styling', () => {
      const style = { overlay: { background: 'rgba(0, 0, 0, 0.5)' } }
      const overlay = getOverlay(<OffCanvas style={style} />)

      expect(overlay.style.background).toBe('rgba(0, 0, 0, 0.5)')
    })

    it('accepts a custom overlayClassName', () => {
      const overlay = getOverlay(
        <OffCanvas overlayClassName="customOverlayClassName" />,
      )

      expect(overlay.classList.contains('customOverlayClassName')).toBe(true)
    })

    it('removes extra styles when a custom overlayClassName is passed', () => {
      const overlay = getOverlay(
        <OffCanvas overlayClassName="customOverlayClassName" />,
      )

      expect(overlay.style.background).toBe('')
    })
  })

  describe('content', () => {
    it('supports inline styling', () => {
      const style = { content: { width: '100%' } }
      const content = getContent(<OffCanvas style={style} />)

      expect(content.style.width).toBe('100%')
    })

    it('accepts a custom className', () => {
      const content = getContent(<OffCanvas className="customClassName" />)

      expect(content.classList.contains('customClassName')).toBe(true)
    })

    it('removes extra styles when a custom className is passed', () => {
      const content = getContent(<OffCanvas className="customClassName" />)

      expect(content.style.background).toBe('')
    })

    it('has important styles when closed', () => {
      const content = getContent(<OffCanvas />)

      expect(content.style.visibility).toBe('hidden')
      expect(content.style.transitionProperty).toBeUndefined
    })

    it('has important styles when open', () => {
      const content = getContent(<OffCanvas isOpen={true} />)

      expect(content.style.visibility).toBe('visible')
      expect(content.style.transitionProperty).toBe('transform')
    })

    it('visibility can not be overwritten', () => {
      const style = { content: { visibility: 'visible' } }
      const content = getContent(<OffCanvas style={style} />)

      expect(content.style.visibility).toBe('hidden')
    })

    it('transitionProperty can not be overwritten', () => {
      const style = { content: { transitionProperty: 'all' } }
      const content = getContent(<OffCanvas style={style} />)

      expect(content.style.transitionProperty).toBeUndefined
    })
  })
})
