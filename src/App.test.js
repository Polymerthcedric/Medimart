import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Medimart demo shell', () => {
  render(<App />);
  expect(screen.getAllByText(/medimart/i).length).toBeGreaterThan(0);
});
