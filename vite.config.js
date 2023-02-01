import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base:'/solid-js-todo',
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
