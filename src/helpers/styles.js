const getPosition = position => {
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
  isOpen,
  width,
  height,
  position,
  customStyles,
) => {
  return {
    overlay: {
      ...defaultStyles.overlay,
      width: isOpen ? '100%' : '',
      ...customStyles.overlay,
    },
    content: {
      ...defaultStyles.content,
      width: width,
      height: height,
      left: position === 'left' ? '0' : 'auto',
      right: position === 'right' ? '0' : 'auto',
      top: position === 'top' ? '0' : 'auto',
      bottom: position === 'bottom' ? '0' : 'auto',
      MozTransform: isOpen ? '' : getPosition(position),
      MsTransform: isOpen ? '' : getPosition(position),
      OTransform: isOpen ? '' : getPosition(position),
      WebkitTransform: isOpen ? '' : getPosition(position),
      transform: isOpen ? '' : getPosition(position),
      transition: 'all 0.2s',
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
