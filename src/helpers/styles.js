const getPosition = (position, width) => {
  if (position === 'left') {
    return `translateX(-${width})`;
  } else if (position === 'right') {
    return `translateX(${width})`;
  }
};

const createStyles = (defaultStyles, isOpen, width, position, customStyles) => {
  return {
    overlay: {
      ...defaultStyles.overlay,
      width: isOpen ? '100vw' : '',
      ...customStyles.overlay,
    },
    content: {
      ...defaultStyles.content,
      width: width,
      left: position === 'left' ? '0' : 'auto',
      right: position === 'right' ? '0' : 'auto',
      MozTransform: isOpen ? '' : getPosition(position, width),
      MsTransform: isOpen ? '' : getPosition(position, width),
      OTransform: isOpen ? '' : getPosition(position, width),
      WebkitTransform: isOpen ? '' : getPosition(position, width),
      transform: isOpen ? '' : getPosition(position, width),
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
