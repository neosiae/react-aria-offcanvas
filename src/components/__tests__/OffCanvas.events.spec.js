import React from 'react';
import { renderIntoDocument, cleanup, fireEvent } from 'react-testing-library';
import OffCanvas from 'react-off-canvas';

describe('OffCanvas', () => {
  let props = undefined;
  let renderedOffCanvas = undefined;

  const offCanvas = () => {
    if (!renderedOffCanvas) {
      renderedOffCanvas = renderIntoDocument(<OffCanvas {...props} />);
    }
    return renderedOffCanvas;
  };

  beforeEach(() => {
    props = {
      onClose: undefined,
      closeOnEsc: undefined,
      closeOnOverlayClick: undefined,
    };
    renderedOffCanvas = null;
  });

  afterEach(cleanup);

  describe('closeOnOverlayClick', () => {
    describe('when false', () => {
      beforeEach(() => {
        props.isOpen = true;
        props.closeOnOverlayClick = false;
        props.onClose = jest.fn();
      });

      it('should not close on overlay click', () => {
        const { getByTestId } = offCanvas();
        fireEvent.click(getByTestId('overlay'));
        expect(props.onClose).not.toHaveBeenCalled();
      });
    });

    describe('when true', () => {
      beforeEach(() => {
        props.isOpen = true;
        props.closeOnOverlayClick = true;
        props.onClose = jest.fn();
      });

      it('should close on overlay click', () => {
        const { getByTestId } = offCanvas();
        fireEvent.click(getByTestId('overlay'));
        expect(props.onClose).toHaveBeenCalled();
      });
    });
  });

  describe('closeOnEsc', () => {
    describe('when false', () => {
      beforeEach(() => {
        props.isOpen = true;
        props.closeOnEsc = false;
        props.onClose = jest.fn();
      });

      it('should not close on ESC key', () => {
        const { getByTestId } = offCanvas();
        fireEvent.keyDown(getByTestId('content'), { keyCode: 27 });
        expect(props.onClose).not.toHaveBeenCalled();
      });
    });

    describe('when true', () => {
      beforeEach(() => {
        props.isOpen = true;
        props.closeOnEsc = true;
        props.onClose = jest.fn();
      });

      it('should close on ESC key', () => {
        const { getByTestId } = offCanvas();
        fireEvent.keyDown(getByTestId('content'), { keyCode: 27 });
        expect(props.onClose).toHaveBeenCalled();
      });
    });
  });
});
