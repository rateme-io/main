# Server

This directory contains the NestJS backend.
The server depends on the compiled output of `packages/core` and a running PostgreSQL container.

## Prerequisites

Build the core package first and (optionally) keep it watching for changes:

```bash
pnpm run core:build
pnpm run core:start
```

Start the database container defined in `docker-compose.yml`:

```bash
pnpm run server:db
```

## Development

Run the server in watch mode:

```bash
pnpm run server:start
```

## Production build

```bash
pnpm run server:build
pnpm run server:start
```

## Tests

Inside `packages/server` you can run:

```bash
pnpm run test        # unit tests
pnpm run test:e2e    # e2e tests
pnpm run test:cov    # coverage report
```
