import { Theatre } from './theatre';

describe('theatre', () => {
  let theatre: Theatre;

  beforeEach(() => {
    theatre = new Theatre();
  });

  it('starts without an allocation to seat A5', () => {
    expect(theatre.isAllocated({ row: 'A', seat: 5 })).toBeFalsy();
  });

  it('will recognise a seat as booked if a booking is added', () => {
    theatre.allocate({ row: 'B', seat: 1 });
    expect(theatre.isAllocated({ row: 'B', seat: 1 })).toBeTruthy();
  });

  it('can detect two seats are booked', () => {
    theatre.allocate({ row: 'B', seat: 1 });
    theatre.allocate({ row: 'B', seat: 2 });

    expect(theatre.isAllocated({ row: 'B', seat: 1 })).toBeTruthy();
    expect(theatre.isAllocated({ row: 'B', seat: 2 })).toBeTruthy();
  });

  it('can count the number of seats booked', () => {
    theatre.allocate({ row: 'B', seat: 1 });
    theatre.allocate({ row: 'B', seat: 2 });
    theatre.allocate({ row: 'B', seat: 3 });

    expect(theatre.countOfBooked()).toBe(3);
  });

  it('can clear all bookings', () => {
    // given an allocation of C0
    theatre.allocate({ row: 'C', seat: 9 });
    expect(theatre.isAllocated({ row: 'C', seat: 9 })).toBeTruthy();

    // when we clear everything
    theatre.clearAllBookings();

    // then C9 and everything else is unallocated
    expect(theatre.isAllocated({ row: 'C', seat: 9 })).toBeFalsy();
    expect(theatre.countOfBooked()).toBe(0);
  });

  it('should not be possible to allocate a seat more than once', () => {
    theatre.allocate({ row: 'C', seat: 9 });
    theatre.allocate({ row: 'C', seat: 9 });

    expect(theatre.countOfBooked()).toBe(1);
  });

  it('will throw an error if the seat number is out of range', () => {
    expect(() => theatre.allocate({ row: 'C', seat: 55 })).toThrow();
  });

  it('will start with 10 spare seats on row G', () => {
    expect(theatre.spareSeats('G')).toBe(10);
  });

  it('will have only a few seats on row G if we allocate some', () => {
    theatre.allocate({ row: 'G', seat: 1 });
    theatre.allocate({ row: 'G', seat: 2 });
    theatre.allocate({ row: 'G', seat: 10 });
    expect(theatre.spareSeats('G')).toBe(7);
  });

  it('cannot find row with 10 adjacent seats if all rows too full', () => {
    theatre.allocate({ row: 'A', seat: 1 });
    theatre.allocate({ row: 'B', seat: 2 });
    theatre.allocate({ row: 'C', seat: 3 });
    theatre.allocate({ row: 'D', seat: 4 });
    theatre.allocate({ row: 'E', seat: 5 });
    theatre.allocate({ row: 'F', seat: 6 });
    theatre.allocate({ row: 'G', seat: 7 });
    theatre.allocate({ row: 'H', seat: 8 });
    theatre.allocate({ row: 'I', seat: 9 });
    theatre.allocate({ row: 'J', seat: 10 });

    expect(theatre.firstRowWithAdjacent(10)).toBeUndefined();
  });

  it('find the first row with 10 adjacent seats', () => {
    theatre.allocate({ row: 'A', seat: 1 });
    theatre.allocate({ row: 'B', seat: 2 });

    expect(theatre.firstRowWithAdjacent(10)).toEqual({row: 'C', seats: [
      { row: 'C', seat: 1 },
      { row: 'C', seat: 2 },
      { row: 'C', seat: 3 },
      { row: 'C', seat: 4 },
      { row: 'C', seat: 5 },
      { row: 'C', seat: 6 },
      { row: 'C', seat: 7 },
      { row: 'C', seat: 8 },
      { row: 'C', seat: 9 },
      { row: 'C', seat: 10 },
    ]});
  });

  it('can find 6 seats in row A', () => {
    theatre.allocate({ row: 'A', seat: 1 });
    theatre.allocate({ row: 'B', seat: 2 });

    expect(theatre.firstRowWithAdjacent(6)).toMatchObject({row: 'A'});
  });
});
