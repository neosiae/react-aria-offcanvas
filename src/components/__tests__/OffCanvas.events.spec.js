import React from 'react';
import { renderIntoDocument, cleanup, fireEvent } from 'react-testing-library';
import OffCanvas from 'react-off-canvas';

describe('OffCanvas', () => {
  afterEach(cleanup);

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
