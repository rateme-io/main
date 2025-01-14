import { z } from 'zod';
import { TokenEntity } from '@/domain/entities/session.entity';

export class TokenDtoService {
  static schema = z.object({
    id: z.string(),
    accessToken: z.string(),
    refreshToken: z.string(),
    accessTokenExpiresAt: z.date(),
    refreshTokenExpiresAt: z.date(),
  });

  static mapToDto(token: TokenEntity): TokenDto {
    return TokenDtoService.schema.parse({
      id: token.id,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    });
  }
}

export type TokenDto = z.infer<typeof TokenDtoService.schema>;

