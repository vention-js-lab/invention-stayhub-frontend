import { useState, useEffect, useCallback } from 'react';
import { useCheckoutMutation } from '../api/checkout.api';
import { showSnackbar } from '#/shared/utils/custom-snackbar.util';
import { type Booking } from '../types/booking.type';
import { type PriceDetails } from '../types/price-details.type';
import { useTranslation } from 'react-i18next';

export function useCheckoutDetails(bookingId: string) {
  const { t } = useTranslation();
  const [booking, setBooking] = useState<Booking>();
  const [priceDetails, setPriceDetails] = useState<PriceDetails>();
  const [paymentToken, setPaymentToken] = useState('');
  const { mutate } = useCheckoutMutation();

  const fetchCheckoutDetails = useCallback(() => {
    mutate(
      {
        bookingId,
      },
      {
        onSuccess: (data) => {
          setBooking(data.booking);
          setPriceDetails(data.priceDetails);
          setPaymentToken(data.paymentToken);
        },
        onError: () => {
          showSnackbar({
            message: t('snackbars.errorSomething'),
            variant: 'error',
          });
        },
      }
    );
  }, [mutate, bookingId]);

  useEffect(() => {
    fetchCheckoutDetails();
  }, [fetchCheckoutDetails]);

  return { booking, priceDetails, paymentToken };
}
