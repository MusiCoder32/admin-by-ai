declare module 'unocss/vite' {
  import type { Plugin } from 'vite'
  import type { UserConfig } from 'unocss'

  export default function UnoCSS(config?: UserConfig): Plugin
}
