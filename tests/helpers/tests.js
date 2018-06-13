import { render } from 'react-testing-library';

export const getContent = element => {
  const { getByTestId } = render(element);
  const content = getByTestId('content');
  return content;
};

export const getOverlay = element => {
  const { getByTestId } = render(element);
  const overlay = getByTestId('overlay');
  return overlay;
};

export const extractNumber = property => parseInt(property.match(/[-]*\d+/));
