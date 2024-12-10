import { z } from 'zod';

export const profileSchema = z.object({
  image: z.string().optional(),
  firstName: z.string().min(3, 'Firstname should be at least 3 characters'),
  lastName: z.string().min(3, 'Lastname should be at least 3 characters'),
  country: z.string().optional(),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  description: z.string().optional(),
});

export type ProfileData = z.infer<typeof profileSchema>;
