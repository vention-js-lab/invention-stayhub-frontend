import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTheme } from '@mui/material/styles';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { useCreateBookingMutation } from '../api/create-booking.api';
import { useAuthGuardAction } from '#/shared/hooks/auth-guard-action.hook';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { time } from '../utils/time';
import { validateDates, isDateUnavailable } from '../utils/reservation-dates.util';
import { getPriceDetails } from '../../../shared/utils/price-calculator';

interface ReservationCardProps {
  pricePerNight: number;
  maxGuests: number | null;
  availableFrom: string | null;
  availableTo: string | null;
  accommodationId: string;
  bookings: { startDate: string; endDate: string }[];
}

// eslint-disable-next-line complexity
export function ReservationCard({
  pricePerNight,
  maxGuests,
  availableFrom,
  availableTo,
  accommodationId,
  bookings = [],
}: ReservationCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [nights, setNights] = useState<number>(0);
  const [calculatedServiceFee, setCalculatedServiceFee] = useState<number>(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const createBookingMutation = useCreateBookingMutation();
  const authGuardAction = useAuthGuardAction();

  const calculateDetails = useCallback(() => {
    if (checkIn && checkOut) {
      const isValid = validateDates({
        checkIn,
        checkOut,
        availableFrom: availableFrom || '',
        availableTo: availableTo || '',
      });

      if (isValid) {
        const { numberOfNights, serviceFee: calculatedFee, totalPrice } = getPriceDetails(pricePerNight, checkIn, checkOut);

        const hasConflict =
          isDateUnavailable({ date: time(checkIn), bookings }) || isDateUnavailable({ date: time(checkOut), bookings });

        setNights(numberOfNights);
        setCalculatedServiceFee(calculatedFee);
        setTotal(Number(totalPrice));
        setIsButtonEnabled(!hasConflict);
      } else {
        setIsButtonEnabled(false);
      }
    } else {
      setIsButtonEnabled(false);
    }
  }, [checkIn, checkOut, pricePerNight, availableFrom, availableTo, bookings]);

  useEffect(() => {
    calculateDetails();
  }, [calculateDetails]);

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      showSnackbar({ message: t('snackbars.warningValidDates'), variant: 'warning' });
      return;
    }

    if (isDateUnavailable({ date: time(checkIn), bookings }) || isDateUnavailable({ date: time(checkOut), bookings })) {
      showSnackbar({ message: t('snackbars.warningUnavailableDates'), variant: 'warning' });
      return;
    }

    const bookingPayload = {
      accommodationId,
      startDate: checkIn,
      endDate: checkOut,
      guests,
    };

    createBookingMutation.mutate(bookingPayload, {
      onSuccess: () => {
        showSnackbar({ message: t('snackbars.successReservation'), variant: 'success' });
        navigate('/bookings');
      },
      onError: () => {
        showSnackbar({ message: t('snackbars.errorCreateBooking'), variant: 'error' });
      },
    });
  };

  const handleClick = () => {
    authGuardAction(handleReserve);
  };

  const generateGuestOptions = (maxGuestsCount: number | null): JSX.Element[] => {
    return Array.from({ length: maxGuestsCount || 1 }, (_, i) => i + 1).map((num) => (
      <MenuItem key={num} value={num}>
        {num} {t('singleAccommodation.guests')}
      </MenuItem>
    ));
  };

  const styles = {
    container: (isSummaryVisible: boolean) => ({
      border: `1px solid ${theme.palette.action.disabled}`,
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '400px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      height: isSummaryVisible ? 'auto' : '230px',
      maxHeight: '400px',
      overflow: 'hidden',
      transition: 'height 0.3s ease, max-height 0.3s ease',
      [theme.breakpoints.down('sm')]: {
        padding: '12px',
        maxWidth: '100%',
        boxShadow: 'none',
        height: 'auto',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        maxWidth: '100%',
      },
    }),
    dateSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: { xs: 'flex-start', sm: 'center' },
      marginBottom: '16px',
      gap: '8px',
      flexDirection: { xs: 'column', sm: 'row' },
    },
    dateBox: {
      flex: 1,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '50%',
      },
      marginBottom: { xs: '0', md: '5px' },
      marginTop: { xs: '0', md: '5px' },
    },
    guestsField: {
      marginBottom: { xs: '12px', sm: '16px' },
    },
    reserveButton: {
      backgroundColor: isButtonEnabled ? theme.palette.secondary.main : theme.palette.action.disabled,
      color: isButtonEnabled ? '#fff' : theme.palette.action.disabled,
      fontWeight: 'bold',
      padding: { xs: '10px 0', sm: '12px 0' },
      textTransform: 'none',
      fontSize: { xs: '14px', sm: '16px' },
      marginBottom: '16px',
    },
    summaryText: {
      textAlign: 'center',
      marginTop: '16px',
      fontSize: { xs: '14px', sm: '16px' },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={styles.container(Boolean(checkIn) && Boolean(checkOut))}>
        <Box sx={styles.dateSection}>
          <Box sx={styles.dateBox}>
            <DatePicker
              label={t('filterArea.checkin')}
              value={checkIn ? time(checkIn) : null}
              onChange={(newValue) => setCheckIn(newValue?.format('YYYY-MM-DD') || null)}
              disablePast={true}
              minDate={availableFrom ? time(availableFrom) : time()}
              maxDate={availableTo ? time(availableTo) : undefined}
              shouldDisableDate={(date) => isDateUnavailable({ date, bookings })}
            />
          </Box>
          <Box sx={styles.dateBox}>
            <DatePicker
              label={t('filterArea.checkout')}
              value={checkOut ? time(checkOut) : null}
              onChange={(newValue) => setCheckOut(newValue?.format('YYYY-MM-DD') || null)}
              disablePast={true}
              minDate={checkIn ? time(checkIn) : time()}
              maxDate={availableTo ? time(availableTo) : undefined}
              shouldDisableDate={(date) => isDateUnavailable({ date, bookings })}
            />
          </Box>
        </Box>

        <TextField
          label="Guests"
          select={true}
          fullWidth={true}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          sx={styles.guestsField}
        >
          {generateGuestOptions(maxGuests)}
        </TextField>

        <Button variant="contained" fullWidth={true} sx={styles.reserveButton} disabled={!isButtonEnabled} onClick={handleClick}>
          {t('reservation.reserve')}
        </Button>

        {Boolean(checkIn) && Boolean(checkOut) && (
          <Typography variant="body2" sx={styles.summaryText}>
            <Box display="flex" justifyContent="space-between" marginBottom="8px">
              <Typography variant="body1">
                ${pricePerNight} x {nights} {nights > 1 ? 'nights' : 'night'}
              </Typography>
              <Typography variant="body1">${pricePerNight * nights}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" marginBottom="8px">
              <Typography variant="body1">{t('Service Fee')}</Typography>
              <Typography variant="body1">${calculatedServiceFee}</Typography>
            </Box>
            <Box marginTop="16px" borderTop="1px solid #ddd" paddingTop="8px" display="flex" justifyContent="space-between">
              <Typography variant="h6" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                ${total}
              </Typography>
            </Box>
          </Typography>
        )}
      </Box>
    </LocalizationProvider>
  );
}
