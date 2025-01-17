import { z } from 'zod';
import { UserDtoService } from '@/domain/dtos/entities/user.dto';
import { SessionDtoService } from '@/domain/dtos/entities/session.dto';

export const TokenSessionDtoSchema = z.object({
  user: UserDtoService.schema,
  session: SessionDtoService.schema,
});

export type TokenSessionDto = z.infer<typeof TokenSessionDtoSchema>;