# Fresh Project

Initialise npm:

```bash
npm init
```

Follow with all the defaults:

- setting entry point to be `index.ts`
- set test command to be `jest run . --coverage`

Also add additional `test:watch` to `package.json` > `scripts`:

```json
"test:watch": "jest --watch"
```

Add typescript and jest:

[As per ts-jest docs](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/)

```bash
npm install -D jest typescript ts-jest @types/jest
npx ts-jest config:init
```

Initialise typescript:

```bash
npx tsc --init
```

Add jest global types to the `tsconfig.json`.

From:

```json
// "types": [],
```

To:

```json
"types": ["jest"],
```

Add some example code and tests, then:

```bash
npm run test:watch
```

or

```bash
npm run test
```
