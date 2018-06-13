import React from 'react';
import { getContent } from '../src/helpers/tests';
import OffCanvas from 'react-off-canvas';

describe('OffCanvas', () => {
  it('focuses the OffCanvas content when open', () => {
    const content = getContent(<OffCanvas isOpen={true} />);
    expect(document.activeElement).toBe(content);
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
