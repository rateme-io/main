import { Repository } from '@/core/repository';
import { TokenEntity } from '@rateme/core/domain/entities/session.entity';

export abstract class TokenAbstractRepository extends Repository<TokenEntity> {
  abstract create(token: TokenEntity): Promise<TokenEntity>;

  abstract remove(id: string): Promise<void>;

  abstract findById(id: string): Promise<TokenEntity | null>;

  abstract findByAccessToken(token: string): Promise<TokenEntity | null>;

  abstract findByRefreshToken(token: string): Promise<TokenEntity | null>;
}
