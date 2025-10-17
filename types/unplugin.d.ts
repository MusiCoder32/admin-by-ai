declare module 'unplugin-auto-import/vite' {
  import type { Plugin } from 'vite'
  import type { Options } from 'unplugin-auto-import/types'

  export default function AutoImport(options?: Options): Plugin
}

declare module 'unplugin-vue-components/vite' {
  import type { Plugin } from 'vite'
  import type { Options } from 'unplugin-vue-components/dist/types'

  export default function Components(options?: Options): Plugin
}

declare module 'unplugin-vue-components/resolvers' {
  import type { ComponentResolver } from 'unplugin-vue-components'

  export const ElementPlusResolver: (options?: Record<string, unknown>) => ComponentResolver
}
