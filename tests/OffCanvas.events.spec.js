import React from 'react';
import { renderIntoDocument, fireEvent, cleanup } from 'react-testing-library';
import OffCanvas from 'react-off-canvas';
import App from './helpers/components';

describe('OffCanvas', () => {
  afterEach(cleanup);

  describe('returnFocusAfterClose', () => {
    it('returns focus to the last focused element by default', () => {
      const { getByText, getByTestId } = renderIntoDocument(<App />);
      const button = getByText('Open');

      button.focus();
      fireEvent.click(button);
      button.blur();

      expect(document.activeElement).toBe(getByTestId('content'));
      fireEvent.click(getByTestId('overlay'));
      expect(document.activeElement).toBe(button);
    });

    it('does not return focus to the last focused element if set to false', () => {
      const { getByText, getByTestId } = renderIntoDocument(
        <App returnFocusAfterClose={false} />,
      );
      const button = getByText('Open');

      button.focus();
      fireEvent.click(button);
      button.blur();

      expect(document.activeElement).toBe(getByTestId('content'));
      fireEvent.click(getByTestId('overlay'));
      expect(document.activeElement).not.toBe(button);
    });
  });

  describe('trapFocusAfterOpen', () => {
    it('traps focus inside the OffCanvas content by default', () => {
      const Buttons = () => (
        <div>
          <button>First</button>
          <button>Second</button>
        </div>
      );

      const { getByText } = renderIntoDocument(
        <OffCanvas isOpen={true}>
          <Buttons />
        </OffCanvas>,
      );

      const first = getByText('First');
      const second = getByText('Second');
      fireEvent.keyDown(second, { key: 'TAB', keyCode: 9, which: 9 });
      expect(document.activeElement).toBe(first);
    });

    it('does not trap focus inside the OffCanvas content if set to false', () => {
      const Buttons = () => (
        <div>
          <button>First</button>
          <button>Second</button>
        </div>
      );

      const { getByText } = renderIntoDocument(
        <OffCanvas isOpen={true} trapFocusAfterOpen={false}>
          <Buttons />
        </OffCanvas>,
      );

      const first = getByText('First');
      const second = getByText('Second');
      fireEvent.keyDown(second, { key: 'TAB', keyCode: 9, which: 9 });
      expect(document.activeElement).not.toBe(first);
    });
  });

  describe('closeOnOverlayClick', () => {
    it('should close on overlay click by default', () => {
      const handleClose = jest.fn();
      const { getByTestId } = renderIntoDocument(
        <OffCanvas isOpen={true} onClose={handleClose} />,
      );

      fireEvent.click(getByTestId('overlay'));
      expect(handleClose).toHaveBeenCalled();
    });

    it('should not close on overlay click if set to false', () => {
      const handleClose = jest.fn();
      const { getByTestId } = renderIntoDocument(
        <OffCanvas
          isOpen={true}
          closeOnOverlayClick={false}
          onClose={handleClose}
        />,
      );

      fireEvent.click(getByTestId('overlay'));
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('closeOnEsc', () => {
    it('should close on ESC key by default', () => {
      const handleClose = jest.fn();
      const { getByTestId } = renderIntoDocument(
        <OffCanvas isOpen={true} onClose={handleClose} />,
      );

      fireEvent.keyDown(getByTestId('content'), { keyCode: 27 });
      expect(handleClose).toHaveBeenCalled();
    });

    it('should not close on ESC key if set to false', () => {
      const handleClose = jest.fn();
      const { getByTestId } = renderIntoDocument(
        <OffCanvas isOpen={true} closeOnEsc={false} onClose={handleClose} />,
      );

      fireEvent.keyDown(getByTestId('content'), { keyCode: 27 });
      expect(handleClose).not.toHaveBeenCalled();
    });
  });
});
