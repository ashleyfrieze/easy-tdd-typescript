import { ArrayReference, Row, SeatReference } from './types';

const FIRST_ROW = 'A'.charCodeAt(0);

export const referenceOf = (seatReference: SeatReference): ArrayReference => {
  const { seat } = seatReference;

  if (seat < 1 || seat > 10 || Math.round(seat) !== seat) {
    throw new Error(`${seat} is not a valid seat number`);
  }

  return {
    row: seatReference.row.charCodeAt(0) - FIRST_ROW,
    col: seat - 1,
  };
};

export const rowOf = (row: number): Row => {
  if (row < 0 || row > 9 || Math.round(row) !== row) {
    throw new Error(`${row} is not a valid row`);
  }
  return String.fromCharCode(FIRST_ROW + row) as Row;
};
