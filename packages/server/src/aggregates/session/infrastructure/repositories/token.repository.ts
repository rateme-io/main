import { EntityManager, Repository } from 'typeorm';

import { TokenEntity } from '@rateme/core/domain/entities/session.entity';

import { TokenAbstractRepository } from '@/aggregates/session/domain';
import { SessionRepository } from '@/entities/session/infrastructure';
import { CryptoService } from '@/core/modules/crypto';

import { TokenRepositoryEntity } from '../entities';

export class TokenRepository extends TokenAbstractRepository {
  private readonly tokenEntity: Repository<TokenRepositoryEntity>;

  constructor(
    private readonly entityManager: EntityManager,
    private readonly sessionRepository: SessionRepository,
    private readonly cryptoService: CryptoService,
  ) {
    super();

    this.tokenEntity = this.entityManager.getRepository(TokenRepositoryEntity);
  }

  async findByAccessToken(token: string): Promise<TokenEntity | null> {
    const hashed = await this.cryptoService.hash(token, true);
    const tokenEntity = await this.tokenEntity.findOne({
      where: { accessToken: hashed },
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
    const hashed = await this.cryptoService.hash(token, true);
    const tokenEntity = await this.tokenEntity.findOne({
      where: { refreshToken: hashed },
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
