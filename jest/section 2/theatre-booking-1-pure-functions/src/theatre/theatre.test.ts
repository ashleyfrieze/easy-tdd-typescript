import {
  allocate,
  clearAllBookings,
  countOfBooked,
  isAllocated,
  newTheatreState,
  TheatreState,
} from './theatre';

describe('theatre', () => {
  let theatre: TheatreState;

  beforeEach(() => {
    theatre = newTheatreState();
  });

  it('starts without an allocation to seat A5', () => {
    expect(isAllocated(theatre, { row: 'A', seat: 5 })).toBeFalsy();
  });

  it('will recognise a seat as booked if a booking is added', () => {
    allocate(theatre, { row: 'B', seat: 1 });
    expect(isAllocated(theatre, { row: 'B', seat: 1 })).toBeTruthy();
  });

  it('can detect two seats are booked', () => {
    allocate(theatre, { row: 'B', seat: 1 });
    allocate(theatre, { row: 'B', seat: 2 });

    expect(isAllocated(theatre, { row: 'B', seat: 1 })).toBeTruthy();
    expect(isAllocated(theatre, { row: 'B', seat: 2 })).toBeTruthy();
  });

  it('can count the number of seats booked', () => {
    allocate(theatre, { row: 'B', seat: 1 });
    allocate(theatre, { row: 'B', seat: 2 });
    allocate(theatre, { row: 'B', seat: 3 });

    expect(countOfBooked(theatre)).toBe(3);
  });

  it('can clear all bookings', () => {
    // given an allocation of C0
    allocate(theatre, { row: 'C', seat: 9 });
    expect(isAllocated(theatre, { row: 'C', seat: 9 })).toBeTruthy();

    // when we clear everything
    clearAllBookings(theatre);

    // then C9 and everything else is unallocated
    expect(isAllocated(theatre, { row: 'C', seat: 9 })).toBeFalsy();
    expect(countOfBooked(theatre)).toBe(0);
  });
});
