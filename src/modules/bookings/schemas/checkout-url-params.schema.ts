import { z } from 'zod';

export const checkoutUrlParamsSchema = z.object({
  bookingId: z.string().uuid(),
});

export type CheckoutUrlParams = z.infer<typeof checkoutUrlParamsSchema>;
