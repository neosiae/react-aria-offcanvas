const setPosition = position => {
  let obj = {};
  obj[position] = '0';
  return obj;
};

const setTransformValue = position => {
  if (position === 'left') {
    return `translateX(-100%)`;
  } else if (position === 'right') {
    return `translateX(100%)`;
  } else if (position === 'top') {
    return `translateY(-100%)`;
  } else {
    return `translateY(100%)`;
  }
};

const createStyles = (
  defaultStyles,
  extraStyles,
  isOpen,
  width,
  height,
  position,
  customStyles,
) => {
  // Get the vertical or horizontal position of an element so we can use it in
  // inline styles.
  const positionProperty = setPosition(position);
  return {
    overlay: {
      ...defaultStyles.overlay,
      width: isOpen ? '100%' : '',
      ...extraStyles.overlay,
      ...customStyles.overlay,
    },
    content: {
      ...defaultStyles.content,
      ...extraStyles.content,
      width: width,
      height: height,
      ...positionProperty,
      MozTransform: isOpen ? '' : setTransformValue(position),
      MsTransform: isOpen ? '' : setTransformValue(position),
      OTransform: isOpen ? '' : setTransformValue(position),
      WebkitTransform: isOpen ? '' : setTransformValue(position),
      transform: isOpen ? '' : setTransformValue(position),
      ...customStyles.content,
      // !important
      visibility: isOpen ? 'visible' : 'hidden',
      // Off-Canvas element should be able to receive focus immediately
      // https://allyjs.io/tutorials/focusing-in-animated-ui.html#remedy-2-caveat
      transitionProperty: isOpen ? 'transform' : '',
    },
  };
};

export default createStyles;
