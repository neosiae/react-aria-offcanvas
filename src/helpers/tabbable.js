const tabbable = [
  'input:not([disabled])',
  'select:not([disabled])',
  'a[href]',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'object',
  '[tabindex]',
];

export const findTabbable = element => {
  const tabbableElements = element.querySelectorAll(tabbable.join(','));
  return tabbableElements;
};

export const setTabbable = element => {
  const tabbable = findTabbable(element);

  return {
    first: tabbable[0],
    last: tabbable[tabbable.length - 1],
  };
};
