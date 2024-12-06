import { time } from './time';

interface CalculateTotalParams {
  checkIn: string;
  checkOut: string;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
}

export const calculateTotal = ({ checkIn, checkOut, pricePerNight, cleaningFee, serviceFee }: CalculateTotalParams): number => {
  if (checkIn && checkOut) {
    const start = time(checkIn);
    const end = time(checkOut);
    const nights = Math.max(0, end.diff(start, 'day'));
    return nights * pricePerNight + cleaningFee + serviceFee;
  }
  return 0;
};

interface ValidateDatesParams {
  checkIn: string;
  checkOut: string;
  availableFrom: string;
  availableTo: string;
}

export const validateDates = ({ checkIn, checkOut, availableFrom, availableTo }: ValidateDatesParams): boolean => {
  if (checkIn && checkOut) {
    const start = time(checkIn);
    const end = time(checkOut);
    const availableStart = time(availableFrom);
    const availableEnd = time(availableTo);

    return start.isSameOrAfter(availableStart) && end.isSameOrBefore(availableEnd) && start.isBefore(end);
  }
  return false;
};

interface IsDateUnavailableParams {
  date: ReturnType<typeof time>;
  bookings?: { startDate: string; endDate: string }[];
}

export const isDateUnavailable = ({ date, bookings = [] }: IsDateUnavailableParams): boolean => {
  if (bookings.length === 0) {
    return false;
  }

  return bookings.some(({ startDate, endDate }) => date.isBetween(time(startDate), time(endDate), null, '[]'));
};
