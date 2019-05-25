const tabbable = [
  'a[href]',
  'area[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  '[contenteditable]',
  '[tabindex]:not([tabindex="-1"])',
  'audio[controls]',
  'video[controls]',
]

const findTabbable = element => {
  if (element) {
    const tabbableElements = element.querySelectorAll(tabbable.join(','))
    return tabbableElements
  }
}

export const setTabbable = element => {
  if (element) {
    const tabbableElements = findTabbable(element)

    return {
      first: tabbableElements[0],
      last: tabbableElements[tabbableElements.length - 1],
    }
  }
}
