import { z } from 'zod';

export const addressSchema = z.object({
  street: z.string().min(3, 'Street name is required'),
  city: z.string().min(3, 'City name is required'),
  country: z.string().min(3, 'Country name is required'),
  zipCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type CreateAccommodationAddress = z.infer<typeof addressSchema>;
