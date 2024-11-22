import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

interface ReservationCardProps {
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
  maxGuests: number;
  availableFrom: string;
  availableTo: string;
}

const styles = {
  cardContainer: (theme: any) => ({
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '400px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  }),
  button: (theme: any, isEnabled: boolean) => ({
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
};

export const ReservationCard: React.FC<ReservationCardProps> = ({
  pricePerNight,
  cleaningFee,
  serviceFee,
  maxGuests,
  availableFrom,
  availableTo,
}) => {
  const theme = useTheme();

  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(1);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const calculateTotal = (): number => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return nights * pricePerNight + cleaningFee + serviceFee;
    }
    return 0;
  };

  const calculateNights = (): number => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      return Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const validateDates = (): boolean => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const availableStart = new Date(availableFrom);
      const availableEnd = new Date(availableTo);

      return start >= availableStart && end <= availableEnd && start < end;
    }
    return false;
  };

  useEffect(() => {
    setIsButtonEnabled(validateDates());
  }, [checkIn, checkOut]);

  const todayDate = getTodayDate();

  return (
    <Box sx={styles.cardContainer(theme)}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
        ${pricePerNight} <span style={{ fontWeight: 'normal' }}>night</span>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <TextField
          label="Check-In"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          inputProps={{
            min: todayDate,
            max: availableTo,
          }}
          sx={{ ...styles.textField, marginRight: '8px' }}
        />
        <TextField
          label="Check-Out"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          inputProps={{
            min: checkIn || todayDate,
            max: availableTo,
          }}
          sx={styles.textField}
        />
      </Box>
      <TextField
        label="Guests"
        select
        fullWidth
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        sx={{ marginBottom: '16px' }}
      >
        {Array.from({ length: maxGuests }, (_, i) => i + 1).map((number) => (
          <MenuItem key={number} value={number}>
            {number} {number === 1 ? 'guest' : 'guests'}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        fullWidth
        disabled={!isButtonEnabled}
        sx={styles.button(theme, isButtonEnabled)}
        onClick={() => alert('Reservation confirmed!')}
      >
        Reserve
      </Button>
      <Typography variant="body2" sx={{ textAlign: 'center', color: theme.palette.grey[600], marginBottom: '16px' }}>
        You won’t be charged yet
      </Typography>
      <Divider sx={{ marginBottom: '16px' }} />
      <Box sx={styles.section}>
        <Typography variant="body1">
          ${pricePerNight} x {calculateNights()} nights
        </Typography>
        <Typography variant="body1">${pricePerNight * calculateNights()}</Typography>
      </Box>
      <Box sx={styles.section}>
        <Typography variant="body1">Cleaning fee</Typography>
        <Typography variant="body1">${cleaningFee}</Typography>
      </Box>
      <Box sx={styles.section}>
        <Typography variant="body1">Service fee</Typography>
        <Typography variant="body1">${serviceFee}</Typography>
      </Box>
      <Divider sx={{ marginBottom: '16px' }} />
      <Box sx={styles.section}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Total before taxes
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          ${calculateTotal()}
        </Typography>
      </Box>
    </Box>
  );
};
