import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import RoomIcon from '@mui/icons-material/Room';
import GradeIcon from '@mui/icons-material/Grade';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';
import { type AccommodationAddress } from '#/modules/accommodations/types/accommodation-address.type';
import { CardSkeleton } from '#/modules/accommodations/components/accommodation-card/card-skeleton';
import { readableDate } from '#/shared/utils/readable-date.util';
import { getPriceDetails } from '#/shared/utils/price-calculator';
import { BookingStatus } from '#/modules/bookings/constants/booking-status.constant';
import { useBookingMutation } from '#/modules/bookings/api/cancel-booking.api';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { useTranslation } from 'react-i18next';

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
  actionButtons: { width: '100%', padding: '8px 10px', fontSize: '14px' },
  mainText: { fontSize: '20px', fontWeight: '500', color: '#000', display: 'flex', alignItems: 'center' },
  textStyle: { fontSize: '16px', pX: '0', display: 'flex', alignItems: 'center' },
  iconStyle: { marginRight: '2px', fontSize: '20px' },
  cardTextArea: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px 23px 30px 23px',
  },
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
  const { t } = useTranslation();

  const handleUpdateStatus = (newStatus: BookingStatus) => {
    mutation.mutate(
      { bookingId: id, newStatus },
      {
        onSuccess: () => {
          showSnackbar({
            message: t('snackbars.successUpdatingStatus'),
            variant: 'success',
          });
          onCancel();
        },
        onError: () => {
          showSnackbar({
            message: t('snackbars.errorUpdatingStatus'),
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
              <Typography component="span" sx={{ ...styles.mainText }}>
                <HomeIcon sx={{ marginRight: '2px', color: '#E91E63' }} />
                {name}
              </Typography>
              {address !== null && (
                <Typography sx={styles.textStyle}>
                  <RoomIcon sx={styles.iconStyle} />
                  {t('bookings.address')}: {address.city}, {address.street}
                </Typography>
              )}
              <Typography sx={styles.textStyle}>
                <GradeIcon sx={styles.iconStyle} />
                {t('bookings.rating')}: {rating}
              </Typography>
              <Typography sx={styles.textStyle}>
                <LoginIcon sx={styles.iconStyle} />
                {t('bookings.checkin')}: {readableDate(startDate)}
              </Typography>
              <Typography sx={styles.textStyle}>
                <LogoutIcon sx={styles.iconStyle} />
                {t('bookings.checkout')}: {readableDate(endDate)}
              </Typography>
              <Typography sx={styles.textStyle}>
                <NightsStayIcon sx={styles.iconStyle} />
                {t('bookings.nights')}: {numberOfNights}
              </Typography>
              <Typography sx={styles.textStyle}>
                <AttachMoneyIcon sx={styles.iconStyle} />
                {t('bookings.priceForNights')}: ${totalPriceOfNights}
              </Typography>
              <Typography sx={styles.textStyle}>
                <SellIcon sx={styles.iconStyle} />
                {t('bookings.fee')}: ${serviceFee}
              </Typography>
            </CardContent>

            <Box>
              <Typography sx={{ ...styles.mainText, display: 'flex', mb: '4px', fontSize: '16px' }}>
                {t('bookings.total')}:
                <Typography sx={{ color: '#E91E63', fontSize: '16px', fontWeight: '500', px: '8px' }}>${totalPrice}</Typography>
              </Typography>
              <CardActionArea sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                {[BookingStatus.Pending, BookingStatus.Active].includes(bookingStatus) && (
                  <Link href={`/bookings/${id}/checkout`} sx={{ width: '100%', padding: '0' }}>
                    <Button variant="contained" color="secondary" sx={{ ...styles.actionButtons, marginBottom: '5px' }}>
                      {t('bookings.buttons.pay')}
                    </Button>
                  </Link>
                )}
                {[BookingStatus.Pending, BookingStatus.Active, BookingStatus.Inactive].includes(bookingStatus) && (
                  <Button
                    variant="contained"
                    sx={styles.actionButtons}
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdateStatus(BookingStatus.Canceled);
                    }}
                  >
                    {t('bookings.buttons.cancel')}
                  </Button>
                )}
                {bookingStatus === BookingStatus.Canceled && (
                  <Button
                    variant="contained"
                    sx={{ ...styles.actionButtons, backgroundColor: '#50BE55' }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdateStatus(BookingStatus.Pending);
                    }}
                  >
                    {t('bookings.buttons.recover')}
                  </Button>
                )}
                {bookingStatus === BookingStatus.Completed && (
                  <Link href={`/bookings/${id}/review`} sx={{ width: '100%', padding: '0' }}>
                    <Button variant="contained" color="secondary" sx={{ ...styles.actionButtons, marginBottom: '5px' }}>
                      {t('bookings.buttons.addReview')}
                    </Button>
                  </Link>
                )}
              </CardActionArea>
            </Box>
          </Box>
        </Link>
      )}
    </Card>
  );
}
