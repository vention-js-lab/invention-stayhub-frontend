import { z } from 'zod';

export const registerFormDataSchema = z.object({
  firstName: z.string().min(3, 'Full name required'),
  lastName: z.string().min(3, 'Full name required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

export type RegisterFormData = z.infer<typeof registerFormDataSchema>;
