# Notes for Jest Users

Vitest and Jest are very similar, and have amalgamated most of the features found in Jasmine, Mocha, Chai etc. Vitest was written
to make migration from Jest really easy, though it has a few more features than Jest does.

> Jest really is way slower than Vitest - it's definitely worth migrating to Vitest if you can

- For installing a clean Jest project, using `ts-jest` see [here](./jest/fresh-project/README.md)
- All the examples are available convert to equivalent projects in `jest/` in the examples repo.

## Major Differences

- The installation of jest
- Where code uses `process.env` - the `"node"` types may need to be added to `tsconfig.json` / `"types"`
- `vi.fn()` -> `jest.fn()`
- `vi.mock(..)` -> `jest.mock(...)`
- `vi.spyOn(..)` -> `jest.spyOn(..)`
- `vi.hoisted(...)` has no equivalent, but you can put code before an `import` to manually hoist
- `vi.useFakeTimers` -> `jest.useFakeTimers` and also `useRealTimers` and `setSystemTime`
- `vi.restoreAllMocks()` does not reinstate behaviour set on a mock when it was first created
  - Use `vi.resetAllMocks()` to clear any spy counters
  - Add `.mockImplementation` to the `beforeEach` or other setup part of a test to put in a global mock implementation of a mock

### Minor Differences

#### Environment `.env` Files

Jest doesn't automatically add `.env` file key/value pairs to the process environment.

This can be _fixed_ by:

```bash
npm i -D dotenv
```

and then add to the `jest.config.js` file:

```js
module.exports = {
  setupFiles: ["dotenv/config"],
```

#### React Testing

The set up for react testing involves modifying `jest.config.js` so that the environment is `jsdom` not `node`. As well as adding some mock files to resolve non typescript assets.

See the GitHub repo for specifics, but the `jest.config.js` looks like this:

```js
/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/__mocks__/fileMock.js",
    "\\.css$": "<rootDir>/src/__mocks__/styleMock.js",
  },
};
```

Add also need to install the Jest shim for jsdom:

```bash
npm i -D jest-environment-jsdom
```

a test-specific `tsconfig.test.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true
  }
}
```

as well as adding this to `src/setupTests.ts`:

```ts
import "@testing-library/jest-dom";
```

## How to switch from Vitest to Jest

> How the examples were refactored for this project

```bash
npm remove vitest @vitest/coverage-v8
npm install -D jest typescript ts-jest @types/jest
npx ts-jest config:init
```

Modify scripts in `package.json` to use `jest` rather than `vitest`

Delete `vitest.config.ts`.

Substitute `"types"` in `tsconfig.json` for `"types": ["jest"]`
