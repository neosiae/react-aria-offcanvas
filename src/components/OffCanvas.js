import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as focusManager from '../helpers/focusManager';
import createStyles from '../helpers/styles';

const ESC_KEY = 27;

export default class OffCanvas extends Component {
  static defaultProps = {
    isOpen: false,
    width: '300px',
    height: '300px',
    position: 'left',
    closeOnEsc: true,
    closeOnOverlayClick: true,
    trapFocusAfterOpen: true,
    returnFocusAfterClose: true,
    style: {
      overlay: {},
      content: {},
    },
  };

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    onClose: PropTypes.func,
    closeOnEsc: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    trapFocusAfterOpen: PropTypes.bool,
    returnFocusAfterClose: PropTypes.bool,
    style: PropTypes.shape({
      overlay: PropTypes.object,
      content: PropTypes.object,
    }),
    className: PropTypes.string,
    overlayClassName: PropTypes.string,
    role: PropTypes.string,
    label: PropTypes.string,
    labelledby: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: '900',
    },
    content: {
      position: 'fixed',
      zIndex: '1000',
      outline: 0,
    },
  };

  static extraStyles = {
    overlay: {
      background: 'rgba(255, 255, 255, 0.5)',
    },
    content: {
      background: 'rgba(0, 0, 0, 0.1)',
      transition: '0.25s ease-out',
    },
  };

  componentDidMount() {
    if (this.props.isOpen) {
      this.open();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.open();
    } else if (!this.props.isOpen && prevProps.isOpen) {
      this.close();
    }
  }

  open = () => {
    if (this.props.returnFocusAfterClose) {
      focusManager.focusLater();
    }

    if (this.props.trapFocusAfterOpen) {
      focusManager.setFocusTrap(this.content);
    }

    this.focusContent();
  };

  close = () => {
    if (this.props.returnFocusAfterClose) {
      focusManager.returnFocus();
    }

    if (this.props.trapFocusAfterOpen) {
      focusManager.removeFocusTrap();
    }
  };

  parentHandlesClose = event => {
    if (this.props.onClose) {
      this.props.onClose(event);
    }
  };

  handleOnOverlayClick = event => {
    if (this.props.closeOnOverlayClick && event.target === this.overlay) {
      this.parentHandlesClose(event);
    }
  };

  handleOnEscDown = event => {
    if (this.props.closeOnEsc && event.keyCode === ESC_KEY) {
      this.parentHandlesClose(event);
    }
  };

  setOverlayRef = overlay => {
    this.overlay = overlay;
  };

  setContentRef = content => {
    this.content = content;
  };

  focusContent = () => this.content && this.content.focus();

  getExtraStyles = () => {
    const { className, overlayClassName } = this.props;

    // Remove extra styles when classNames are passed
    const overlayStyles = overlayClassName ? {} : OffCanvas.extraStyles.overlay;
    const contentStyles = className ? {} : OffCanvas.extraStyles.content;

    return {
      overlay: overlayStyles,
      content: contentStyles,
    };
  };

  getStyles = () => {
    const { isOpen, width, height, position, style } = this.props;
    const extraStyles = this.getExtraStyles();

    const styles = createStyles(
      OffCanvas.defaultStyles,
      extraStyles,
      isOpen,
      width,
      height,
      position,
      style,
    );

    return styles;
  };

  render() {
    const {
      isOpen,
      role,
      label,
      labelledby,
      className,
      overlayClassName,
    } = this.props;

    const styles = this.getStyles();

    return (
      <div
        ref={this.setOverlayRef}
        style={styles.overlay}
        className={overlayClassName}
        onClick={this.handleOnOverlayClick}
        data-testid="overlay"
      >
        <div
          ref={this.setContentRef}
          style={styles.content}
          className={className}
          onKeyDown={this.handleOnEscDown}
          role={role}
          aria-label={label}
          aria-labelledby={labelledby}
          aria-hidden={!isOpen}
          tabIndex="-1"
          data-testid="content"
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
