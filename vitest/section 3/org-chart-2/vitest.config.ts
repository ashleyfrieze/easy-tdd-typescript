/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    reporters: ['default', ['junit', { suiteName: 'OrgChart' }]],
    outputFile: 'junit.xml',
  },
});
