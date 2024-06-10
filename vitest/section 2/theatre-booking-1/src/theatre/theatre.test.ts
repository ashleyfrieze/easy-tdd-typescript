import { allocate, countOfBooked, isAllocated } from './theatre';

describe('theatre', () => {
  it('starts without an allocation to seat A5', () => {
    expect(isAllocated({ row: 'A', seat: 5 })).toBeFalsy();
  });

  it('will recognise a seat as booked if a booking is added', () => {
    allocate({ row: 'B', seat: 1 });
    expect(isAllocated({ row: 'B', seat: 1 })).toBeTruthy();
  });

  it('can detect two seats are booked', () => {
    allocate({ row: 'B', seat: 1 });
    allocate({ row: 'B', seat: 2 });

    expect(isAllocated({ row: 'B', seat: 1 })).toBeTruthy();
    expect(isAllocated({ row: 'B', seat: 2 })).toBeTruthy();
  });

  it('can count the number of seats booked', () => {
    allocate({ row: 'B', seat: 1 });
    allocate({ row: 'B', seat: 2 });
    allocate({ row: 'B', seat: 3 });

    expect(countOfBooked()).toBe(3);
  });
});
