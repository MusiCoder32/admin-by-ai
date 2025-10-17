declare module '@intlify/unplugin-vue-i18n/vite' {
  import type { Plugin } from 'vite'
  import type { Options } from '@intlify/unplugin-vue-i18n'

  export default function VueI18nPlugin(options?: Options): Plugin
}
