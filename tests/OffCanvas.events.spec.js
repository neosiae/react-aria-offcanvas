import React from 'react';
import { renderIntoDocument, fireEvent, cleanup } from 'react-testing-library';
import OffCanvas from 'react-off-canvas';

describe('OffCanvas', () => {
  afterEach(cleanup);

  it('traps focus inside the OffCanvas content', () => {
    const Buttons = () => (
      <div>
        <button>First</button>
        <button>Second</button>
      </div>
    );

    const { getByText, getByTestId } = renderIntoDocument(
      <OffCanvas isOpen={true} trapFocusAfterOpen={true}>
        <Buttons />
      </OffCanvas>,
    );

    const first = getByText('First');
    const second = getByText('Second');
    fireEvent.keyDown(second, { key: 'TAB', keyCode: 9, which: 9 });
    expect(document.activeElement).toBe(first);

    cleanup();
  });

  describe('closeOnOverlayClick', () => {
    describe('when false', () => {
      it('should not close on overlay click', () => {
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

    describe('when true', () => {
      it('should close on overlay click', () => {
        const handleClose = jest.fn();
        const { getByTestId } = renderIntoDocument(
          <OffCanvas
            isOpen={true}
            closeOnOverlayClick={true}
            onClose={handleClose}
          />,
        );

        fireEvent.click(getByTestId('overlay'));
        expect(handleClose).toHaveBeenCalled();
      });
    });
  });

  describe('closeOnEsc', () => {
    describe('when false', () => {
      it('should not close on ESC key', () => {
        const handleClose = jest.fn();
        const { getByTestId } = renderIntoDocument(
          <OffCanvas isOpen={true} closeOnEsc={false} onClose={handleClose} />,
        );

        fireEvent.keyDown(getByTestId('content'), { keyCode: 27 });
        expect(handleClose).not.toHaveBeenCalled();
      });
    });

    describe('when true', () => {
      it('should close on ESC key', () => {
        const handleClose = jest.fn();
        const { getByTestId } = renderIntoDocument(
          <OffCanvas isOpen={true} closeOnEsc={true} onClose={handleClose} />,
        );

        fireEvent.keyDown(getByTestId('content'), { keyCode: 27 });
        expect(handleClose).toHaveBeenCalled();
      });
    });
  });
});
