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
