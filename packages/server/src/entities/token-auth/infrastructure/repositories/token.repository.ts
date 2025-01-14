import { SessionAbstractRepository } from '@/entities/session/domain';
import { SessionRepository } from '@/entities/session/infrastructure';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from '@rateme/core/domain/entities/session.entity';
import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { TokenAbstractRepository } from '@/entities/token-auth/domain';
import { TokenRepositoryEntity } from '../entities';

@Injectable()
export class TokenRepository extends TokenAbstractRepository {
  constructor(
    @InjectRepository(TokenRepositoryEntity)
    private readonly tokenEntity: Repository<TokenRepositoryEntity>,
    @Inject(SessionAbstractRepository)
    private readonly sessionRepository: SessionRepository,
  ) {
    super();
  }

  async findByAccessToken(token: string): Promise<TokenEntity | null> {
    const tokenEntity = await this.tokenEntity.findOne({
      where: { accessToken: token },
      relations: ['session', 'session.user'],
    });

    if (!tokenEntity) {
      return null;
    }

    return this.toDomain(tokenEntity);
  }

  async findBySessionId(sessionId: string): Promise<TokenEntity | null> {
    const tokenEntity = await this.tokenEntity.findOne({
      where: {
        session: { id: sessionId },
      },
      relations: ['session', 'session.user'],
    });

    if (!tokenEntity) {
      return null;
    }

    return this.toDomain(tokenEntity);
  }

  async create(token: TokenEntity): Promise<TokenEntity> {
    const newTokenEntity = await this.tokenEntity.save(
      this.toPersistence(token),
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
    const tokenEntity = await this.tokenEntity.findOne({
      where: { refreshToken: token },
      relations: ['session', 'session.user'],
    });

    if (!tokenEntity) {
      return null;
    }

    return this.toDomain(tokenEntity);
  }

  async update(token: TokenEntity): Promise<TokenEntity> {
    await this.tokenEntity.update(token.id, this.toPersistence(token));

    const newTokenEntity = await this.tokenEntity.findOneBy({
      id: token.id,
    });

    return this.toDomain(newTokenEntity!);
  }

  toDomain(entity: TokenRepositoryEntity): TokenEntity {
    const token = TokenEntity.create({
      accessToken: entity.accessToken,
      refreshToken: entity.refreshToken,
      accessTokenExpiresAt: entity.accessTokenExpiresAt,
      refreshTokenExpiresAt: entity.refreshTokenExpiresAt,
      session: this.sessionRepository.toDomain(entity.session),
    });

    token.id = entity.id;
    token.createdAt = entity.createdAt;
    token.updatedAt = entity.updatedAt;

    return token;
  }

  toPersistence(entity: TokenEntity): TokenRepositoryEntity {
    const token = new TokenRepositoryEntity();

    token.id = entity.id;
    token.accessToken = entity.accessToken;
    token.refreshToken = entity.refreshToken;
    token.accessTokenExpiresAt = entity.accessTokenExpiresAt;
    token.refreshTokenExpiresAt = entity.refreshTokenExpiresAt;
    token.session = this.sessionRepository.toPersistence(entity.session);
    token.createdAt = entity.createdAt;
    token.updatedAt = entity.updatedAt;

    return token;
  }
}
