import { useState, useEffect } from 'react';
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
import { time } from '../utils/time';
import { isDateUnavailable } from '../utils/reservation-dates.util';
import { useCreateBookingMutation } from '../api/create-booking.api';
import { useAuthGuardAction } from '#/shared/hooks/auth-guard-action.hook';
import { useTranslation } from 'react-i18next';

interface ReservationCardProps {
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  maxGuests: number | null;
  availableFrom: string | null;
  availableTo: string | null;
  accommodationId: string;
  bookings: { startDate: string; endDate: string }[];
}

export function ReservationCard({
  pricePerNight,
  cleaningFee,
  serviceFee,
  maxGuests,
  availableFrom,
  availableTo,
  accommodationId,
  bookings = [],
}: ReservationCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [checkIn, setCheckIn] = useState<ReturnType<typeof time> | null>(null);
  const [checkOut, setCheckOut] = useState<ReturnType<typeof time> | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const createBookingMutation = useCreateBookingMutation();
  const todayDate = time();
  const authGuardAction = useAuthGuardAction();

  useEffect(() => {
    if (checkIn && checkOut) {
      const nights = checkOut.diff(checkIn, 'day');
      const totalCost = nights * pricePerNight + cleaningFee + serviceFee;

      const hasConflict = isDateUnavailable({ date: checkIn, bookings }) || isDateUnavailable({ date: checkOut, bookings });

      setTotal(totalCost);
      setIsButtonEnabled(nights > 0 && !hasConflict);
    } else {
      setIsButtonEnabled(false);
    }
  }, [checkIn, checkOut, pricePerNight, cleaningFee, serviceFee, bookings]);

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      showSnackbar({ message: t('snackbars.warningValidDates'), variant: 'warning' });
      return;
    }

    if (isDateUnavailable({ date: checkIn, bookings }) || isDateUnavailable({ date: checkOut, bookings })) {
      showSnackbar({ message: t('snackbars.warningUnavailableDates'), variant: 'warning' });
      return;
    }

    const bookingPayload = {
      accommodationId,
      startDate: checkIn.format('YYYY-MM-DD'),
      endDate: checkOut.format('YYYY-MM-DD'),
      guests,
    };

    createBookingMutation.mutate(bookingPayload, {
      onSuccess: () => {
        showSnackbar({ message: t('snackbars.successReservation'), variant: 'success' });
      },
      onError: () => {
        showSnackbar({ message: t('snackbars.errorCreateBooking'), variant: 'error' });
      },
    });
  };

  function handleClick() {
    authGuardAction(handleReserve);
  }

  const generateGuestOptions = (maxGuestsCount: number | null): JSX.Element[] => {
    return Array.from({ length: maxGuestsCount || 1 }, (_, i) => i + 1).map((num) => (
      <MenuItem key={num} value={num}>
        {num} {t('singleAccommodation.guests')}
      </MenuItem>
    ));
  };

  const styles = {
    container: {
      border: `1px solid ${theme.palette.action.disabled}`,
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '400px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    priceHeading: {
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    priceText: {
      color: theme.palette.action.disabled,
      marginBottom: '16px',
    },
    section: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    dateBox: {
      flex: 1,
      marginRight: '8px',
    },
    guestsField: {
      marginBottom: '16px',
    },
    reserveButton: {
      backgroundColor: isButtonEnabled ? theme.palette.secondary.main : theme.palette.action.disabled,
      color: isButtonEnabled ? '#fff' : theme.palette.action.disabled,
      fontWeight: 'bold',
      padding: '12px 0',
      textTransform: 'none',
      fontSize: '16px',
      marginBottom: '16px',
    },
    bottomText: {
      textAlign: 'center',
      color: theme.palette.action.disabled,
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={styles.container}>
        <Typography variant="h5" sx={styles.priceHeading}>
          ${total || pricePerNight}
        </Typography>
        <Typography variant="body2" sx={styles.priceText}>
          {t('reservation.total')}
        </Typography>

        <Box sx={styles.section}>
          <Box sx={styles.dateBox}>
            <DatePicker
              label={t('filterArea.checkin')}
              value={checkIn}
              onChange={(newValue) => setCheckIn(newValue)}
              disablePast={true}
              minDate={availableFrom ? time(availableFrom) : todayDate}
              maxDate={availableTo ? time(availableTo) : undefined}
              shouldDisableDate={(date) => isDateUnavailable({ date, bookings })}
              slotProps={{
                day: ({ day }: { day: ReturnType<typeof time> }) => ({
                  sx: isDateUnavailable({ date: day, bookings })
                    ? { textDecoration: 'line-through', color: theme.palette.error.main }
                    : {},
                }),
              }}
            />
          </Box>
          <Box sx={styles.dateBox}>
            <DatePicker
              label={t('filterArea.checkout')}
              value={checkOut}
              onChange={(newValue) => setCheckOut(newValue)}
              disablePast={true}
              minDate={checkIn || todayDate}
              maxDate={availableTo ? time(availableTo) : undefined}
              shouldDisableDate={(date) => isDateUnavailable({ date, bookings })}
              slotProps={{
                day: ({ day }: { day: ReturnType<typeof time> }) => ({
                  sx: isDateUnavailable({ date: day, bookings })
                    ? { textDecoration: 'line-through', color: theme.palette.error.main }
                    : {},
                }),
              }}
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

        <Typography variant="body2" sx={styles.bottomText}>
          {t('reservation.info')}
        </Typography>
      </Box>
    </LocalizationProvider>
  );
}
