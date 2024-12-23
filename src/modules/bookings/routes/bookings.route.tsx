import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Bookings } from '../components/booking-list';
import { BookingsNavbar } from '../components/bookings-navbar';
import { useState } from 'react';
import { BookingStatus } from '../constants/booking-status.constant';
import { useTranslation } from 'react-i18next';

const styles = {
  header: {
    marginY: '16px',
    fontWeight: 'bold',
    fontSize: '28px',
    color: '#333',
    '@media (max-width: 540px)': {
      marginY: '2px',
      textAlign: 'center',
    },
  },
};

export function BookingsRoute() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<BookingStatus>(BookingStatus.Pending);

  return (
    <Box>
      <Typography sx={styles.header}>{t('bookings.name')}</Typography>
      <BookingsNavbar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      <Bookings selectedCategory={selectedCategory} />
    </Box>
  );
}
