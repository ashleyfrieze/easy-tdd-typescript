import {
  Theatre
} from './theatre';

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
});
