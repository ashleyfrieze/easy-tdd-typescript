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

  it('when has incremented, can use the go down button to decrement', async () => {
    // given an app where we've already incremented
    render(<App />);
    const button = (await screen.findAllByRole('button'))[0];
    await userEvent.click(button);
    expect(button).toHaveTextContent('1');

    await userEvent.click(screen.getByText('Go Down'));

    expect(button).toHaveTextContent('0');
  });

  it('when has incremented, can use the reset button to go to zero', async () => {
    // given an app where we've already incremented
    render(<App />);
    const button = (await screen.findAllByRole('button'))[0];
    await userEvent.click(button);
    await userEvent.click(button);
    expect(button).toHaveTextContent('2');

    await userEvent.click(screen.getByText('Reset'));

    expect(button).toHaveTextContent('0');
  });
});
