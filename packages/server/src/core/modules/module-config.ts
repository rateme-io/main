import { Provider, Type } from '@nestjs/common';
import { Abstract } from '@nestjs/common/interfaces/abstract.interface';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

interface RepositoryConfig<A, R> {
  entity: EntityClassOrSchema;
  abstract: Abstract<A>;
  repository: Type<R>;
}

interface ServiceConfig {
  abstract: Abstract<unknown>;
  realisation: Type;
}

export class EntityModule {
  static config = ({
    repositories = [],
    services = [],
    imports,
    providers,
    exports = [],
    controllers,
  }: {
    repositories?: RepositoryConfig<unknown, unknown>[];
    services?: ServiceConfig[];
    imports?: ModuleMetadata['imports'];
    providers?: ModuleMetadata['providers'];
    exports?: ModuleMetadata['exports'];
    controllers?: ModuleMetadata['controllers'];
  }): ModuleMetadata => {
    return {
      imports: createImports(repositories, imports),
      providers: [
        ...createRepositoryProviders(repositories),
        ...createServiceProviders(services ?? []),
        ...(providers ?? []),
      ],
      exports: [...services.map(({ abstract }) => abstract), ...exports],
      controllers: [...(controllers ?? [])],
    };
  };
}

const createImports = (
  repositories: RepositoryConfig<unknown, unknown>[],
  additionalImports: ModuleMetadata['imports'] = [],
): ModuleMetadata['imports'] => {
  return [
    ...additionalImports,
    TypeOrmModule.forFeature(repositories.map(({ entity }) => entity)),
  ];
};

const createRepositoryProviders = <A, R>(
  repositories: RepositoryConfig<A, R>[],
): Provider[] => {
  return repositories.map(({ abstract, repository }) => ({
    provide: abstract,
    useClass: repository,
  }));
};

const createServiceProviders = (services: ServiceConfig[]): Provider[] => {
  return services.map(({ abstract, realisation }) => {
    return {
      provide: abstract,
      useClass: realisation,
    };
  });
};
