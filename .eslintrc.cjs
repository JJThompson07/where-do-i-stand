module.exports = {
  root: true,
  extends: ['@feeditback/vue-ts'],
  ignorePatterns: ['dist', 'coverage'],
  parserOptions: {
    project: ['./tsconfig.json']
  }
};
