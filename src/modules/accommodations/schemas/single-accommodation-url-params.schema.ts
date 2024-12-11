import { z } from 'zod';

export const singleAccommodationUrlParamsSchema = z.object({
  accommodationId: z.string().uuid(),
});

export type SingleAccommodationUrlParams = z.infer<typeof singleAccommodationUrlParamsSchema>;
