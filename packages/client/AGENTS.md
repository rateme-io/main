# Client Development Notes

This package contains the React front-end built with Vite.

## Development

Run the dev server from this directory:

```bash
pnpm run start
```

From the repository root you can also start the client with:

```bash
pnpm run client:start
```

## Build

Create a production build:

```bash
pnpm run build
```

## Linting and Formatting

Run the linters:

```bash
pnpm run lint
```

Automatically fix lint errors:

```bash
pnpm run lint:fix
```

Check formatting:

```bash
pnpm run format
```

Automatically format files:

```bash
pnpm run format:fix
```

## Localization

During pre-commit the locale files are generated automatically via:

```bash
pnpm run locale
```

## Tests

Run the unit tests:

```bash
pnpm run test
```

## Prepush

Before pushing, the following script runs:

```bash
pnpm run tsc && pnpm run format:fix && pnpm run lint:fix
```

