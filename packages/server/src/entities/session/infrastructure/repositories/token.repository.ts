import { TokenAbstractRepository } from '@/entities/session/domain';
import { TokenRepositoryEntity } from '@/entities/session/infrastructure';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from '@rateme/core/domain/entities/session.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenRepository extends TokenAbstractRepository {
  constructor(
    @InjectRepository(TokenRepositoryEntity)
    private readonly tokenEntity: Repository<TokenRepositoryEntity>,
  ) {
    super();
  }

  async findByAccessToken(token: string): Promise<TokenEntity | null> {
    const tokenEntity = await this.tokenEntity.findOneBy({
      accessToken: token,
    });

    if (!tokenEntity) {
      return null;
    }

    return this.toDomain(tokenEntity);
  }

  async create(accessToken: TokenEntity): Promise<TokenEntity> {
    const newTokenEntity = await this.tokenEntity.save(
      this.toPersistence(accessToken),
    );

    return this.toDomain(newTokenEntity);
  }

  async remove(id: string): Promise<void> {
    await this.tokenEntity.delete(id);
  }

  async findById(id: string): Promise<TokenEntity | null> {
    const tokenEntity = await this.tokenEntity.findOneBy({ id });

    if (!tokenEntity) {
      return null;
    }

    return this.toDomain(tokenEntity);
  }

  async findByRefreshToken(token: string): Promise<TokenEntity | null> {
    const tokenEntity = await this.tokenEntity.findOneBy({
      refreshToken: token,
    });

    if (!tokenEntity) {
      return null;
    }

    return this.toDomain(tokenEntity);
  }

  toDomain(entity: TokenRepositoryEntity): TokenEntity {
    const accessToken = new TokenEntity();

    accessToken.id = entity.id;
    accessToken.accessToken = entity.accessToken;
    accessToken.refreshToken = entity.refreshToken;
    accessToken.expiresAt = entity.expiresAt;

    return accessToken;
  }

  toPersistence(entity: TokenEntity): TokenRepositoryEntity {
    const accessToken = new TokenRepositoryEntity();

    accessToken.id = entity.id;
    accessToken.accessToken = entity.accessToken;
    accessToken.refreshToken = entity.refreshToken;
    accessToken.expiresAt = entity.expiresAt;

    return accessToken;
  }
}
