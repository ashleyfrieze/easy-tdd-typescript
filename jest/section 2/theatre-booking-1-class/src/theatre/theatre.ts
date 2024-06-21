export type Row = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';
export type SeatReference = {
  row: Row;
  seat: number;
};

export class Theatre {
  allocated: SeatReference[] = [];

  isAllocated(seatReference: SeatReference): boolean {
    return Boolean(
      this.allocated.find((theSeat) => Theatre.sameSeat(theSeat, seatReference))
    );
  }

  allocate(seatReference: SeatReference) {
    this.allocated.push(seatReference);
  }

  countOfBooked() {
    return this.allocated.length;
  }

  clearAllBookings() {
    this.allocated.length = 0;
  }

  private static sameSeat(seat1: SeatReference, seat2: SeatReference) {
    return seat1.row === seat2.row && seat1.seat === seat2.seat;
  }
}
