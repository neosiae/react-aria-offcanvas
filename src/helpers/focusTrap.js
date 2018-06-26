import { setTabbable } from './tabbable';

const TAB_KEY = 9;

const isTabKey = event => event.keyCode === TAB_KEY;

// Traps focus in an element.
const focusTrap = (event, element) => {
  const tabbable = setTabbable(element);

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

export default focusTrap;
