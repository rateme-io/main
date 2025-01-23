import path from 'node:path';
import { fileURLToPath } from 'node:url';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import { globSync } from 'glob';

import packageJson from './package.json' with { type: 'json' };
import tsconfigJson from './tsconfig.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFiles = Object.fromEntries(
  globSync('src/**/*.ts').map(file => [
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length),
    ),
    fileURLToPath(new URL(file, import.meta.url)),
  ]),
);

export default [
  {
    input: inputFiles,
    output: [{
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      preserveModules: true,
      entryFileNames: '[name].mjs',
    }, {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      preserveModules: true,
      entryFileNames: '[name].cjs',
    }],
    plugins: [
      alias({
        entries: [
          { find: '@/', replacement: path.resolve(__dirname, 'src') },
        ],
      }),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json', declaration: true, declarationDir: 'dist', rootDir: 'src' }),
      terser(),
    ],
    external: Object.keys({
      ...packageJson.peerDependencies,
    }),
  },
  {
    input: inputFiles,
    output: {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
      entryFileNames: '[name].d.ts',
    },
    plugins: [
      dts({
        compilerOptions: {
          baseUrl: tsconfigJson.compilerOptions.baseUrl,
          paths: tsconfigJson.compilerOptions.paths,
        },
      }),
    ],
  },
];
