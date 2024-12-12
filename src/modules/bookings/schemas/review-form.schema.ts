import { z } from 'zod';

export const reviewFormDataSchema = z.object({
  content: z.string().nullable().optional(),
  rating: z.number().min(1, 'Rating required'),
});

export type ReviewFormData = z.infer<typeof reviewFormDataSchema>;
