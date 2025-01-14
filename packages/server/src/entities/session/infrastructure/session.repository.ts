import { SessionAbstractRepository } from '@/entities/session/domain';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAbstractRepository } from '@/entities/user/domain';
import { UserRepository } from '@/entities/user/infrastructure';
import { SessionEntity } from '@rateme/core/domain/entities/session.entity';
import { SessionRepositoryEntity } from './session.repository.entity';

@Injectable()
export class SessionRepository extends SessionAbstractRepository {
  constructor(
    @InjectRepository(SessionRepositoryEntity)
    private readonly sessionEntity: Repository<SessionRepositoryEntity>,
    @Inject(UserAbstractRepository)
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  async create(session: SessionEntity): Promise<SessionEntity> {
    const newSession = await this.sessionEntity.save(
      this.toPersistence(session),
    );

    return this.toDomain(newSession);
  }

  async update(session: SessionEntity): Promise<SessionEntity> {
    await this.sessionEntity.update(session.id, this.toPersistence(session));

    const newSession = await this.sessionEntity.findOne({
      where: { id: session.id },
      relations: ['user'],
    });

    return this.toDomain(newSession!);
  }

  async remove(id: string): Promise<void> {
    await this.sessionEntity.delete(id);
  }

  async findAllByUserId(userId: string): Promise<SessionEntity[]> {
    const sessions = await this.sessionEntity.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });

    return sessions.map((session) => this.toDomain(session));
  }

  async findById(id: string): Promise<SessionEntity | null> {
    const session = await this.sessionEntity.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!session) {
      return null;
    }

    return this.toDomain(session);
  }

  toDomain(entity: SessionRepositoryEntity): SessionEntity {
    return SessionEntity.create({
      userAgent: entity.userAgent,
      ipAddress: entity.ipAddress,
      isActive: entity.isActive,
      sessionId: entity.sessionId,
      user: this.userRepository.toDomain(entity.user),
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }

  toPersistence(entity: SessionEntity): SessionRepositoryEntity {
    return SessionRepositoryEntity.create({
      userAgent: entity.userAgent,
      ipAddress: entity.ipAddress,
      isActive: entity.isActive,
      sessionId: entity.sessionId,
      user: this.userRepository.toPersistence(entity.user),
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
