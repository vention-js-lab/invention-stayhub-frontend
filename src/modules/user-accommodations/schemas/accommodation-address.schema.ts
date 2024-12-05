import { z } from 'zod';

export const addressSchema = z.object({
  street: z.string().min(3, 'Street is required'),
  city: z.string().min(3, 'City is required'),
  country: z.string().min(3, 'Country is required'),
  zipCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});
