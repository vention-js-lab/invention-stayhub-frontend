import { time } from '#/shared/libs/time.lib';

interface CalculateTotalArgs {
  checkIn: string | null;
  checkOut: string | null;
  pricePerNight: number;
  cleaningFee: number;
  serviceFee: number;
}
export function calculateTotal({ checkIn, checkOut, cleaningFee, pricePerNight, serviceFee }: CalculateTotalArgs): number {
  if (!checkIn || !checkOut) {
    return 0;
  }

  const start = time(checkIn).toDate();
  const end = time(checkOut).toDate();
  const nights = Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return nights * pricePerNight + cleaningFee + serviceFee;
}

export function calculateNights(checkIn: string | null, checkOut: string | null) {
  if (!checkIn || !checkOut) {
    return 0;
  }

  const start = time(checkIn).toDate();
  const end = time(checkOut).toDate();

  return Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

interface ValidateDatesArgs {
  checkIn: string | null;
  checkOut: string | null;
  availableFrom: string | null;
  availableTo: string | null;
}
export const validateDates = ({ checkIn, checkOut, availableFrom, availableTo }: ValidateDatesArgs): boolean => {
  if (!checkIn || !checkOut) {
    return false;
  }

  const start = time(checkIn).toDate();
  const end = time(checkOut).toDate();
  const availableStart = time(availableFrom).toDate();
  const availableEnd = time(availableTo).toDate();

  return start >= availableStart && end <= availableEnd && start < end;
};
