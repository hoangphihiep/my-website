import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    env: {
      NODE_ENV: 'test',
      PORT: '5001',
      TRUST_PROXY_HOPS: '0',
    },
    include: ['tests/**/*.test.ts'],
  },
});
