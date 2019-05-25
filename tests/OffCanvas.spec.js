import React from 'react'
import OffCanvas from '../src/index'
import {
  render,
  renderIntoDocument,
  fireEvent,
  cleanup,
} from 'react-testing-library'
import { getContent, extractNumber } from './helpers/tests'
import App from './helpers/components'

describe('OffCanvas', () => {
  afterEach(cleanup)

  it('focuses the OffCanvas content when open', () => {
    const content = getContent(<OffCanvas isOpen={true} />)

    expect(document.activeElement).toBe(content)
  })

  it('focuses the first child when open if focusFirstChildAfterOpen is true', () => {
    const Buttons = () => (
      <div>
        <button>First</button>
        <button>Second</button>
      </div>
    )

    const { getByText } = render(
      <OffCanvas isOpen={true} focusFirstChildAfterOpen={true}>
        <Buttons />
      </OffCanvas>,
    )

    const first = getByText('First')

    expect(document.activeElement).toBe(first)
  })

  it('focuses a specific child when open if focusThisChildAfterOpen is defined', () => {
    const Buttons = () => (
      <div>
        <button>First</button>
        <button id="second">Second</button>
      </div>
    )

    const { getByText } = renderIntoDocument(
      <OffCanvas isOpen={true} focusThisChildAfterOpen="#second">
        <Buttons />
      </OffCanvas>,
    )

    const second = getByText('Second')

    expect(document.activeElement).toBe(second)
  })

  it('accepts a custom width', () => {
    const content = getContent(<OffCanvas width={'50%'} />)

    expect(content.style.width).toBe('50%')
  })

  describe('position', () => {
    it('opens from the left by default', () => {
      const content = getContent(<OffCanvas />)
      const value = extractNumber(content.style.transform)

      expect(value).toBeLessThan(0)
    })

    it('opens from the right if set to right', () => {
      const content = getContent(<OffCanvas position="right" />)
      const value = extractNumber(content.style.transform)

      expect(value).toBeGreaterThan(0)
    })

    it('opens from the top if set to top', () => {
      const content = getContent(<OffCanvas position="top" />)
      const value = extractNumber(content.style.transform)

      expect(value).toBeLessThan(0)
    })

    it('opens from the bottom if set to bottom', () => {
      const content = getContent(<OffCanvas position="bottom" />)
      const value = extractNumber(content.style.transform)

      expect(value).toBeGreaterThan(0)
    })
  })

  it('pushes the main container if mainContainerSelector is defined', () => {
    const { getByText, getByTestId } = renderIntoDocument(
      <App mainContainerSelector="#main" />,
    )
    const button = getByText('Open')
    const mainContainer = getByTestId('main')

    fireEvent.click(button)

    expect(mainContainer.style.transform).toBe('translateX(300px)')
  })

  it('accepts a custom role', () => {
    const content = getContent(<OffCanvas role="dialog" />)

    expect(content.getAttribute('role')).toBe('dialog')
  })

  it('accepts a custom aria-label', () => {
    const content = getContent(<OffCanvas label="OffCanvas" />)

    expect(content.getAttribute('aria-label')).toBe('OffCanvas')
  })

  it('accepts a custom aria-labelledby', () => {
    const content = getContent(<OffCanvas labelledby="button" />)

    expect(content.getAttribute('aria-labelledby')).toBe('button')
  })

  it('sets aria-hidden to false when open', () => {
    const content = getContent(<OffCanvas isOpen={true} />)

    expect(content.getAttribute('aria-hidden')).toBe('false')
  })

  it('sets aria-hidden to true when closed', () => {
    const content = getContent(<OffCanvas />)

    expect(content.getAttribute('aria-hidden')).toBe('true')
  })
})
