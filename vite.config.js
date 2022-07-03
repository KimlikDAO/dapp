import { fileURLToPath } from 'url'

export default {
  define: {
    'process.env.NODE_DEBUG': 'false',
    'global': 'globalThis'
  },

  build: {
    target: 'esnext',
    minify: false,
    rollupOptions: {
      input: {
        al: fileURLToPath(new URL('al/page.html', import.meta.url)),
        ana: fileURLToPath(new URL('ana/page.html', import.meta.url))
      }
    }
  },
  appType: "custom",
  publicDir: "/",
}
