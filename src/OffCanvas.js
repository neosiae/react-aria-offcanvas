import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import runEventHandlerOnce from 'run-event-handler-once'
import focusTrap from './helpers/focusTrap'
import { canUseDOM, canUseRoot } from './helpers/static'
import {
  focusLater,
  returnFocus,
  focusFirstChild,
  focusChild,
} from './helpers/focusManager'
import {
  hasClassName,
  createStyles,
  createPushStyles,
  shouldShowContent,
  applyInitialPushStyles,
  shouldHideHorizontalScrollbar,
  shouldLockBodyScroll,
} from './helpers/styles'

const TAB_KEY = 9
const ESC_KEY = 27
const EVENT_LISTENER_OPTIONS = {
  add: { capture: false },
  remove: { capture: false },
}

export default class OffCanvas extends Component {
  constructor(props) {
    super(props)
    this.createOffCanvasRoot()
  }

  static defaultProps = {
    isOpen: false,
    width: '300px',
    height: '300px',
    position: 'left',
    closeOnEsc: true,
    closeOnOverlayClick: true,
    trapFocusAfterOpen: true,
    lockBodyAfterOpen: true,
    returnFocusAfterClose: true,
    style: {
      overlay: {},
      content: {},
    },
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    mainContainerSelector: PropTypes.string,
    onClose: PropTypes.func,
    closeOnEsc: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    trapFocusAfterOpen: PropTypes.bool,
    returnFocusAfterClose: PropTypes.bool,
    lockBodyAfterOpen: PropTypes.bool,
    focusFirstChildAfterOpen: PropTypes.bool,
    focusThisChildAfterOpen: PropTypes.string,
    style: PropTypes.shape({
      container: PropTypes.object,
      overlay: PropTypes.object,
      content: PropTypes.object,
    }),
    className: PropTypes.string,
    overlayClassName: PropTypes.string,
    role: PropTypes.string,
    label: PropTypes.string,
    labelledby: PropTypes.string,
    children: PropTypes.node,
  }

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
      overflowY: 'auto',
      outline: 0,
    },
  }

  static extraStyles = {
    container: {
      transition: 'transform 0.25s ease-out',
    },
    overlay: {
      background: 'rgba(255, 255, 255, 0.5)',
    },
    content: {
      background: 'rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.25s ease-out',
    },
  }

  componentDidMount() {
    const {
      isOpen,
      width,
      height,
      position,
      mainContainerSelector,
      lockBodyAfterOpen,
    } = this.props

    shouldShowContent(this.content, isOpen)

    if (mainContainerSelector) {
      // Get the element that should be pushed
      this.mainContainer = document.querySelector(mainContainerSelector)

      // Remove the extra styles when the main container has a className
      if (hasClassName(this.mainContainer)) {
        OffCanvas.extraStyles.container = {}
      }
    }

    if (isOpen) {
      this.setInitialFocus()
      if (mainContainerSelector) {
        // If the initial state is set to true, this is the right time to apply
        // some of the push styles to the main container.
        applyInitialPushStyles(this.mainContainer, width, height, position)
        shouldHideHorizontalScrollbar(true)
        lockBodyAfterOpen && shouldLockBodyScroll(true)
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.open()
    } else if (!this.props.isOpen && prevProps.isOpen) {
      this.close()
    }
  }

  open = () => {
    const { returnFocusAfterClose, lockBodyAfterOpen } = this.props

    shouldShowContent(this.content, true)

    if (returnFocusAfterClose) {
      focusLater()
    }

    runEventHandlerOnce(
      this.content,
      'transitionend',
      () => {
        this.setInitialFocus()
      },
      EVENT_LISTENER_OPTIONS,
    )

    shouldHideHorizontalScrollbar(true)
    // Lock Body scroll on component update
    lockBodyAfterOpen && shouldLockBodyScroll(true)
  }

  close = () => {
    const { mainContainerSelector, returnFocusAfterClose } = this.props

    if (returnFocusAfterClose) {
      if (mainContainerSelector) {
        runEventHandlerOnce(
          this.mainContainer,
          'transitionend',
          () => {
            // If the Open button is off the screen, returning focus
            // immediately breaks the transition. Transitionend event ensures
            // that the animation has enough time to finish.
            // then use the lock body scroll method to lock body scroll
            returnFocus()
            shouldShowContent(this.content, false)
            shouldHideHorizontalScrollbar(false)
            shouldLockBodyScroll(false)
          },
          EVENT_LISTENER_OPTIONS,
        )
      } else {
        runEventHandlerOnce(
          this.content,
          'transitionend',
          () => {
            returnFocus()
            shouldShowContent(this.content, false)
          },
          EVENT_LISTENER_OPTIONS,
        )
      }
    }
  }

  setInitialFocus = () => {
    const { focusFirstChildAfterOpen, focusThisChildAfterOpen } = this.props

    if (focusFirstChildAfterOpen) {
      focusFirstChild(this.content)
    } else if (focusThisChildAfterOpen) {
      focusChild(this.content, focusThisChildAfterOpen)
    } else {
      this.focusContent()
    }
  }

  parentHandlesClose = event => {
    if (this.props.onClose) {
      this.props.onClose(event)
    }
  }

  handleOverlayClick = event => {
    if (this.props.closeOnOverlayClick && event.target === this.overlay) {
      this.parentHandlesClose(event)
    }
  }

  handleKeyDown = event => {
    if (this.props.trapFocusAfterOpen && event.keyCode === TAB_KEY) {
      focusTrap(event, this.content)
    }

    if (this.props.closeOnEsc && event.keyCode === ESC_KEY) {
      event.stopPropagation()
      this.parentHandlesClose(event)
    }
  }

  setOverlayRef = overlay => {
    this.overlay = overlay
  }

  setContentRef = content => {
    this.content = content
  }

  focusContent = () => this.content && this.content.focus()

  buildStyles = () => {
    const {
      isOpen,
      width,
      height,
      position,
      mainContainerSelector,
      style,
      className,
      overlayClassName,
    } = this.props

    const extra = {
      container: OffCanvas.extraStyles.container,
      // Remove the extra styles when classNames are passed
      overlay: overlayClassName ? {} : OffCanvas.extraStyles.overlay,
      content: className ? {} : OffCanvas.extraStyles.content,
    }

    const main = createStyles(
      OffCanvas.defaultStyles,
      extra,
      isOpen,
      width,
      height,
      position,
      style,
    )

    const applyPushStyles = mainContainerSelector
      ? createPushStyles(
          OffCanvas.extraStyles.container,
          isOpen,
          width,
          height,
          position,
        )
      : null

    return { main, applyPushStyles }
  }

  createOffCanvasRoot = () => {
    if (canUseDOM) {
      this.offCanvasRoot = document.createElement('div')
      this.offCanvasRoot.setAttribute('id', 'offcanvas-root')
      this.offCanvasRoot.dataset.testid = 'offcanvas-portal'
      document.body.appendChild(this.offCanvasRoot)
    }
  }

  removeOffCanvasRoot = () =>
    this.offCanvasRoot && document.body.removeChild(this.offCanvasRoot)

  componentWillUnmount() {
    this.removeOffCanvasRoot()
  }

  render() {
    const {
      isOpen,
      role,
      label,
      labelledby,
      className,
      overlayClassName,
    } = this.props

    const styles = this.buildStyles()

    if (styles.applyPushStyles) {
      styles.applyPushStyles(this.mainContainer)
    }

    return (
      canUseRoot(this.offCanvasRoot) &&
      ReactDOM.createPortal(
        <div
          ref={this.setOverlayRef}
          style={styles && styles.main.overlay}
          className={overlayClassName}
          onClick={this.handleOverlayClick}
          data-testid="overlay"
        >
          <div
            ref={this.setContentRef}
            style={styles && styles.main.content}
            className={className}
            onKeyDown={this.handleKeyDown}
            role={role}
            aria-label={label}
            aria-labelledby={labelledby}
            aria-hidden={!isOpen}
            tabIndex="-1"
            data-testid="content"
          >
            {this.props.children}
          </div>
        </div>,
        this.offCanvasRoot,
      )
    )
  }
}
