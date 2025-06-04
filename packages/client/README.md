# Client

React front‑end built with Vite. It consumes the API from the server and relies on the compiled `packages/core` library.

## Prerequisites

Before running the client make sure the core package is built and watching:

```bash
pnpm run core:build
pnpm run core:start
```

The server should also be running so the client can access the API. Follow the instructions in `../server/README.md` to start it.

## Development

Start the development server:

```bash
pnpm run client:start
```

## Production build

```bash
pnpm run client:build
```
