module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    'import',
    '@typescript-eslint',
    'prefer-arrow',
  ],
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [
        '.ts',
        '.tsx',
      ]
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        'vars': 'all',
        'args': 'after-used',
        'ignoreRestSiblings': true,
        'varsIgnorePattern': '[iI]gnored'
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        "selector": [
          "objectLiteralProperty"
        ],
        "format": null,
        "modifiers": [
          "requiresQuotes"
        ]
      },
      {
        'selector': 'property',
        'format': [
          'camelCase',
          'UPPER_CASE',
          'PascalCase',
        ],
      },
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'custom': {
          'regex': '^I[A-Z]',
          'match': false,
        },
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': {
          'delimiter': 'none',
        },
        'singleline': {
          'delimiter': 'comma',
          'requireLast': false,
        },
      },
    ],
    'arrow-body-style': 'off',
    'arrow-parens': [
      'error',
      'as-needed',
      {
        'requireForBlockBody': true,
      },
    ],
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'max-len': [
      'error',
      {
        'code': 160,
        'ignoreUrls': true,
        'ignoreRegExpLiterals': true,
        'ignoreTrailingComments': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
      },
    ],
    'no-await-in-loop': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    'object-curly-newline': [
      'error',
      {
        'consistent': true,
      },
    ],
    'object-property-newline': 'off',
    'padded-blocks': 'off',
    'semi-style': ['error', 'first'],
    'no-param-reassign': [
      'error',
      {
        'props': true,
        'ignorePropertyModificationsFor': [
          'acc', // for reduce accumulators
          'req', // for Express requests
          'request', // for Express requests
          'res', // for Express responses
          'response', // for Express responses
          'state', // vuex store
        ],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages', {
        'js': 'never',
        'mjs': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never',
      }
    ],
    'eqeqeq': [
      'error',
      'always', {
        'null': 'always',
      },
    ],

    // disable eslint/no-shadow and replace with @typescript-eslint/no-shadow
    // see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],

    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error'],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        'disallowPrototype': true,
        'singleReturnOnly': false,
        'classPropertiesAllowed': false,
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      // exclude ForOfStatement
      // see base rules from https://github.com/airbnb/javascript/blob/64b965efe0355c8290996ff5a675cd8fb30bf843/packages/eslint-config-airbnb-base/rules/style.js#L334-L352
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
  },
  overrides: [
    {
      files: [
        '*.spec.ts',
      ],
      env: {
        jest: true,
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],

  // report unused eslint-disable to remind engineers to clean them up
  // this setting only reports them as warnings
  // https://eslint.org/docs/7.0.0/user-guide/configuring#report-unused-eslint-disable-comments
  reportUnusedDisableDirectives: true,
  env: {
    node: true,
  },
}
