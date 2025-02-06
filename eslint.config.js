// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const ngrx = require('@ngrx/eslint-plugin/v9');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    ignores: ['src/environments/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      ...ngrx.configs.all,
      eslintPluginPrettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@ngrx/prefix-selectors-with-select': 'off',
      'max-len': [
        'error',
        {
          code: 100,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Angular Core
            ['^@angular(/.*|$)'],
            // 2. RxJS
            ['^rxjs$', '^rxjs/operators$'],
            // 3. NgRx
            ['^@ngrx(/.*|$)'],
            // 4. Taiga UI
            ['^@taiga-ui(/.*|$)'],
            // 5. Константы
            ['^@core/constants$'],
            // 6. Компоненты
            ['^@delivery/foundation(/.*|$)'],
            // 7. Типы
            ['^@delivery/types$', '^@shared/types$'],
            // 8. Локальные модули (store, types и т.д.)
            ['^\\./store$', '^\\./types$'],
            // 9. Относительные пути
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
);
