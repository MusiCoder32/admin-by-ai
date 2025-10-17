<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Sunny, Moon, Bell } from '@element-plus/icons-vue'
import useThemeStore from '@/store/theme'

const collapsed = ref(false)
const route = useRoute()
const { t, locale } = useI18n()
const themeStore = useThemeStore()

const menuList = computed(() => [
  { path: '/dashboard', label: t('layout.menuDashboard'), icon: 'i-carbon-dashboard' },
  { path: '/analytics', label: t('layout.menuAnalytics'), icon: 'i-carbon-chart-line', disabled: true },
  { path: '/tasks', label: t('layout.menuTasks'), icon: 'i-carbon-task-approved', disabled: true },
  { path: '/settings', label: t('layout.menuSettings'), icon: 'i-carbon-settings', disabled: true },
  { path: '/support', label: t('layout.menuSupport'), icon: 'i-carbon-chat-help', disabled: true }
])

const activePath = computed(() => route.path.startsWith('/dashboard') ? '/dashboard' : route.path)

function toggleLocale() {
  locale.value = locale.value === 'en-US' ? 'zh-CN' : 'en-US'
}
</script>

<template>
  <div class="layout-wrapper min-h-screen flex bg-slate-50">
    <aside
      class="transition-all duration-300 bg-white shadow-sm border-r border-slate-100"
      :class="collapsed ? 'w-20' : 'w-64'"
    >
      <header class="h-16 px-6 flex items-center gap-3 border-b border-slate-100">
        <div class="w-10 h-10 rounded-xl bg-primary/10 grid place-items-center text-primary text-xl font-bold">
          AI
        </div>
        <span v-if="!collapsed" class="font-semibold text-slate-800">Admin by AI</span>
      </header>
      <nav class="p-4 flex flex-col gap-2">
        <ElMenu :default-active="activePath" class="border-0" :collapse="collapsed">
          <ElMenuItem
            v-for="item in menuList"
            :key="item.path"
            :index="item.path"
            :disabled="item.disabled"
            class="rounded-lg !text-slate-600 !font-medium"
          >
            <i :class="item.icon" class="text-lg" />
            <span>{{ item.label }}</span>
          </ElMenuItem>
        </ElMenu>
      </nav>
      <footer class="mt-auto px-4 pb-6" v-if="!collapsed">
        <div class="bg-slate-100 rounded-xl p-4 text-slate-600 text-xs leading-relaxed">
          Need more modules? Upgrade to get automation workflows and AI copilots tailored for your ops.
        </div>
      </footer>
    </aside>

    <section class="flex-1 min-w-0 flex flex-col">
      <header class="h-16 px-6 border-b border-slate-100 bg-white flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <ElButton text circle @click="collapsed = !collapsed">
            <i :class="collapsed ? 'i-carbon-menu text-xl' : 'i-carbon-side-panel-open text-xl'" />
          </ElButton>
          <ElInput :placeholder="t('layout.searchPlaceholder')" class="w-72" clearable>
            <template #prefix>
              <i class="i-carbon-search text-slate-400" />
            </template>
          </ElInput>
        </div>
        <div class="flex items-center gap-3">
          <ElButton text circle @click="themeStore.toggleDark()">
            <ElIcon><Moon v-if="!themeStore.isDark" /><Sunny v-else /></ElIcon>
          </ElButton>
          <ElBadge is-dot class="mr-2">
            <ElButton text circle>
              <ElIcon><Bell /></ElIcon>
            </ElButton>
          </ElBadge>
          <ElDropdown>
            <span class="flex items-center gap-2 cursor-pointer">
              <ElAvatar size="small" class="bg-primary/10 text-primary">AI</ElAvatar>
              <div class="flex flex-col">
                <span class="text-sm font-semibold text-slate-700">Alex Johnson</span>
                <span class="text-xs text-slate-400">Product Manager</span>
              </div>
            </span>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem @click="toggleLocale">{{ locale === 'en-US' ? 'Switch to 中文' : 'Switch to English' }}</ElDropdownItem>
                <ElDropdownItem divided>Sign out</ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto bg-slate-50">
        <RouterView />
      </main>
    </section>
  </div>
</template>

<style scoped>
.layout-wrapper {
  transition: background-color 0.2s ease;
}
</style>
