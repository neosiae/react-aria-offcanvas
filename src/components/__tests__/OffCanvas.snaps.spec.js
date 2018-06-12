import React from 'react';
import renderer from 'react-test-renderer';
import OffCanvas from 'react-off-canvas';

describe('OffCanvas', () => {
  it('renders correctly when open', () => {
    const tree = renderer.create(<OffCanvas isOpen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when closed', () => {
    const tree = renderer.create(<OffCanvas />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
