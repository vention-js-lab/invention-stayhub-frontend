import Grid2 from '@mui/material/Grid2';
import { useBookingsQuery } from '../api/bookings.api';
import { type BookingStatus } from '../constants/booking-status.constant';
import { type Booking } from '../types/booking.type';

interface BookingsProps {
  selectedCategory: BookingStatus;
}

export function Bookings({ selectedCategory }: BookingsProps) {
  const { data, status } = useBookingsQuery();

  if (status === 'error') {
    return <p>{"Couldn't load data"}</p>;
  }

  const filteredBookings = data?.[selectedCategory] || [];

  return (
    <Grid2 container={true} spacing={3}>
      {filteredBookings.length > 0 ? (
        filteredBookings.map((booking: Booking) => <div key={booking.id}>{JSON.stringify(booking)}</div>)
      ) : (
        <p>No bookings available for this category.</p>
      )}
    </Grid2>
  );
}
