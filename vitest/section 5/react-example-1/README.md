# Example Vite React App for Easy TDD

Here are the steps used to create this app:

```bash
# create the app from the template
npm create vite@latest react-example-1 -- --template react-ts

# test that the app comes up
cd react-example-1

npm install
npm run dev

# then open http://localhost:5173/
```

Then we add in `vitest`:

```bash
npm i -D vitest @vitest/coverage-v8
```

and add some testing scripts to the `"scripts"` section of our `package.json`:

```json
  "scripts": {
    ...,
    "test": "vitest run --coverage",
    "test:watch": "vitest"
  },
```

Add vitest global types to the `tsconfig.app.json`.

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"],
    ...
```

And set the `include` field in `tsconfig.app.json` to be all ts files:

```json
{
  ...
   "include": ["**/*.ts*"]
}
```

Then add `react-testing-library` and other dom testing dependencies:

```bash
npm install --save-dev @testing-library/react @testing-library/dom @testing-library/user-event @types/react @types/react-dom @testing-library/jest-dom jsdom
```

Add `vitest.config.ts` to the project:

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    // this provides the tests with the ability to use a DOM
    environment: 'jsdom',
    globals: true,

    // add the boilerplate for turning on react testing library for each test in a central place
    setupFiles: './tests/setup.ts',
  },
});
```

And add `./tests/setup.ts`:

```ts
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
```

# From the Vite Template: React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## Exercise

Add a new button after the increment button that resets the count back to 0.

Do it test first.
