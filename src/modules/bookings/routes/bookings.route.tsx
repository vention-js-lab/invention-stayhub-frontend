import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Bookings } from '../components/booking-list';
import { BookingsNavbar } from '../components/bookings-navbar';
import { useState } from 'react';
import { BookingStatus } from '../constants/booking-status.constant';

const styles = {
  header: {
    marginTop: '16px',
    marginBottom: '16px',
    fontWeight: 'bold',
    fontSize: '28px',
    color: '#333',
  },
};

export function BookingsRoute() {
  const [selectedCategory, setSelectedCategory] = useState<BookingStatus>(BookingStatus.Pending);

  return (
    <Box>
      <Typography sx={styles.header}>Bookings</Typography>
      <BookingsNavbar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      <Bookings selectedCategory={selectedCategory} />
    </Box>
  );
}
