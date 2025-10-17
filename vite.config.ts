import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { viteMockServe } from 'vite-plugin-mock'

// Project-wide Vite configuration
export default defineConfig(({ mode }) => {
  const enableMock = mode === 'development'

  return {
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        dts: 'auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json'
        }
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        dts: 'components.d.ts',
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
      }),
      VueI18nPlugin({
        include: path.resolve(process.cwd(), 'src/locales/**'),
        runtimeOnly: false
      }),
      enableMock &&
        viteMockServe({
          mockPath: 'mock',
          logger: true,
          watchFiles: true
        })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    server: {
      port: 5173,
      open: true
    },
    build: {
      sourcemap: mode !== 'production'
    }
  }
})
