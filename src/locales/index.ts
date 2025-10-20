import { createI18n } from 'vue-i18n'

import en from './en.json'
import zhCN from './zh-CN.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    en,
    'zh-CN': zhCN
  }
})

export type MessageSchema = typeof en
