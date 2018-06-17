const tabbable = [
  'input:not([disabled])',
  'select:not([disabled])',
  'a[href]',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'object',
  '[tabindex]',
];

const findTabbable = element => {
  if (element) {
    const tabbableElements = element.querySelectorAll(tabbable.join(','));
    return tabbableElements;
  }
};

export const setTabbable = element => {
  if (element) {
    const tabbableElements = findTabbable(element);

    return {
      first: tabbableElements[0],
      last: tabbableElements[tabbableElements.length - 1],
    };
  }
};
