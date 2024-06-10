# Theatre Booking - as Pure Functions

We have a theatre with 10 rows - `A - J`, each of which has 10 seats - `1-10`

Starting with an empty booking, we want to be able to mark seats as either booked or unbooked. We want
to be able to find out many seats are booked or are free. We want to find adjacent seats.

The input will be a seat or row reference - e.g. `A/3` or `C`.

## Checklist

- basic types
- Check seat is not allocated
- Add booking for one seat
- Two seat booking
- How many seats are booked?
- Provide a way to clear all bookings
