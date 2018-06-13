import React, { Component } from 'react';
import OffCanvas from 'react-off-canvas';
import { renderIntoDocument, cleanup, fireEvent } from 'react-testing-library';
import { getContent } from './helpers/tests';
import App from './helpers/components';

describe('OffCanvas', () => {
  it('focuses the OffCanvas content when open', () => {
    const content = getContent(<OffCanvas isOpen={true} />);
    expect(document.activeElement).toBe(content);
  });

  it('returns focus to the last focused element', () => {
    const { getByText, getByTestId } = renderIntoDocument(<App />);
    const button = getByText('Open');

    button.focus();
    fireEvent.click(button);
    button.blur();

    expect(document.activeElement).toBe(getByTestId('content'));
    fireEvent.click(getByTestId('overlay'));
    expect(document.activeElement).toBe(button);

    cleanup();
  });

  it('sets role based on the role prop', () => {
    const content = getContent(<OffCanvas role="dialog" />);
    expect(content.getAttribute('role')).toBe('dialog');
  });

  it('sets aria-label based on the label prop', () => {
    const content = getContent(<OffCanvas label="OffCanvas" />);
    expect(content.getAttribute('aria-label')).toBe('OffCanvas');
  });

  it('sets aria-labelledby based on the labelledby prop', () => {
    const content = getContent(<OffCanvas labelledby="button" />);
    expect(content.getAttribute('aria-labelledby')).toBe('button');
  });

  it('sets aria-hidden to false when open', () => {
    const content = getContent(<OffCanvas isOpen={true} />);
    expect(content.getAttribute('aria-hidden')).toBe('false');
  });

  it('sets aria-hidden to true when closed', () => {
    const content = getContent(<OffCanvas />);
    expect(content.getAttribute('aria-hidden')).toBe('true');
  });
});
