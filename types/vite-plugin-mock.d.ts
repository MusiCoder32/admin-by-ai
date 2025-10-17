declare module 'vite-plugin-mock' {
  import type { Plugin } from 'vite'

  export interface MockMethod {
    url: string
    method?: 'get' | 'post' | 'put' | 'delete'
    response: ((options: Record<string, unknown>) => unknown) | Record<string, unknown>
    timeout?: number
    rawResponse?: (req: unknown, res: unknown) => void
  }

  export function viteMockServe(options?: {
    mockPath?: string
    watchFiles?: boolean
    logger?: boolean
  }): Plugin
}
