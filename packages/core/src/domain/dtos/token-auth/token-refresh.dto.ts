import { z } from 'zod';

export const TokenRefreshDtoSchema = z.object({
  refreshToken: z.string(),
});

export type TokenRefreshDto = z.infer<typeof TokenRefreshDtoSchema>;