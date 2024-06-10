import { referenceOf, rowOf } from './array-reference';
import { rowFirstRange } from './ranges';
import { Row, SeatingBlock, SeatReference } from './types';

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

  spareSeats(row: Row) {
    const arrayRef = referenceOf({ row, seat: 1 });
    return this.allocatedSeats[arrayRef.row].filter(Theatre.isEmpty).length;
  }

  clearAllBookings() {
    this.allocatedSeats = Theatre.createEmptyAuditorium();
  }

  firstRowWithAdjacent(requested: number): SeatingBlock | undefined {
    for (let rowIndex = 0; rowIndex < this.allocatedSeats.length; rowIndex++) {
      const range = rowFirstRange(this.allocatedSeats[rowIndex], requested);
      if (range) {
        const row = rowOf(rowIndex);
        return {
          row,
          seats: Array(requested)
            .fill('')
            .map((value, index) => ({
              row,
              seat: index + range.min + 1,
            })),
        };
      }
    }
    return undefined;
  }

  private static isEmpty(seat: boolean) {
    return !seat;
  }

  private static createEmptyAuditorium() {
    return Array.from({ length: 10 }, () => Array(10).fill(false));
  }
}
