import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ mode }) => {
  const enableMock = mode === 'mock'

  return {
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        dts: 'auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        },
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        dts: 'components.d.ts',
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
      }),
      VueI18nPlugin({
        runtimeOnly: false,
        include: fileURLToPath(new URL('./src/locales/**', import.meta.url))
      }),
      createSvgIconsPlugin({
        iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: enableMock,
        prodEnabled: false
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
          additionalData: '@use "element-plus/theme-chalk/src/dark/css-vars.scss" as *;'
        }
      }
    },
    server: {
      port: 5173
    }
  }
})
