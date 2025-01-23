import { z } from 'zod';

import { SessionEntity } from '@/domain/entities/session.entity';

export type SessionDto = z.infer<typeof SessionDtoService.schema>;

export class SessionDtoService {
  static schema = z.object({
    id: z.string(),
    sessionId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

  static mapToDto(session: SessionEntity): SessionDto {
    return SessionDtoService.schema.parse({
      id: session.id,
      sessionId: session.sessionId,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    });
  }
}
