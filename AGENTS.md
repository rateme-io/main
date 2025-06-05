# Repository Guidelines

This monorepo is managed with **pnpm** workspaces and **lerna**. It contains three packages:

- `packages/core` – shared TypeScript library
- `packages/server` – NestJS backend
- `packages/client` – React front‑end

## Prerequisites

- Node.js 18 or newer
- [pnpm](https://pnpm.io)

## Setup

Install dependencies from the repository root:

```bash
pnpm install
```

## Building

Run the following commands from the repository root to build each package:

```bash
pnpm run core:build
pnpm run server:build
pnpm run client:build
```

## Development Workflow

1. Start the development database:
   ```bash
   pnpm run server:db
   ```
2. Start the core package in watch mode:
   ```bash
   pnpm run core:start
   ```
3. Start the API server:
   ```bash
   pnpm run server:start
   ```
4. Start the client application:
   ```bash
   pnpm run client:start
   ```

## Git Hooks

Husky hooks run `lerna run precommit` on commit and `lerna run prepush` on push. These commands invoke the `precommit`/`prepush` scripts of each package.

## Testing

Server tests:

```bash
pnpm run test       # unit tests
pnpm run test:e2e   # end-to-end tests
```

Client tests:

```bash
pnpm run test
```

## Linting and Formatting

Each package provides its own `lint`, `lint:fix`, `format`, and `format:fix` scripts. Run them before committing to keep the codebase clean.
