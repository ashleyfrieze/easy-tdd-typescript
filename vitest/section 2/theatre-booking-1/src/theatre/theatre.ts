export type Row = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
export type SeatReference = {
  row: Row;
  seat: number;
};

const allocated: SeatReference[] = [];

const sameSeat = (seat1: SeatReference, seat2: SeatReference) =>
  seat1.row === seat2.row && seat1.seat === seat2.seat;

export const isAllocated = (seatReference: SeatReference): boolean => {
  return Boolean(allocated.find((theSeat) => sameSeat(theSeat, seatReference)));
};

export const allocate = (seatReference: SeatReference) => {
  allocated.push(seatReference);
};

export const countOfBooked = () => allocated.length;

export const clearAllBookings = () => {
    allocated.length = 0;
}