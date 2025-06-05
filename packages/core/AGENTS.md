# Development Guide

This file explains how to work with the **core** package.

## Building

Compile the TypeScript sources with:

```bash
pnpm run build
```

From the repository root you can run the same script via:

```bash
pnpm run core:build
```

The compiled files are written to the `dist` directory.

## Watch mode

During development you can watch and rebuild automatically:

```bash
pnpm run start
```

## Formatting and linting

Check code formatting with:

```bash
pnpm run format
```

Fix formatting issues automatically with:

```bash
pnpm run format:fix
```

Run ESLint with:

```bash
pnpm run lint
```

## Pre-push hook

Husky runs the `prepush` script before pushing. It formats the code and runs the linter:

```bash
pnpm run format && pnpm run lint
```

