import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as focusManager from '../helpers/focusManager';
import createStyles from '../helpers/styles';

const ESC_KEY = 27;

export default class OffCanvas extends Component {
  static defaultProps = {
    isOpen: false,
    width: '300px',
    openFromRight: false,
    closeOnEsc: true,
    closeOnOverlayClick: true,
    style: {
      overlay: {},
      content: {},
    },
  };

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    width: PropTypes.string,
    openFromRight: PropTypes.bool,
    role: PropTypes.string,
    label: PropTypes.string,
    labelledby: PropTypes.string,
    onClose: PropTypes.func,
    closeOnEsc: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    style: PropTypes.shape({
      overlay: PropTypes.object,
      content: PropTypes.object,
    }),
    className: PropTypes.string,
    overlayClassName: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(255, 255, 255, 0.5)',
      zIndex: '900',
    },
    content: {
      position: 'fixed',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.1)',
      zIndex: '1000',
      outline: 0,
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
    focusManager.focusLater();
    focusManager.trapFocus(this.content);
    this.focusContent();
  };

  close = () => {
    focusManager.returnFocus();
    focusManager.removeTrapFocus();
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

  getStyles = () => {
    const { isOpen, width, openFromRight, style } = this.props;

    const styles = createStyles(
      OffCanvas.defaultStyles,
      isOpen,
      width,
      openFromRight,
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
