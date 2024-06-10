import { referenceOf, rowOf } from './array-reference';

describe('Array references', () => {
  describe('to array', () => {
    it('finds the top left corner', () => {
      expect(referenceOf({ row: 'A', seat: 1 })).toEqual({ row: 0, col: 0 });
    });

    it('asymmetric reference', () => {
      expect(referenceOf({ row: 'B', seat: 9 })).toEqual({ row: 1, col: 8 });
    });

    it('bottom right corner', () => {
      expect(referenceOf({ row: 'J', seat: 10 })).toEqual({ row: 9, col: 9 });
    });

    it('will throw an error when an invalid high seat number is provided', () => {
      expect(() => referenceOf({ row: 'J', seat: 99 })).toThrow();
    });

    it('will throw an error when an edge high seat number is provided', () => {
      expect(() => referenceOf({ row: 'J', seat: 11 })).toThrow();
    });

    it('will throw an error when an edge low seat number is provided', () => {
      expect(() => referenceOf({ row: 'J', seat: 0 })).toThrow();
    });

    it('will throw an error when an low seat number is provided', () => {
      expect(() => referenceOf({ row: 'J', seat: -2 })).toThrow();
    });

    it('will throw an error when non integer seat number is provided', () => {
      expect(() => referenceOf({ row: 'J', seat: 1.5 })).toThrow();
    });
  });

  describe('to reference', () => {
    it('converts index back to row', () => {
      expect(rowOf(0)).toBe('A');
    });

    it('will throw is index is invalid', () => {
      expect(() => rowOf(-1)).toThrow();
    });

    it('will throw is index is too high', () => {
      expect(() => rowOf(10)).toThrow();
    });

    it('will throw is index is non integer', () => {
      expect(() => rowOf(4.5)).toThrow();
    });
  });
});
