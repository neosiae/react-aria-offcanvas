// Attaches an event handler to the specified element and ensures that the
// event handler is executed only once.
export function runEventHandlerOnce(
  target,
  type,
  listener,
  options = { add: { capture: false }, remove: { capture: false } },
) {
  function eventHandler(event) {
    event.target.removeEventListener(event.type, eventHandler, options.remove);
    listener(event);
  }
  target.addEventListener(type, eventHandler, options.add);
}
