import { useMutation } from '@tanstack/react-query';
import { apiClient } from '#/shared/libs/api-client.lib';
import { type BaseResponse } from '#/shared/types/base-response.type';
import { type Booking } from '../types/booking.type';
import { type PriceDetails } from '../types/price-details.type';

export function useCheckoutMutation() {
  const checkoutMutation = useMutation({
    mutationFn: getCheckoutDetails,
  });

  return checkoutMutation;
}

interface CheckoutMutationData {
  bookingId: string;
}

interface CheckoutResponseData {
  booking: Booking;
  priceDetails: PriceDetails;
  paymentToken: string;
}

async function getCheckoutDetails(data: CheckoutMutationData) {
  const response = await apiClient.post<BaseResponse<CheckoutResponseData>>('/payments/checkout', data);
  return response.data.data;
}
