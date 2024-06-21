import { ResetButton } from './ResetButton';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

const resetAction = jest.fn();

describe('Reset button', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('will be called reset', () => {
    render(<ResetButton resetAction={resetAction} />);
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('will be called something else when alternative name provided', () => {
    render(<ResetButton resetAction={resetAction} name="Me" />);
    expect(screen.getByText('Reset Me')).toBeInTheDocument();
  });

  it('will do a reset action when clicked', async () => {
    render(<ResetButton resetAction={resetAction} />);
    await userEvent.click(screen.getByRole('button'));

    expect(resetAction).toHaveBeenCalled();
  });
});
