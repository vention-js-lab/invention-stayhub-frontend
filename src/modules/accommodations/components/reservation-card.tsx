import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { getTodayDate } from '#/shared/utils/date-utils';
import { calculateTotal, calculateNights, validateDates } from '#/modules/accommodations/utils/reservation-dates.util';
import { type AppTheme } from '#/styles';

interface ReservationCardProps {
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  maxGuests: number | null;
  availableFrom: string | null;
  availableTo: string | null;
}

const styles = {
  cardContainer: (theme: AppTheme) => ({
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '400px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  }),
  button: (theme: AppTheme, isEnabled: boolean) => ({
    backgroundColor: isEnabled ? theme.palette.secondary.main : theme.palette.action.disabled,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '16px',
    height: '56px',
    '&:hover': {
      backgroundColor: isEnabled ? theme.palette.secondary.dark : theme.palette.action.disabled,
    },
  }),
  textField: {
    flex: 1,
  },
  section: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  headingPrice: {
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  guestsDropdown: {
    marginBottom: '16px',
  },
  notChargedText: (theme: AppTheme) => ({
    textAlign: 'center',
    color: theme.palette.grey[600],
    marginBottom: '16px',
  }),
  divider: {
    marginBottom: '16px',
  },
  totalText: {
    fontWeight: 'bold',
  },
};

export function ReservationCard({
  pricePerNight,
  cleaningFee,
  serviceFee,
  maxGuests,
  availableFrom,
  availableTo,
}: ReservationCardProps) {
  const theme = useTheme();
  const todayDate = getTodayDate();

  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [guests, setGuests] = useState<number>(1);

  const isReserveEnabled = validateDates({
    availableFrom: availableFrom,
    availableTo: availableTo,
    checkIn: checkIn,
    checkOut: checkOut,
  });
  const calculateTotalPrice = calculateTotal({
    checkIn: checkIn,
    checkOut: checkOut,
    pricePerNight,
    cleaningFee,
    serviceFee,
  });
  const maxGuestsArray = Array.from({ length: maxGuests ?? 0 }, (_, i) => {
    return {
      key: i + 1,
      value: i === 0 ? 'guest' : 'guests',
    };
  });
  const pricePerNights = calculateNights(checkIn, checkOut);

  function handleReserve() {
    alert('Reservation confirmed!');
  }

  return (
    <Box sx={styles.cardContainer}>
      <Typography variant="h6" sx={styles.headingPrice}>
        ${pricePerNight} <span style={{ fontWeight: 'normal' }}>night</span>
      </Typography>
      <Box sx={styles.flexBox}>
        <TextField
          label="Check-In"
          type="date"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            htmlInput: {
              min: todayDate,
              max: availableTo,
            },
          }}
          value={checkIn ?? ''}
          onChange={(e) => setCheckIn(e.target.value)}
          sx={{ ...styles.textField, marginRight: '8px' }}
        />
        <TextField
          label="Check-Out"
          type="date"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            htmlInput: {
              min: checkIn ?? todayDate,
              max: availableTo,
            },
          }}
          value={checkOut ?? ''}
          onChange={(e) => setCheckOut(e.target.value)}
          sx={styles.textField}
        />
      </Box>
      <TextField
        label="Guests"
        select={true}
        fullWidth={true}
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        sx={styles.guestsDropdown}
      >
        {maxGuestsArray.map((guest) => (
          <MenuItem key={guest.key} value={guest.key}>
            {guest.key} {guest.value}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        fullWidth={true}
        disabled={!isReserveEnabled}
        sx={styles.button(theme, isReserveEnabled)}
        onClick={handleReserve}
      >
        Reserve
      </Button>
      <Typography variant="body2" sx={styles.notChargedText}>
        You won’t be charged yet
      </Typography>
      <Divider sx={styles.divider} />
      <Box sx={styles.section}>
        <Typography variant="body1">
          ${pricePerNight} x {pricePerNights} nights
        </Typography>
        <Typography variant="body1">${pricePerNight * pricePerNights}</Typography>
      </Box>
      <Box sx={styles.section}>
        <Typography variant="body1">Cleaning fee</Typography>
        <Typography variant="body1">${cleaningFee}</Typography>
      </Box>
      <Box sx={styles.section}>
        <Typography variant="body1">Service fee</Typography>
        <Typography variant="body1">${serviceFee}</Typography>
      </Box>
      <Divider sx={styles.divider} />
      <Box sx={styles.section}>
        <Typography variant="h6" sx={styles.totalText}>
          Total before taxes
        </Typography>
        <Typography variant="h6" sx={styles.totalText}>
          ${calculateTotalPrice}
        </Typography>
      </Box>
    </Box>
  );
}
