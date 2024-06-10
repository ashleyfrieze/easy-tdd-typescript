import { referenceOf } from './array-reference';
import { SeatReference } from './types';

export class Theatre {
  allocatedSeats: boolean[][] = Theatre.createEmptyAuditorium();

  isAllocated(seatReference: SeatReference): boolean {
    const arrayRef = referenceOf(seatReference);
    return this.allocatedSeats[arrayRef.row][arrayRef.col];
  }

  allocate(seatReference: SeatReference) {
    const arrayRef = referenceOf(seatReference);
    this.allocatedSeats[arrayRef.row][arrayRef.col] = true;
  }

  countOfBooked() {
    return this.allocatedSeats
      .map((row) => row.filter(Boolean).length)
      .reduce((prev, curr) => prev + curr, 0);
  }

  clearAllBookings() {
    this.allocatedSeats = Theatre.createEmptyAuditorium();
  }

  private static createEmptyAuditorium() {
    return Array.from({ length: 10 }, () => Array(10).fill(false));
  }
}
