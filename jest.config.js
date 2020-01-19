module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  globals: {
    'NODE_ENV': 'test'
  },
  testRegex: '/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
