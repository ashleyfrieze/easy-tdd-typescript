export type Row = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
export type SeatReference = {
  row: Row;
  seat: number;
};

export const newTheatre = () => {
  const allocated: SeatReference[] = [];

  const sameSeat = (seat1: SeatReference, seat2: SeatReference) =>
    seat1.row === seat2.row && seat1.seat === seat2.seat;

  const isAllocated = (seatReference: SeatReference): boolean => {
    return Boolean(
      allocated.find((theSeat) => sameSeat(theSeat, seatReference))
    );
  };

  const allocate = (seatReference: SeatReference) => {
    allocated.push(seatReference);
  };

  const countOfBooked = () => allocated.length;

  const clearAllBookings = () => {
    allocated.length = 0;
  };

  return { isAllocated, allocate, countOfBooked, clearAllBookings };
};
