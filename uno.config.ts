import { defineConfig, presetIcons, presetTypography, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
  theme: {
    colors: {
      primary: '#246BFD',
      secondary: '#10B981',
      accent: '#F97316',
      dark: '#0F172A',
      muted: '#94A3B8'
    }
  },
  shortcuts: {
    'card-base': 'bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4',
    'section-title': 'text-xl font-semibold text-dark mb-4',
    'chip-pill': 'px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600'
  },
  safelist: [
    'i-carbon-dashboard',
    'i-carbon-chart-line',
    'i-carbon-task-approved',
    'i-carbon-settings',
    'i-carbon-chat-help',
    'i-carbon-menu',
    'i-carbon-side-panel-open',
    'i-carbon-search'
  ]
})
