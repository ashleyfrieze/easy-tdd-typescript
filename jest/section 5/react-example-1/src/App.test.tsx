import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  it('has a title', () => {
    render(<App />);
    expect(screen.getByText('Vite + React')).toBeInTheDocument();
  });

  it('can click on the increment button to go up', async () => {
    render(<App />);
    const button = (await screen.findAllByRole('button'))[0];

    expect(button).toHaveTextContent('0');

    // when we click the button
    await userEvent.click(button);

    expect(button).toHaveTextContent('1');
  });

  it('provides a button which can reduce the count', () => {
    render(<App />);
    expect(screen.getByText('Go Down')).toBeInTheDocument();
  });
});
