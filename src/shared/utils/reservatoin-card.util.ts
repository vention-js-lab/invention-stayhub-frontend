export const calculateTotal = (
  checkIn: string,
  checkOut: string,
  pricePerNight: number,
  cleaningFee: number,
  serviceFee: number
): number => {
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights * pricePerNight + cleaningFee + serviceFee;
  }
  return 0;
};

export const calculateNights = (checkIn: string, checkOut: string): number => {
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }
  return 0;
};

export const validateDates = (checkIn: string, checkOut: string, availableFrom: string, availableTo: string): boolean => {
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const availableStart = new Date(availableFrom);
    const availableEnd = new Date(availableTo);

    return start >= availableStart && end <= availableEnd && start < end;
  }
  return false;
};
