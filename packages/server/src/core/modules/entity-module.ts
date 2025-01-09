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

interface UseCaseConfig<Inject extends any[]> {
  useCases: symbol[];
  inject: Inject;
  serviceFactory: (...inject: CreateClasses<Inject>) => unknown;
}

type CreateClasses<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? [Head extends Abstract<infer H> ? H : never, ...CreateClasses<Tail>]
  : [];

export class EntityModule {
  static config = ({
    repositories = [],
    useCases,
    imports,
    providers,
    exports,
    controllers,
  }: {
    repositories?: RepositoryConfig<any, any>[];
    useCases?: (
      create: <Inject extends any[]>(
        useCase: UseCaseConfig<Inject>,
      ) => UseCaseConfig<Inject>,
    ) => UseCaseConfig<any[]>[];
    imports?: ModuleMetadata['imports'];
    providers?: ModuleMetadata['providers'];
    exports?: ModuleMetadata['exports'];
    controllers?: ModuleMetadata['controllers'];
  }): ModuleMetadata => {
    const resolvedUseCases = useCases?.((useCase) => useCase) ?? [];

    return {
      imports: createImports(repositories, imports),
      providers: [
        ...createRepositoryProviders(repositories),
        ...createUseCaseProviders(resolvedUseCases),
        ...(providers ?? []),
      ],
      exports: createExports(repositories, resolvedUseCases, exports),
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

const createUseCaseProviders = (
  useCases: UseCaseConfig<any[]>[],
): Provider[] => {
  return useCases.flatMap(({ useCases, serviceFactory, inject }) => {
    return useCases.map((useCase) => ({
      provide: useCase,
      inject,
      useFactory: serviceFactory,
    }));
  });
};

const createExports = (
  repositories: RepositoryConfig<any, any>[],
  useCases: UseCaseConfig<any[]>[],
  additionalExports?: ModuleMetadata['exports'],
): ModuleMetadata['exports'] => {
  const exportsArray = [
    ...repositories.map(({ abstract }) => abstract),
    ...useCases.flatMap(({ useCases }) => useCases),
  ];

  if (additionalExports) {
    return [...exportsArray, ...additionalExports];
  } else {
    return exportsArray;
  }
};
