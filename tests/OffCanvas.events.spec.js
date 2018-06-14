import React from 'react';
import { renderIntoDocument, fireEvent, cleanup } from 'react-testing-library';
import OffCanvas from 'react-off-canvas';

describe('OffCanvas', () => {
  afterEach(cleanup);

  describe('trapFocusAfterOpen', () => {
    it('traps focus inside the OffCanvas content by default', () => {
      const Buttons = () => (
        <div>
          <button>First</button>
          <button>Second</button>
        </div>
      );

      const { getByText, getByTestId } = renderIntoDocument(
        <OffCanvas isOpen={true}>
          <Buttons />
        </OffCanvas>,
      );

      const first = getByText('First');
      const second = getByText('Second');
      fireEvent.keyDown(second, { key: 'TAB', keyCode: 9, which: 9 });
      expect(document.activeElement).toBe(first);

      cleanup();
    });

    it('does not trap focus inside the OffCanvas content if trapFocusAfterOpen prop is false', () => {
      const Buttons = () => (
        <div>
          <button>First</button>
          <button>Second</button>
        </div>
      );

      const { getByText, getByTestId } = renderIntoDocument(
        <OffCanvas isOpen={true} trapFocusAfterOpen={false}>
          <Buttons />
        </OffCanvas>,
      );

      const first = getByText('First');
      const second = getByText('Second');
      fireEvent.keyDown(second, { key: 'TAB', keyCode: 9, which: 9 });
      expect(document.activeElement).not.toBe(first);

      cleanup();
    });
  });

  describe('closeOnOverlayClick', () => {
    it('should not close on overlay click if closeOnOverlayClick prop is false', () => {
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

    it('should close on overlay click by default', () => {
      const handleClose = jest.fn();
      const { getByTestId } = renderIntoDocument(
        <OffCanvas isOpen={true} onClose={handleClose} />,
      );

      fireEvent.click(getByTestId('overlay'));
      expect(handleClose).toHaveBeenCalled();
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

    it('should not close on ESC key if closeOnEsc prop is false', () => {
      const handleClose = jest.fn();
      const { getByTestId } = renderIntoDocument(
        <OffCanvas isOpen={true} closeOnEsc={false} onClose={handleClose} />,
      );

      fireEvent.keyDown(getByTestId('content'), { keyCode: 27 });
      expect(handleClose).not.toHaveBeenCalled();
    });
  });
});
