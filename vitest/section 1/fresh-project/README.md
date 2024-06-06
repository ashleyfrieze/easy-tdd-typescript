# Fresh Project

How to create a `vitest` project from scratch.

Initialise npm:

```bash
npm init
```

Follow with all the defaults:

- setting entry point to be `index.ts`
- set test command to be `vitest run --coverage`

Also add additional `test:watch` to `package.json` > `scripts`:

```json
"test:watch": "vitest"
```

Add typescript and vitest:

```bash
npm i -D typescript vitest @vitest/coverage-v8
```

Initialise typescript:

```bash
npx tsc --init
```

Add vitest global types to the `tsconfig.json`.

From:

```json
// "types": [],
```

To:

```json
"types": ["vitest/globals"],
```

Add `vitest.config.ts` to the project:

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
  },
});
```

Add some example code and tests, then:

```bash
npm run test:watch
```

or

```bash
npm run test
```

Then add the vitest.dev extension to vscode.

## Bonus: Code Formatting

Add a code formatter:

```bash
npm add -D prettier
```

and its config `.prettierrc`:

```json
{
  "singleQuote": true,
  "useTabs": false,
  "trailingComma": "es5"
}
```

And set the IDE editor to use the prettier plugin for formatting.

Using the prettier.io Prettier - Code formatter, and set the IDE to format on save.
