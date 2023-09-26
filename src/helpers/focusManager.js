import { setTabbable } from './tabbable'

let lastFocusedElement = undefined

export const focusLater = () => {
  lastFocusedElement = document.activeElement
}

export const returnFocus = () => {
  if (lastFocusedElement) {
    lastFocusedElement.focus()
    lastFocusedElement = null
  }
}

export const focusFirstChild = (element) => {
  const tabbable = setTabbable(element)
  tabbable.first.focus()
}

export const focusChild = (parent, selector) => {
  const child = document.querySelector(selector)

  if (!parent.contains(child)) {
    console.error(`${selector} is not a child of the specified parent.`) // eslint-disable-line
    return
  }

  child.focus()
}
