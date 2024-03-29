module.exports = {
  testTimeout: 30000,
  projects: [
    {
      displayName: 'frontend',
      testMatch: ['<rootDir>/src/app/tests/frontend/**/*.js'],
      testEnvironment: 'jest-environment-jsdom',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
      // autres configurations spécifiques au front-end
    },
    {
      displayName: 'backend',
      testMatch: ['<rootDir>/src/app/tests/backend/**/*.js'],
      testEnvironment: 'jest-environment-node',
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
      },
      testTimeout: 30000, 
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
      // autres configurations spécifiques au back-end
    }
  ],
  // Configurations globales
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!**/jest.setup.js',
  ],
};