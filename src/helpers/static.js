export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const canUseRoot = (root) => !!root
