import { z } from 'zod';

const envConfigSchema = z.object({
  apiBaseUrl: z.string().url(),
});

const envConfig = envConfigSchema.parse({
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
});

export { envConfig };
