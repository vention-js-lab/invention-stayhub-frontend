import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardSkeleton } from '#/modules/accommodations/components/accommodation-card/card-skeleton';
import { type AccommodationAddress } from '#/modules/accommodations/types/accommodation-address.type';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import { readableDate } from '#/shared/utils/readable-date.util';
import { getPriceDetails } from '#/shared/utils/price-calculator';
import { BookingStatus } from '#/modules/bookings/constants/booking-status.constant';
import { useBookingMutation } from '#/modules/bookings/api/cancel-booking.api';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';

interface BookingCardProps {
  id: string;
  status: 'pending' | 'error' | 'success';
  bookingStatus: BookingStatus;
  accommodationId: string;
  address: AccommodationAddress | null;
  image: string | null;
  name: string;
  pricePerNight: number;
  startDate: Date | string;
  endDate: Date | string;
  rating: number;
  onCancel: () => void;
}

const styles = {
  bookingCard: { borderRadius: '15px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.4)', height: '100%' },
  cardPhoto: { width: '100%', maxHeight: '400px', backgroundColor: '#bdbdbd', objectFit: 'cover' },
  cardTextArea: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px 23px 30px 23px',
  },
  textStyle: { fontSize: '16px', pX: '0' },
  actionButtons: { width: '100%', padding: '8px 10px', fontSize: '14px' },

  cardContent: {
    height: '100%',
    display: 'flex',
    padding: '0',
    '@media (max-width: 1535px)': {
      flexDirection: 'column',
    },
    '@media (max-width: 899px)': {
      flexDirection: 'row',
    },
    '@media (max-width: 870px)': {
      flexDirection: 'column',
    },
  },

  notFoundImg: {
    width: '100%',
    height: '100%',
    backgroundColor: '#bdbdbd',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
  },
};

export function BookingCard({
  id,
  status,
  bookingStatus,
  accommodationId,
  address,
  name,
  image,
  pricePerNight,
  startDate,
  endDate,
  rating,
  onCancel,
}: BookingCardProps) {
  const { numberOfNights, totalPriceOfNights, serviceFee, totalPrice } = getPriceDetails(pricePerNight, startDate, endDate);
  const mutation = useBookingMutation();

  const handleUpdateStatus = (newStatus: BookingStatus) => {
    mutation.mutate(
      { bookingId: id, newStatus },
      {
        onSuccess: () => {
          showSnackbar({
            message: `Booking successfully moved to ${newStatus} category`,
            variant: 'success',
          });
          onCancel();
        },
        onError: () => {
          showSnackbar({
            message: 'Error during updating booking status process',
            variant: 'error',
          });
        },
      }
    );
  };

  return (
    <Card sx={styles.bookingCard}>
      {status === 'pending' ? (
        <CardSkeleton />
      ) : (
        <Link href={`/accommodations/${accommodationId}`} sx={styles.cardContent}>
          {image !== null ? (
            <Box component="img" src={image} sx={styles.cardPhoto} />
          ) : (
            <Box sx={styles.notFoundImg}>Image not found</Box>
          )}
          <Box sx={styles.cardTextArea}>
            <CardContent sx={{ padding: '0' }}>
              <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>{name}</Typography>
              {address !== null && (
                <Typography sx={styles.textStyle}>
                  Address: {address.city}, {address.street}
                </Typography>
              )}
              <Typography sx={styles.textStyle}>Rating: {rating}</Typography>
              <Typography sx={styles.textStyle}>Check-in: {readableDate(startDate)}</Typography>
              <Typography sx={styles.textStyle}>Checkout: {readableDate(endDate)}</Typography>
              <Typography sx={styles.textStyle}>Nights: {numberOfNights}</Typography>
              <Typography sx={styles.textStyle}>Price for nights: ${totalPriceOfNights}</Typography>
              <Typography sx={styles.textStyle}>Stayhub fee: ${serviceFee}</Typography>
            </CardContent>

            <CardActionArea sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <Typography sx={{ fontSize: '16px', fontWeight: '500', display: 'flex', mb: '4px' }}>
                Total Price:
                <Typography sx={{ color: '#E91E63', fontSize: '16px', fontWeight: '500', px: '8px' }}>${totalPrice}</Typography>
              </Typography>
              {bookingStatus !== BookingStatus.Canceled ? (
                <>
                  <Link href={`/bookings/${id}/checkout`} sx={{ width: '100%', padding: '0' }}>
                    <Button variant="contained" color="secondary" sx={{ ...styles.actionButtons, marginBottom: '5px' }}>
                      Pay
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    sx={styles.actionButtons}
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdateStatus(BookingStatus.Canceled);
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  sx={{ ...styles.actionButtons, backgroundColor: '#00aa52' }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateStatus(BookingStatus.Pending);
                  }}
                >
                  Recover
                </Button>
              )}
            </CardActionArea>
          </Box>
        </Link>
      )}
    </Card>
  );
}
