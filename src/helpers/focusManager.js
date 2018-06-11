import { findTabbable } from './tabbable';

const TAB_KEY = 9;

let lastFocusedElement = undefined;
let offCanvasElement = undefined;

const handleTrapFocus = (event, firstTabbable, lastTabbable) => {
  if (event.shiftKey) {
    if (event.target === firstTabbable) {
      event.preventDefault();
      lastTabbable.focus();
    }
  } else {
    if (event.target === lastTabbable) {
      event.preventDefault();
      firstTabbable.focus();
    }
  }
};

const handleKeyDown = event => {
  const tabbable = Array.from(findTabbable(offCanvasElement));
  const firstTabbable = tabbable[0];
  const lastTabbable = tabbable[tabbable.length - 1];

  if (event.keyCode === TAB_KEY) {
    handleTrapFocus(event, firstTabbable, lastTabbable);
  }
};

export const focusLater = () => {
  lastFocusedElement = document.activeElement;
};

export const returnFocus = () => {
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
};

export const trapFocus = element => {
  offCanvasElement = element;
  document.addEventListener('keydown', handleKeyDown, true);
};

export const removeTrapFocus = () => {
  offCanvasElement = null;
  document.removeEventListener('keydown', handleKeyDown, true);
};
