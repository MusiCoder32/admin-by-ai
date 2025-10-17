import { useDark, useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'

const useThemeStore = defineStore('theme', () => {
  const isDark = useDark({ storageKey: 'admin-by-ai-theme' })
  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark
  }
})

export default useThemeStore
