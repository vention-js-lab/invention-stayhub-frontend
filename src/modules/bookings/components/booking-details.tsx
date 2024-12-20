import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CardMedia from '@mui/material/CardMedia';
import { readableDate } from '#/shared/utils/readable-date.util';
import { type Booking } from '../types/booking.type';
import { type PriceDetails } from '../types/price-details.type';
import { useTranslation } from 'react-i18next';

const styles = {
  container: {
    backgroundColor: '#f4f4f4',
    borderRadius: 4,
    padding: 3,
    maxWidth: 400,
    minWidth: 300,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4,
  },
  image: {
    minWidth: 100,
    minHeight: 100,
    maxWidth: 100,
    maxHeight: 100,
    borderRadius: 4,
    marginRight: 1,
  },
};

interface BookingDetailsProps {
  booking: Booking;
  priceDetails: PriceDetails;
}

export function BookingDetails({ booking, priceDetails }: BookingDetailsProps) {
  const { t } = useTranslation();

  return (
    <Stack direction="column" sx={styles.container}>
      <Box sx={styles.card}>
        <CardMedia component="img" image={booking.accommodation.coverImage || ''} sx={styles.image} />
        <Box>
          <Typography fontWeight="bold">{booking.accommodation.name}</Typography>
          <Typography>{booking.accommodation.description}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={styles.row}>
        <Typography>{t('bookings.checkin')}</Typography>
        <Typography>{readableDate(booking.startDate)}</Typography>
      </Box>
      <Box sx={styles.row}>
        <Typography>{t('bookings.checkout')}</Typography>
        <Typography>{readableDate(booking.endDate)}</Typography>
      </Box>
      <Divider />
      <Typography fontSize={20} fontWeight="bold">
        {t('bookings.priceDetails')}
      </Typography>
      <Box sx={styles.row}>
        <Typography>
          ${booking.accommodation.price} x {priceDetails.numberOfNights} {t('bookings.nights').toLowerCase()}
        </Typography>
        <Typography>${priceDetails.totalPriceOfNights.toFixed(2)}</Typography>
      </Box>
      <Box sx={styles.row}>
        <Typography>{t('bookings.fee')}</Typography>
        <Typography>${priceDetails.serviceFee.toFixed(2)}</Typography>
      </Box>
      <Divider />
      <Box sx={styles.row}>
        <Typography fontWeight="bold">{t('bookings.total')}</Typography>
        <Typography fontWeight="bold">${priceDetails.totalPrice.toFixed(2)}</Typography>
      </Box>
    </Stack>
  );
}
