module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '<rootDir>/src/__test__/setupTests.ts',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  testEnvironment: 'jsdom',
  resetMocks: true,
};
