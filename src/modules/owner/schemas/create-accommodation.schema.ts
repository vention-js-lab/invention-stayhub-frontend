import { z } from 'zod';
import { time } from '#/shared/libs/time.lib';
import { amenitySchema } from './accommodation-amenity.schema';
import { addressSchema } from './accommodation-address.schema';

export const createAccommodationSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  coverImage: z.string().default(''),
  price: z.number().positive('Price must be a positive number'),
  available: z.boolean({ required_error: 'Availability status is required' }),
  availableFrom: z
    .string()
    .nullable()
    .transform((value) => (value ? time(value).format('YYYY-MM-DD') : null)),
  availableTo: z
    .string()
    .nullable()
    .transform((value) => (value ? time(value).format('YYYY-MM-DD') : null)),
  squareMeters: z.number().positive('Square meters must be a positive number'),
  numberOfRooms: z.number().positive('Number of rooms must be a positive number'),
  allowedNumberOfPeople: z.number().positive('Allowed people must be a positive number'),
  images: z.array(z.object({ url: z.string().url('Image must have a valid URL') })).optional(),
  amenity: amenitySchema.optional(),
  address: addressSchema.optional(),
});

export type CreateAccommodation = z.infer<typeof createAccommodationSchema>;
