const isDivisibleBy = (year: number, divisor: number) => year % divisor === 0;

export const isLeapYear = (year: number): boolean => {
  if (year < 1) {
    return false;
  }
  return (
    isDivisibleBy(year, 400) ||
    (isDivisibleBy(year, 4) && !isDivisibleBy(year, 100))
  );
};
