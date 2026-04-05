import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../easyun-server/openapi.json',
  output: {
    path: 'src/api-client',
    format: 'prettier',
  },
  client: '@hey-api/client-axios',
  plugins: ['@hey-api/typescript', '@hey-api/sdk'],
});
