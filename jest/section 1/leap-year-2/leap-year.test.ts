import { isLeapYear } from './leap-year';

describe('Leap algorithm', () => {
  it('detects a leap year', () => {
    expect(isLeapYear(1996)).toBeTruthy();
  });

  it('detects a non leap year', () => {
    expect(isLeapYear(1997)).toBeFalsy();
  });

  it('does not think a century year is a leap year', () => {
    expect(isLeapYear(1900)).toBeFalsy();
  })

  it('year zero is not valid and should not be leap', () => {
    expect(isLeapYear(0)).toBeFalsy();
  });
});
