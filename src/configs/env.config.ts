import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url().min(1, 'VITE_API_BASE_URL is required'),
  VITE_STRIPE_PUBLISHABLE_KEY: z.string().min(1, 'VITE_STRIPE_PUBLIC_KEY is required'),
  VITE_GOOGLE_MAP_APIKEY: z.string().min(1, 'VITE_GOOGLE_MAP_APIKEY is required'),
  VITE_GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  throw new Error(`Env validation failed: invalid environment variables`);
}

export const validatedEnv = parsedEnv.data;
