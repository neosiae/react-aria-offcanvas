const createStyles = (defaultStyles, isOpen, width, right, customStyles) => {
  return {
    overlay: {
      ...defaultStyles.overlay,
      width: isOpen ? '100vw' : '',
      ...customStyles.overlay,
    },
    content: {
      ...defaultStyles.content,
      width: width,
      left: right ? 'auto' : '0',
      right: right ? '0' : 'auto',
      MozTransform: isOpen
        ? ''
        : right
          ? `translateX(${width})`
          : `translateX(-${width})`,
      MsTransform: isOpen
        ? ''
        : right
          ? `translateX(${width})`
          : `translateX(-${width})`,
      OTransform: isOpen
        ? ''
        : right
          ? `translateX(${width})`
          : `translateX(-${width})`,
      WebkitTransform: isOpen
        ? ''
        : right
          ? `translateX(${width})`
          : `translateX(-${width})`,
      transform: isOpen
        ? ''
        : right
          ? `translateX(${width})`
          : `translateX(-${width})`,
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
