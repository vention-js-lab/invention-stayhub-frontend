import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createBooking } from '../api/booking.api';

dayjs.extend(isBetween);

const styles = {
  container: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '400px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  datePickerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  button: (isButtonEnabled: boolean) => ({
    backgroundColor: isButtonEnabled ? '#FF385C' : '#ddd',
    color: isButtonEnabled ? '#fff' : '#aaa',
    fontWeight: 'bold',
    padding: '12px 0',
    textTransform: 'none',
    fontSize: '16px',
    marginBottom: '16px',
  }),
};

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

const ReservationCard: React.FC<ReservationCardProps> = ({
  pricePerNight,
  cleaningFee,
  serviceFee,
  maxGuests,
  availableTo,
  accommodationId,
  bookings,
}) => {
  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);
  const [guests, setGuests] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  const todayDate = dayjs();

  const isDateUnavailable = (date: Dayjs): boolean => {
    return bookings.some(({ startDate, endDate }) =>
      date.isBetween(dayjs(startDate), dayjs(endDate), null, '[]')
    );
  };

  useEffect(() => {
    if (checkIn && checkOut) {
      const nights = checkOut.diff(checkIn, 'day');
      const totalCost = nights * pricePerNight + cleaningFee + serviceFee;

      const hasConflict = isDateUnavailable(checkIn) || isDateUnavailable(checkOut);

      setTotal(totalCost);
      setIsButtonEnabled(nights > 0 && !hasConflict);
    } else {
      setIsButtonEnabled(false);
    }
  }, [checkIn, checkOut, pricePerNight, cleaningFee, serviceFee]);

  const handleReserve = async () => {
    if (!checkIn || !checkOut) {
      alert('Please select valid dates.');
      return;
    }

    if (isDateUnavailable(checkIn) || isDateUnavailable(checkOut)) {
      alert('The selected dates are unavailable. Please choose different dates.');
      return;
    }

    const bookingPayload = {
      accommodationId,
      startDate: checkIn.toISOString(),
      endDate: checkOut.toISOString(),
      guests,
    };

    try {
      await createBooking(bookingPayload);
      alert('Reservation confirmed!');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={styles.container}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
          ${total || pricePerNight}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', marginBottom: '16px' }}>
          Total before taxes
        </Typography>

        <Box sx={styles.datePickerContainer}>
          <Box sx={{ flex: 1, marginRight: '8px' }}>
            <DatePicker
              label="Check-In"
              value={checkIn}
              onChange={(newValue) => setCheckIn(newValue)}
              disablePast
              minDate={todayDate}
              maxDate={availableTo ? dayjs(availableTo) : undefined}
              shouldDisableDate={isDateUnavailable}
              slotProps={{
                day: ({ day }: { day: Dayjs }) => ({
                  sx: isDateUnavailable(day)
                    ? { textDecoration: 'line-through', color: 'red' }
                    : {},
                }),
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <DatePicker
              label="Check-Out"
              value={checkOut}
              onChange={(newValue) => setCheckOut(newValue)}
              disablePast
              minDate={checkIn || todayDate}
              maxDate={availableTo ? dayjs(availableTo) : undefined}
              shouldDisableDate={isDateUnavailable}
              slotProps={{
                day: ({ day }: { day: Dayjs }) => ({
                  sx: isDateUnavailable(day)
                    ? { textDecoration: 'line-through', color: 'red' }
                    : {},
                }),
              }}
            />
          </Box>
        </Box>

        <TextField
          label="Guests"
          select
          fullWidth
          value={guests}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGuests(Number(e.target.value))}
          sx={{ marginBottom: '16px' }}
        >
          {Array.from({ length: maxGuests || 1 }, (_, i) => i + 1).map((num) => (
            <MenuItem key={num} value={num}>
              {num} {num === 1 ? 'guest' : 'guests'}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          fullWidth
          sx={styles.button(isButtonEnabled)}
          disabled={!isButtonEnabled}
          onClick={handleReserve}
        >
          Reserve
        </Button>

        <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
          You won't be charged yet
        </Typography>
      </Box>
    </LocalizationProvider>
  );
};

export default ReservationCard;
