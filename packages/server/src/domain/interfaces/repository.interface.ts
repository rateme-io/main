export interface Repository<Entity, RepositoryEntity> {
  toDomain(entity: RepositoryEntity): Entity;
}