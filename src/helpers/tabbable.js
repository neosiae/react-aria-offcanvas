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
