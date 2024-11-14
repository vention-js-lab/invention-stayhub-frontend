import js from '@eslint/js';
import globals from 'globals';
import reactESLint from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginQuery from '@tanstack/eslint-plugin-query';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist', 'vite.config.ts'] },
  ...pluginQuery.configs['flat/recommended'],
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react: reactESLint,
      'react-hooks': reactHooks,
      'jsx-a11y': eslintPluginJsxA11y,
      import: importPlugin,
    },
    rules: {
      ...reactESLint.configs.flat.recommended.rules,
      ...reactESLint.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // ==== Base rules ==== //
      'array-callback-return': 'error',
      'no-await-in-loop': 'error',
      'no-constructor-return': 'error',
      'no-duplicate-imports': 'error',
      'no-promise-executor-return': 'error',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unreachable-loop': 'error',
      'no-useless-assignment': 'error',
      complexity: ['error', 10],
      'default-case': 'error',
      'default-case-last': 'error',
      eqeqeq: 'error',
      'guard-for-in': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-console': 'error',
      'no-div-regex': 'error',
      'no-else-return': 'error',
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-implicit-coercion': ['error', { boolean: true, number: true }],
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      '@typescript-eslint/no-misused-promises': 'off',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-object-constructor': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': 'error',
      'no-proto': 'error',
      'no-return-assign': 'error',
      'no-throw-literal': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-void': 'error',
      'prefer-const': 'error',
      'prefer-object-has-own': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-rest-params': 'error',
      'prefer-template': 'error',
      radix: 'error',
      'require-await': 'error',
      yoda: 'error',

      // ==== TypeScript rules ==== //
      '@typescript-eslint/consistent-type-exports': 'error',
      'consistent-return': 'off',
      '@typescript-eslint/consistent-return': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      'no-array-constructor': 'off',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': 'error',
      'no-invalid-this': 'off',
      '@typescript-eslint/no-invalid-this': 'error',
      'no-loop-func': 'off',
      '@typescript-eslint/no-loop-func': 'error',
      '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-type-arguments': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false, classes: false, allowNamedExports: true, typedefs: false, ignoreTypeReferences: true },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          format: ['PascalCase'],
          selector: ['enumMember', 'class', 'typeLike', 'interface'],
        },
        {
          format: ['camelCase', 'PascalCase'],
          selector: ['function'],
        },
        {
          format: ['camelCase'],
          selector: ['classProperty', 'objectLiteralMethod'],
        },
        {
          format: ['UPPER_CASE', 'camelCase', 'PascalCase'],
          selector: ['variable'],
          modifiers: ['const'],
          leadingUnderscore: 'allow',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      'no-useless-assignment': 'off',

      // ==== React rules ==== //
      'react/button-has-type': 'warn',
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/hook-use-state': 'warn',
      'react/jsx-boolean-value': ['error', 'always'],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      'react/jsx-pascal-case': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-danger': 'error',
      'react/no-unstable-nested-components': [
        'error',
        {
          allowAsProps: true,
        },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'error',
      'react/destructuring-assignment': ['warn', 'always'],
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              message:
                "Don't import from @mui/material directly. Use specific default component import instead. Example: import Button from '@mui/material/Button'. For more info refer to https://mui.com/material-ui/guides/minimizing-bundle-size/",
              name: '@mui/material',
              allowTypeImports: true,
            },
            {
              name: '@mui/icons-material',
              message:
                "Don't import from @mui/icons-material directly. Use specific default component import instead. Example: import AddIcon from '@mui/icons-material/Add'. For more info refer to https://mui.com/material-ui/guides/minimizing-bundle-size/",
              allowTypeImports: true,
            },
          ],
        },
      ],

      // ==== JSX a11y rules ==== //
      'jsx-a11y/no-autofocus': [
        'error',
        {
          ignoreNonDOM: true,
        },
      ],

      // ==== Import rules ==== //
      'import/export': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-commonjs': 'error',
      'import/no-default-export': 'warn',
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/no-mutable-exports': 'error',
      'import/no-named-default': 'error',
    },
  },
  {
    ...eslintPluginPrettierRecommended,
  }
);
