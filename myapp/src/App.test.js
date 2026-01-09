import { render } from '@testing-library/react';
import App from './App';

test('renders weather app', () => {
  const { container } = render(<App />);
  const appDiv = container.querySelector('.app');
  expect(appDiv).toBeInTheDocument();
});
