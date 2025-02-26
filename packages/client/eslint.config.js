import js from '@eslint/js';
import reatom from '@reatom/eslint-plugin';
import pluginLingui from 'eslint-plugin-lingui';
import reactPlugin from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react: reactPlugin,
      'react-compiler': reactCompiler,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'error',
      'react/prop-types': 'off',
      'react-compiler/react-compiler': 'error',
    },
  },
  pluginLingui.configs['flat/recommended'],
  {
    plugins: {
      'simple-import-sort': pluginSimpleImportSort,
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      'simple-import-sort/exports': 'error',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:'],
            ['^@?\\w'],
            ['^@rateme?\\w'],
            ['^'],
            ['^\\.'],
          ],
        },
      ],
    },
  },
  //  reatom
  {
    plugins: {
      '@reatom': reatom,
    },
    rules: {
      '@reatom/async-rule': 'error',
      '@reatom/unit-naming-rule': 'error',
    },
  },
);
