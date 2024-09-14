module.exports = {
  testEnvironment: 'node',
  globals: {},
  testMatch: [
    '<rootDir>/src/**/*.spec.(js|ts)',
    '<rootDir>/test/**/*.spec.(js|ts)',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  modulePaths: [
    '<rootDir>/libs',
  ],
  moduleNameMapper: {
    '#test/(.*)': '<rootDir>/test/$1',
  },
  preset: 'ts-jest',
  reporters: ['default'],
  testLocationInResults: true,
}
