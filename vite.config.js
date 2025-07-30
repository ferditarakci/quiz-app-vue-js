import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

import('./loadEnv')

// https://vite.dev/config/
export default async ({ mode }) => {
  const env = {
    ...loadEnv(mode, process.cwd()),
    DEV: mode === 'development',
    PROD: mode === 'production',
    NODE_ENV: process.env.NODE_ENV,
    DEBUG: process.env.DEBUG,
  }

  return defineConfig({
    define: {
      'process.env': env,

      // Content-Security-Policy Error Fix for vue-i18n
      // https://stackoverflow.com/questions/77288512/vite-vue-3-built-project-content-security-policy-error-csp-script-src-self
      __INTLIFY_JIT_COMPILATION__: true,
    },
    plugins: [vue()],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        src: fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  })
}
