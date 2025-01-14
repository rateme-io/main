import { z } from 'zod';
import { UserDtoService } from '@/domain/dtos/entities/user.dto';
import { SessionDtoService } from '@/domain/dtos/entities/session.dto';
import { TokenDtoService } from '@/domain/dtos/token-auth/token.dto';

export const TokenSessionDtoSchema = z.object({
  user: UserDtoService.schema,
  session: SessionDtoService.schema,
  token: TokenDtoService.schema,
});

export type TokenSessionDto = z.infer<typeof TokenSessionDtoSchema>;