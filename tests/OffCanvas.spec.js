import React from 'react';
import OffCanvas from 'react-off-canvas';
import { getContent, extractNumber } from './helpers/tests';

describe('OffCanvas', () => {
  it('focuses the OffCanvas content when open', () => {
    const content = getContent(<OffCanvas isOpen={true} />);
    expect(document.activeElement).toBe(content);
  });

  describe('openFromRight', () => {
    it('opens from the left side by default', () => {
      const content = getContent(<OffCanvas />);
      const value = extractNumber(content.style.transform);
      expect(value).toBeLessThan(0);
    });

    it('opens from the right side if set to true', () => {
      const content = getContent(<OffCanvas openFromRight={true} />);
      const value = extractNumber(content.style.transform);
      expect(value).toBeGreaterThan(0);
    });
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
});
