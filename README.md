# RateMe Monorepo

This repository contains three workspaces managed with **pnpm** and **lerna**:

- `packages/core` – shared logic used by the client and server
- `packages/server` – NestJS API server
- `packages/client` – React front‑end built with Vite

## Prerequisites

- Node.js (v18 or later recommended)
- [pnpm](https://pnpm.io)
- Docker (for the development database)

Install all dependencies from the repository root:

```bash
pnpm install
```

## Building

The core package must be built first because both the server and the client rely on the compiled output:

```bash
pnpm run core:build
pnpm run server:build
pnpm run client:build
```

## Running the project

1. Start the PostgreSQL container defined in `packages/server/docker-compose.yml`:

```bash
pnpm run server:db
```

2. Start the core package in watch mode so changes are compiled automatically:

```bash
pnpm run core:start
```

3. In another terminal start the API server:

```bash
pnpm run server:start
```

4. Finally start the client:

```bash
pnpm run client:start
```

Running these processes in parallel gives you a full development environment.
