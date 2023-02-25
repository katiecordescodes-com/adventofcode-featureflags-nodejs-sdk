/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/__mocks__/**/*.ts',
    '!src/index.ts',
  ],
  automock: false,
  setupFiles: [
    './setupJest.ts'
  ]
};