import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstname: z.string().min(3, 'Firstname should be at least 3 characters'),
  lastname: z.string().min(3, 'Lastname should be at least 3 characters'),
  country: z.enum(['Uzbekistan', 'USA', 'Russia']),
  phoneNumber: z.string(),
  gender: z.enum(['male', 'female']),
  description: z.string().optional(),
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
