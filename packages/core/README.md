# Core

This package contains the shared business logic used by both the server and the client.
The library is written in TypeScript and compiled with Rollup.

## Building

From the repository root run:

```bash
pnpm run core:build
```

During development you can watch and rebuild automatically:

```bash
pnpm run core:start
```

The compiled files appear in the `dist` directory. Make sure the core package has been built before running the server or the client.
