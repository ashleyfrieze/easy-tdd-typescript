/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  setupFiles: ["dotenv/config"],
  preset: 'ts-jest',
  testEnvironment: 'node',
};