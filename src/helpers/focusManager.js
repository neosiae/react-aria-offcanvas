import { setTabbable } from './tabbable';

const TAB_KEY = 9;

let lastFocusedElement = undefined;
let tabbable = undefined;

export const focusLater = () => {
  lastFocusedElement = document.activeElement;
};

export const returnFocus = () => {
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
};

export const setFocusTrap = element => {
  tabbable = setTabbable(element);
  document.addEventListener('keydown', focusTrap, true);
};

export const removeFocusTrap = () => {
  document.removeEventListener('keydown', focusTrap, true);
  tabbable = null;
};

const isTabKey = event => event.keyCode === TAB_KEY;

// Don't let focus to leave tabbable elements
const focusTrap = event => {
  if (!isTabKey(event)) return;

  if (event.shiftKey) {
    // If focus is on the first element, move focus to the last element
    if (event.target === tabbable.first) {
      event.preventDefault();
      tabbable.last.focus();
    }
  } else {
    // If focus is on the last element, move focus to the first element
    if (event.target === tabbable.last) {
      event.preventDefault();
      tabbable.first.focus();
    }
  }
};
