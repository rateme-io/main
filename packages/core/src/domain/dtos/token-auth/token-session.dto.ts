import { z } from 'zod';
import { UserDtoService } from '@/domain/dtos/entities/user.dto';
import { SessionDtoService } from '@/domain/dtos/entities/session.dto';

export const TokenSessionDtoSchema = z.object({
  user: UserDtoService.schema,
  session: SessionDtoService.schema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type TokenSessionDto = z.infer<typeof TokenSessionDtoSchema>;