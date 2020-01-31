// Sets the vertical or horizontal position of an element.
const setPosition = position => {
  let obj = {}
  obj[position] = '0'
  return obj
}

const setContentTransformValue = position => {
  if (position === 'left') {
    return `translateX(-100%)`
  } else if (position === 'right') {
    return `translateX(100%)`
  } else if (position === 'top') {
    return `translateY(-100%)`
  } else {
    return `translateY(100%)`
  }
}

const setPushTransformValue = (width, height, position) => {
  if (position === 'left') {
    return `translateX(${width})`
  } else if (position === 'right') {
    return `translateX(-${width})`
  } else if (position === 'top') {
    return `translateY(${height})`
  } else {
    return `translateY(-${height})`
  }
}

// Checks whether an element has a className.
export const hasClassName = element => element && element.classList.length > 0

export const shouldShowContent = (content, isOpen) => {
  if (content) {
    content.style.visibility = isOpen ? 'visible' : 'hidden'
  }
}

export const createStyles = (
  defaultStyles,
  extraStyles,
  isOpen,
  width,
  height,
  position,
  customStyles,
) => {
  const positionProperty = setPosition(position)

  return {
    overlay: {
      ...defaultStyles.overlay,
      ...extraStyles.overlay,
      width: isOpen ? '100%' : '',
      ...customStyles.overlay,
    },
    content: {
      ...defaultStyles.content,
      ...extraStyles.content,
      ...positionProperty,
      width: width,
      height: height,
      transform: isOpen ? '' : setContentTransformValue(position),
      ...customStyles.content,
      // !important
      // Off-Canvas element should be able to receive focus immediately.
      // https://allyjs.io/tutorials/focusing-in-animated-ui.html#remedy-2-caveat
      transitionProperty: isOpen ? 'transform' : '',
    },
  }
}

export const createPushStyles = (
  extraStyles,
  isOpen,
  width,
  height,
  position,
) => {
  const styles = {
    ...extraStyles,
    transform: isOpen ? setPushTransformValue(width, height, position) : '',
  }

  return function(element) {
    if (element) {
      // Apply the push styles
      for (const property of Object.keys(styles)) {
        element.style[property] = styles[property]
      }
    }
  }
}

export const applyInitialPushStyles = (element, width, height, position) => {
  if (element) {
    element.style.transform = setPushTransformValue(width, height, position)
  }
}

// Shows/hides the horizontal scrollbar.
export const shouldHideHorizontalScrollbar = isOpen => {
  const body = document.querySelector('body')
  body.style.overflowX = isOpen ? 'hidden' : ''
}

// should lock the body scroll when open
export const shouldLockBodyScroll = isOpen => {
  const body = document.querySelector('body')
  body.style.overflowY = isOpen ? 'hidden' : ''
}
