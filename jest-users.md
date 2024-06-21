# Notes for Jest Users

Vitest and Jest are very similar, and have amalgamated most of the features found in Jasmine, Mocha, Chai etc.

- For installing a clean Jest project, using `ts-jest` see [here](./jest/fresh-project/README.md)
- All the examples are available in `./jest/` in this repo

## Major Differences

- `vi.fn()` -> `jest.fn()`

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
