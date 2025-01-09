export abstract class Repository<Domain> {
  abstract toDomain(entity: unknown): Domain;

  abstract toPersistence(entity: Domain): unknown;
}
