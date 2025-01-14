import { Provider, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Abstract } from '@nestjs/common/interfaces/abstract.interface';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';

interface RepositoryConfig<A, R> {
  entity: EntityClassOrSchema;
  abstract: Abstract<A>;
  repository: Type<R>;
}

interface ServiceConfig<Inject extends any[]> {
  abstract: Abstract<unknown>;
  inject: Inject;
  serviceFactory: (...inject: CreateClasses<Inject>) => unknown;
}

type CreateClasses<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? [Head extends Abstract<infer H> ? H : never, ...CreateClasses<Tail>]
  : [];

export class EntityModule {
  static config = ({
    repositories = [],
    services,
    imports,
    providers,
    exports,
    controllers,
  }: {
    repositories?: RepositoryConfig<any, any>[];
    services?: (
      create: <Inject extends any[]>(
        useCase: ServiceConfig<Inject>,
      ) => ServiceConfig<Inject>,
    ) => ServiceConfig<any[]>[];
    imports?: ModuleMetadata['imports'];
    providers?: ModuleMetadata['providers'];
    exports?: ModuleMetadata['exports'];
    controllers?: ModuleMetadata['controllers'];
  }): ModuleMetadata => {
    const resolvedServices = services?.((useCase) => useCase) ?? [];

    return {
      imports: createImports(repositories, imports),
      providers: [
        ...createRepositoryProviders(repositories),
        ...createServiceProviders(resolvedServices),
        ...(providers ?? []),
      ],
      exports: createExports(repositories, resolvedServices, exports),
      controllers: [...(controllers ?? [])],
    };
  };
}

const createImports = (
  repositories: RepositoryConfig<any, any>[],
  additionalImports?: ModuleMetadata['imports'],
): ModuleMetadata['imports'] => {
  if (additionalImports) {
    return [
      ...additionalImports,
      TypeOrmModule.forFeature(repositories.map(({ entity }) => entity)),
    ];
  } else {
    return [TypeOrmModule.forFeature(repositories.map(({ entity }) => entity))];
  }
};

const createRepositoryProviders = <A, R>(
  repositories: RepositoryConfig<A, R>[],
): Provider[] => {
  return repositories.map(({ abstract, repository }) => ({
    provide: abstract,
    useClass: repository,
  }));
};

const createServiceProviders = (
  services: ServiceConfig<any[]>[],
): Provider[] => {
  return services.map(({ abstract, serviceFactory, inject }) => {
    return {
      provide: abstract,
      useFactory: serviceFactory,
      inject,
    };
  });
};

const createExports = (
  repositories: RepositoryConfig<any, any>[],
  useCases: ServiceConfig<any[]>[],
  additionalExports?: ModuleMetadata['exports'],
): ModuleMetadata['exports'] => {
  const exportsArray = [
    ...repositories.map(({ abstract }) => abstract),
    ...useCases.map(({ abstract }) => abstract),
  ];

  if (additionalExports) {
    return [...exportsArray, ...additionalExports];
  } else {
    return exportsArray;
  }
};
