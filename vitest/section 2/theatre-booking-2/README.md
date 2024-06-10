# Theatre Booking - Model and Errors

We have a theatre with 10 rows - `A - J`, each of which has 10 seats - `1-10`

Starting with an empty booking, we want to be able to mark seats as either booked or unbooked. We want
to be able to find out many seats are booked or are free. We want to find adjacent seats.

The input will be a seat or row reference - e.g. `A/3` or `C`.

## Checklist

### Day 1
- basic types
- Check seat is not allocated
- Add booking for one seat
- Two seat booking
- How many seats are booked?
- Provide a way to clear all bookings

### Extended
- Cannot double allocate a seat
- Model rows and seats
- Cannot assign a seat that does not exist

### Find Seats
- How many spare seats are there on Row G?
- Given a few seats booked, what's the first row with 5 adjacent seats on it?

[LinkTree](https://linktr.ee/ashleyfriezetdd)
[GitHub](https://github.com/ashleyfrieze/easy-tdd-typescript)