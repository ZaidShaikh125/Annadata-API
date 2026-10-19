module.exports = { preset: 'ts-jest', testEnvironment: 'node', roots: ['<rootDir>/src'], testRegex: '.*\\.spec\\.ts$', moduleNameMapper: { '^jose$': '<rootDir>/src/testing/jose.mock.ts' } };
