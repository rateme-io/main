/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './../../pages/__root'

// Create Virtual Routes

const RatingSystemsLazyImport = createFileRoute('/rating-systems')()
const RateCollectionItemLazyImport = createFileRoute('/rate-collection-item')()
const CreateRatingSystemLazyImport = createFileRoute('/create-rating-system')()
const CreateCollectionItemLazyImport = createFileRoute(
  '/create-collection-item',
)()
const CollectionsLazyImport = createFileRoute('/collections')()
const IndexLazyImport = createFileRoute('/')()
const CreateCollectionIndexLazyImport = createFileRoute('/create-collection/')()

// Create/Update Routes

const RatingSystemsLazyRoute = RatingSystemsLazyImport.update({
  id: '/rating-systems',
  path: '/rating-systems',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./../../pages/rating-systems.lazy').then((d) => d.Route),
)

const RateCollectionItemLazyRoute = RateCollectionItemLazyImport.update({
  id: '/rate-collection-item',
  path: '/rate-collection-item',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./../../pages/rate-collection-item.lazy').then((d) => d.Route),
)

const CreateRatingSystemLazyRoute = CreateRatingSystemLazyImport.update({
  id: '/create-rating-system',
  path: '/create-rating-system',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./../../pages/create-rating-system.lazy').then((d) => d.Route),
)

const CreateCollectionItemLazyRoute = CreateCollectionItemLazyImport.update({
  id: '/create-collection-item',
  path: '/create-collection-item',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./../../pages/create-collection-item.lazy').then((d) => d.Route),
)

const CollectionsLazyRoute = CollectionsLazyImport.update({
  id: '/collections',
  path: '/collections',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./../../pages/collections.lazy').then((d) => d.Route),
)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./../../pages/index.lazy').then((d) => d.Route))

const CreateCollectionIndexLazyRoute = CreateCollectionIndexLazyImport.update({
  id: '/create-collection/',
  path: '/create-collection/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./../../pages/create-collection/index.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/collections': {
      id: '/collections'
      path: '/collections'
      fullPath: '/collections'
      preLoaderRoute: typeof CollectionsLazyImport
      parentRoute: typeof rootRoute
    }
    '/create-collection-item': {
      id: '/create-collection-item'
      path: '/create-collection-item'
      fullPath: '/create-collection-item'
      preLoaderRoute: typeof CreateCollectionItemLazyImport
      parentRoute: typeof rootRoute
    }
    '/create-rating-system': {
      id: '/create-rating-system'
      path: '/create-rating-system'
      fullPath: '/create-rating-system'
      preLoaderRoute: typeof CreateRatingSystemLazyImport
      parentRoute: typeof rootRoute
    }
    '/rate-collection-item': {
      id: '/rate-collection-item'
      path: '/rate-collection-item'
      fullPath: '/rate-collection-item'
      preLoaderRoute: typeof RateCollectionItemLazyImport
      parentRoute: typeof rootRoute
    }
    '/rating-systems': {
      id: '/rating-systems'
      path: '/rating-systems'
      fullPath: '/rating-systems'
      preLoaderRoute: typeof RatingSystemsLazyImport
      parentRoute: typeof rootRoute
    }
    '/create-collection/': {
      id: '/create-collection/'
      path: '/create-collection'
      fullPath: '/create-collection'
      preLoaderRoute: typeof CreateCollectionIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/collections': typeof CollectionsLazyRoute
  '/create-collection-item': typeof CreateCollectionItemLazyRoute
  '/create-rating-system': typeof CreateRatingSystemLazyRoute
  '/rate-collection-item': typeof RateCollectionItemLazyRoute
  '/rating-systems': typeof RatingSystemsLazyRoute
  '/create-collection': typeof CreateCollectionIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/collections': typeof CollectionsLazyRoute
  '/create-collection-item': typeof CreateCollectionItemLazyRoute
  '/create-rating-system': typeof CreateRatingSystemLazyRoute
  '/rate-collection-item': typeof RateCollectionItemLazyRoute
  '/rating-systems': typeof RatingSystemsLazyRoute
  '/create-collection': typeof CreateCollectionIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/collections': typeof CollectionsLazyRoute
  '/create-collection-item': typeof CreateCollectionItemLazyRoute
  '/create-rating-system': typeof CreateRatingSystemLazyRoute
  '/rate-collection-item': typeof RateCollectionItemLazyRoute
  '/rating-systems': typeof RatingSystemsLazyRoute
  '/create-collection/': typeof CreateCollectionIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/collections'
    | '/create-collection-item'
    | '/create-rating-system'
    | '/rate-collection-item'
    | '/rating-systems'
    | '/create-collection'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/collections'
    | '/create-collection-item'
    | '/create-rating-system'
    | '/rate-collection-item'
    | '/rating-systems'
    | '/create-collection'
  id:
    | '__root__'
    | '/'
    | '/collections'
    | '/create-collection-item'
    | '/create-rating-system'
    | '/rate-collection-item'
    | '/rating-systems'
    | '/create-collection/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  CollectionsLazyRoute: typeof CollectionsLazyRoute
  CreateCollectionItemLazyRoute: typeof CreateCollectionItemLazyRoute
  CreateRatingSystemLazyRoute: typeof CreateRatingSystemLazyRoute
  RateCollectionItemLazyRoute: typeof RateCollectionItemLazyRoute
  RatingSystemsLazyRoute: typeof RatingSystemsLazyRoute
  CreateCollectionIndexLazyRoute: typeof CreateCollectionIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  CollectionsLazyRoute: CollectionsLazyRoute,
  CreateCollectionItemLazyRoute: CreateCollectionItemLazyRoute,
  CreateRatingSystemLazyRoute: CreateRatingSystemLazyRoute,
  RateCollectionItemLazyRoute: RateCollectionItemLazyRoute,
  RatingSystemsLazyRoute: RatingSystemsLazyRoute,
  CreateCollectionIndexLazyRoute: CreateCollectionIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/collections",
        "/create-collection-item",
        "/create-rating-system",
        "/rate-collection-item",
        "/rating-systems",
        "/create-collection/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/collections": {
      "filePath": "collections.lazy.tsx"
    },
    "/create-collection-item": {
      "filePath": "create-collection-item.lazy.tsx"
    },
    "/create-rating-system": {
      "filePath": "create-rating-system.lazy.tsx"
    },
    "/rate-collection-item": {
      "filePath": "rate-collection-item.lazy.tsx"
    },
    "/rating-systems": {
      "filePath": "rating-systems.lazy.tsx"
    },
    "/create-collection/": {
      "filePath": "create-collection/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
