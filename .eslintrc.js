module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 0,
    'react-native/no-inline-styles': 0,
    'comma-dangle': 'off'
  },
};
