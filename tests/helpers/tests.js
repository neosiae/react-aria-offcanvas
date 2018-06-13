import { render } from 'react-testing-library';

export const getContent = element => {
  const { getByTestId } = render(element);
  const content = getByTestId('content');
  return content;
};
