import { TokenEntity } from '@rateme/core/domain/entities/session.entity';

import { Repository } from '@/core/repository';

export abstract class TokenAbstractRepository extends Repository<TokenEntity> {
  abstract create(token: TokenEntity): Promise<TokenEntity>;

  abstract update(token: TokenEntity): Promise<TokenEntity>;

  abstract remove(id: string): Promise<void>;

  abstract findById(id: string): Promise<TokenEntity | null>;

  abstract findBySessionId(sessionId: string): Promise<TokenEntity | null>;
}
