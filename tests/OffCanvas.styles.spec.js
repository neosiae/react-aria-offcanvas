import React from 'react';
import { getOverlay, getContent } from './helpers/tests';
import OffCanvas from 'react-off-canvas';

describe('OffCanvas', () => {
  describe('overlay', () => {
    it('supports inline styling', () => {
      const style = { overlay: { background: 'rgba(0, 0, 0, 0.5)' } };
      const overlay = getOverlay(<OffCanvas style={style} />);
      expect(overlay.style.background).toBe('rgba(0, 0, 0, 0.5)');
    });

    it('accepts a custom overlayClassName', () => {
      const overlay = getOverlay(
        <OffCanvas overlayClassName="customOverlayClassName" />,
      );
      expect(overlay.classList.contains('customOverlayClassName')).toBe(true);
    });
  });

  describe('content', () => {
    it('supports inline styling', () => {
      const style = { content: { width: '100%' } };
      const content = getContent(<OffCanvas style={style} />);
      expect(content.style.width).toBe('100%');
    });

    it('accepts a custom className', () => {
      const content = getContent(<OffCanvas className="customClassName" />);
      expect(content.classList.contains('customClassName')).toBe(true);
    });

    it('has important styles when closed', () => {
      const content = getContent(<OffCanvas />);
      expect(content.style.visibility).toBe('hidden');
      expect(content.style.transitionProperty).toBeUndefined;
    });

    it('has important styles when open', () => {
      const content = getContent(<OffCanvas isOpen={true} />);
      expect(content.style.visibility).toBe('visible');
      expect(content.style.transitionProperty).toBe('transform');
    });
  });
});
