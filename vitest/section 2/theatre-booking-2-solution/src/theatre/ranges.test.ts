import { rowFirstRange } from './ranges';

describe('Range finding', () => {
  it('finds nothing in a totally zero sized array', () => {
    expect(rowFirstRange([], 10)).toBeUndefined();
  });

  it('finds full range in array of falses', () => {
    expect(rowFirstRange([false, false, false], 3)).toEqual({ min: 0, max: 2 });
  });

  it('finds partial range in array with some trues in', () => {
    expect(rowFirstRange([true, false, true, false, false, false], 3)).toEqual({
      min: 3,
      max: 5,
    });
  });
});
