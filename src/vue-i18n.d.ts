import 'vue-i18n'
import type en from './locales/en.json'

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends typeof en {}
  export interface DefineDateTimeFormat {}
  export interface DefineNumberFormat {}
}
