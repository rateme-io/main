import * as path from 'node:path';

import { lingui } from '@lingui/vite-plugin';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@rateme/core',
        replacement: path.resolve(__dirname, '../core/dist'),
      },
    ],
  },
  plugins: [
    tsconfigPaths(),
    TanStackRouterVite({
      routesDirectory: 'src/pages',
      generatedRouteTree: 'src/app/router/route-tree.gen.ts',
    }),
    react({
      babel: {
        plugins: ['@lingui/babel-plugin-lingui-macro'],
      },
    }),
    lingui(),
    ViteImageOptimizer(),
  ],
});
