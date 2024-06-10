export type Row = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
export type SeatReference = {
  row: Row;
  seat: number;
};

export type TheatreState = {
  allocated: SeatReference[];
}

export const newTheatreState = (): TheatreState => {
  return { allocated: [] };
}

const sameSeat = (seat1: SeatReference, seat2: SeatReference) =>
  seat1.row === seat2.row && seat1.seat === seat2.seat;

export const isAllocated = (state: TheatreState, seatReference: SeatReference): boolean => {
  return Boolean(state.allocated.find((theSeat) => sameSeat(theSeat, seatReference)));
};

export const allocate = (state: TheatreState, seatReference: SeatReference) => {
  state.allocated.push(seatReference);
};

export const countOfBooked = (state: TheatreState) => state.allocated.length;

export const clearAllBookings = (state: TheatreState) => {
    state.allocated.length = 0;
}