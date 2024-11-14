import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from 'tailwindcss'

export default defineConfig(() => {
  const env = loadEnv(process.cwd(), '')
  return {
    plugins: [
      tsconfigPaths(),
      react(),
      svgr({
        svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
        include: '**/*.svg',
      }),
      createHtmlPlugin({
        minify: true,
        entry: '/src/main.tsx',
        template: 'index.html',
        inject: {
          data: {
            title: 'index',
            injectScript: `<script src="./inject.js"></script>`,
          },
          tags: [
            {
              injectTo: 'body-prepend',
              tag: 'div',
              attrs: {
                id: 'tag',
              },
            },
          ],
        },
      }),
    ],
    server: {
      open: true,
    },
    build: {
      outDir: 'dist',
    },
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    define: {
      ...Object.keys(env).reduce((prev, key) => {
        const sanitizedKey = key.replace(/[^a-zA-Z0-9_]/g, '_')
        // @ts-ignore
        prev[`process.env.${sanitizedKey}`] = JSON.stringify(env[key])

        return prev
      }, {}),
      __IS_DEV__: 'true',
    },
    clearScreen: false,
  }
})
