export type Row = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
export type SeatReference = {
  row: Row;
  seat: number;
};

export type ArrayReference = {
  row: number;
  col: number;
};
