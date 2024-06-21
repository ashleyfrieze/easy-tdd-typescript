import { hello } from '.';

describe('Testing', () => {
  it('gets hello world', () => {
    expect(hello()).toBe('world');
  });
});
