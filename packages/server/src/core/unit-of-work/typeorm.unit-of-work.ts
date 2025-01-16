import { DataSource, EntityManager } from 'typeorm';
import { UnitOfWork } from '@/core/unit-of-work/unit-of-work';

export abstract class TypeormUnitOfWork<Context> extends UnitOfWork<Context> {
  protected constructor(private readonly dataSource: DataSource) {
    super();
  }

  abstract createContext(entityManager: EntityManager): Context;

  async start<T>(callback: (context: Context) => Promise<T>): Promise<T> {
    return this.dataSource.manager.transaction(async (entityManager) => {
      return callback(this.createContext(entityManager));
    });
  }
}
