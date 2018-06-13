import React from 'react';
import { renderIntoDocument, fireEvent, cleanup } from 'react-testing-library';
import OffCanvas from 'react-off-canvas';
import { getOverlay, getContent, extractNumber } from './helpers/tests';
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

  it('opens from the left side by default', () => {
    const content = getContent(<OffCanvas />);
    const value = extractNumber(content.style.transform);
    expect(value).toBeLessThan(0);
  });

  it('opens from the right side', () => {
    const content = getContent(<OffCanvas openFromRight={true} />);
    const value = extractNumber(content.style.transform);
    expect(value).toBeGreaterThan(0);
  });

  it('accepts a custom role', () => {
    const content = getContent(<OffCanvas role="dialog" />);
    expect(content.getAttribute('role')).toBe('dialog');
  });

  it('accepts a custom aria-label', () => {
    const content = getContent(<OffCanvas label="OffCanvas" />);
    expect(content.getAttribute('aria-label')).toBe('OffCanvas');
  });

  it('accepts a custom aria-labelledby', () => {
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

  it('accepts a custom className', () => {
    const content = getContent(<OffCanvas className="customClassName" />);
    expect(content.classList.contains('customClassName')).toBe(true);
  });

  it('accepts a custom overlayClassName', () => {
    const overlay = getOverlay(
      <OffCanvas overlayClassName="customOverlayClassName" />,
    );
    expect(overlay.classList.contains('customOverlayClassName')).toBe(true);
  });
});
