import { z } from 'zod';
import { isJwt } from '../utils/validate-jwt.util';

export const currentUserSchema = z.object({
  accessToken: z.string().refine((token) => isJwt(token)),
  refreshToken: z.string().refine((token) => isJwt(token)),
});

export type CurrentUser = z.infer<typeof currentUserSchema>;
