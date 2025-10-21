import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  shortcuts: {
    'card-base': 'rounded-[14px] border border-[#E2E7F2] bg-white shadow-[0_2px_8px_rgba(46,50,66,0.08)]',
    'text-caption': 'text-[12px] leading-[14px] text-[#8E8E93]',
    'text-subtitle': 'text-[16px] leading-[24px] text-[#8E8E93]',
    'text-title': 'text-[20px] leading-[30px] font-medium text-[#1F2937]'
  },
  safelist: [
    'i-carbon-grid',
    'i-carbon-user-multiple',
    'i-carbon-task-approved',
    'i-carbon-calendar',
    'i-carbon-book',
    'i-carbon-time',
    'i-carbon-chart-line',
    'i-carbon-settings-adjust',
    'i-carbon-help',
    'i-carbon-search',
    'i-carbon-caret-down',
    'i-carbon-chevron-left',
    'i-carbon-chevron-right',
    'i-carbon-notification',
    'i-carbon-add'
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true
    })
  ],
  transformers: [transformerDirectives()]
})
