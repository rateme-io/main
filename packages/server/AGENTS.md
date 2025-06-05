# Development Notes

This package contains the NestJS API server. Below are commands useful for local development.

## Database

Start the PostgreSQL container defined in `docker-compose.yml` from the repository root:

```bash
pnpm run server:db
```

## Development

Run the server in watch mode from within this package:

```bash
pnpm run start:dev
```

From the repository root you can use:

```bash
pnpm run server:start
```

## Building

Create a production build:

```bash
pnpm run build
```

## Linting and Formatting

- Lint the source code:
  ```bash
  pnpm run lint
  ```
- Automatically fix lint problems:
  ```bash
  pnpm run lint:fix
  ```
- Check formatting with Prettier:
  ```bash
  pnpm run format
  ```
- Format all files:
  ```bash
  pnpm run format:fix
  ```

## Tests

- Unit tests:
  ```bash
  pnpm run test
  ```
- End-to-end tests:
  ```bash
  pnpm run test:e2e
  ```
- Coverage report:
  ```bash
  pnpm run test:cov
  ```

## Pre-push Hook

A pre-push hook runs `pnpm run format:fix` and `pnpm run lint:fix` before pushing changes.
