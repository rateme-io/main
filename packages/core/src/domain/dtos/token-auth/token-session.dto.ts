import { z } from 'zod';

import { SessionDtoService } from '@/domain/dtos/entities/session.dto';
import { UserDtoService } from '@/domain/dtos/entities/user.dto';

export const TokenSessionDtoSchema = z.object({
  user: UserDtoService.schema,
  session: SessionDtoService.schema,
});

export type TokenSessionDto = z.infer<typeof TokenSessionDtoSchema>;
