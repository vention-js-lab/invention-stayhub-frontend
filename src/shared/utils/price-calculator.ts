import { calculateDayDiff } from '#/shared/utils/date-utils';
import { SERVICE_FEE_PERCENTAGE } from '../constants/service-fee.constant';

export function getPriceDetails(pricePerNight: number, startDate: string | Date, endDate: string | Date) {
  const numberOfNights = calculateDayDiff(startDate, endDate);
  const totalPriceOfNights = pricePerNight * numberOfNights;
  const serviceFee = Number((totalPriceOfNights * SERVICE_FEE_PERCENTAGE).toFixed(1));
  const totalPrice = totalPriceOfNights + serviceFee;

  return { numberOfNights, totalPriceOfNights, serviceFee, totalPrice };
}
