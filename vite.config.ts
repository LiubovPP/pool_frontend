import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // добавляем плагин для поддержки алиасов 
  ],
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
      },
    },
  },
  resolve: {
    alias: {
      '@app': '/src/app',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@styles': '/src/styles',
      '@assets': '/src/assets',
      '@utils': '/src/utils',
      // '@types': '/src/types',
    },
  },
});
