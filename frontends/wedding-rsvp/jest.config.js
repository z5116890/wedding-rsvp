module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  testMatch: ['<rootDir>/src/**/*.spec.(js|ts)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '#test/(.*)': '<rootDir>/test/$1',
    '@vue/apollo-composable': '@vue/apollo-composable/dist/index.js',
    '^vue$': '@vue/compat',
    uuid: require.resolve('uuid'),
    '^.+\\.(css|scss)$': '<rootDir>/test/css-stub.js',
  },
  transform: {
    '^.+\\.(mjs|js)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/fileTransformer.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(vue-multiselect|vee-validate|@popperjs|@vue/apollo-composable|humanize-string|decamelize|@apollo|ts-invariant)/)'],
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
}
