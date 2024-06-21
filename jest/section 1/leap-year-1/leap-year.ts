const isDivisibleBy = (year: number, divisor: number) => (year % divisor) === 0;

export const isLeapYear = (year: number): boolean =>
    isDivisibleBy(year, 4) && !isDivisibleBy(year, 100);
