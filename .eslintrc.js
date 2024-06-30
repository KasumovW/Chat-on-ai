module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: ['react-app', 'react-app/jest', 'plugin:cypress/recommended'],
  plugins: ['header', 'no-only-tests', 'eslint-plugin-json'],
  rules: {
    'no-console': ['error', { allow: ['error'] }],
    'no-only-tests/no-only-tests': 'error',
    'no-useless-concat': 0,
  },
  overrides: [
    {
      files: ['*.json', '**/*.json'],
      rules: {
        'header/header': 'off',
      },
    },
  ],
}
