<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

type MenuKey =
  | 'dashboard'
  | 'people'
  | 'projects'
  | 'calendar'
  | 'training'
  | 'timesheet'
  | 'reports'
  | 'administration'
  | 'help'

interface MenuItem {
  path: string
  key: MenuKey
  icon: string
  disabled?: boolean
}

const menuItems = computed<MenuItem[]>(() => [
  { path: '/dashboard', key: 'dashboard', icon: 'i-carbon-grid' },
  { path: '/people', key: 'people', icon: 'i-carbon-user-multiple', disabled: true },
  { path: '/projects', key: 'projects', icon: 'i-carbon-task-approved', disabled: true },
  { path: '/calendar', key: 'calendar', icon: 'i-carbon-calendar', disabled: true },
  { path: '/training', key: 'training', icon: 'i-carbon-book', disabled: true },
  { path: '/timesheet', key: 'timesheet', icon: 'i-carbon-time', disabled: true },
  { path: '/reports', key: 'reports', icon: 'i-carbon-chart-line', disabled: true },
  { path: '/administration', key: 'administration', icon: 'i-carbon-settings-adjust', disabled: true },
  { path: '/help', key: 'help', icon: 'i-carbon-help', disabled: true }
])

const activeIndex = computed(() => (route.path.startsWith('/dashboard') ? '/dashboard' : route.path))

const handleSelect = (index: string) => {
  if (index !== route.path) {
    router.push(index)
  }
}

type LanguageOption = {
  code: 'en' | 'zh-CN'
  label: string
}

const languageOptions: LanguageOption[] = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en', label: 'English' }
]

const LANGUAGE_STORAGE_KEY = 'app-locale'

const handleLanguageChange = (languageCode: LanguageOption['code']) => {
  if (languageCode === locale.value) return
  locale.value = languageCode
}

onMounted(() => {
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (stored && languageOptions.some(option => option.code === stored)) {
    locale.value = stored as LanguageOption['code']
  }
})

watch(
  () => locale.value,
  newLocale => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, newLocale)
  }
)
</script>

<template>
  <div class="layout-wrapper">
    <header class="topbar">
      <ElDropdown trigger="click" placement="bottom-start" @command="handleLanguageChange">
        <button class="topbar__identity-trigger" type="button" :aria-label="t('layout.languageSwitch')">
          <ElAvatar size="large" src="https://i.pravatar.cc/80?img=5" />
          <span class="topbar__identity-name">{{ t('layout.profileName') }}</span>
          <i class="i-carbon-caret-down" aria-hidden="true" />
        </button>

        <template #dropdown>
          <ElDropdownMenu class="language-menu">
            <ElDropdownItem
              v-for="option in languageOptions"
              :key="option.code"
              :command="option.code"
              :class="{ 'is-active': locale === option.code }"
            >
              {{ option.label }}
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>

      <label class="topbar__search">
        <i class="i-carbon-search" aria-hidden="true" />
        <input :placeholder="t('layout.searchPlaceholder')" type="text" />
      </label>

      <div class="topbar__actions">
        <button class="topbar__notification" type="button" aria-label="Notifications">
          <i class="i-carbon-notification" aria-hidden="true" />
          <span class="topbar__notification-dot" aria-hidden="true" />
        </button>
        <button class="topbar__add" type="button">
          <i class="i-carbon-add" aria-hidden="true" />
          <span>{{ t('layout.addWidget') }}</span>
        </button>
      </div>
    </header>

    <div class="layout-wrapper__content">
      <aside class="sidebar">
        <ElMenu :default-active="activeIndex" class="sidebar__menu" @select="handleSelect">
          <ElMenuItem
            v-for="item in menuItems"
            :key="item.path"
            :index="item.path"
            :disabled="item.disabled"
            class="sidebar__menu-item"
          >
            <i :class="['sidebar__menu-icon', item.icon]" />
            <span>{{ t(`layout.menu.${item.key}`) }}</span>
          </ElMenuItem>
        </ElMenu>

        <div class="sidebar__footer">
          <p class="sidebar__footer-title">CAMIOCA</p>
          <p class="sidebar__footer-caption">{{ t('layout.version') }}</p>
        </div>
      </aside>

      <main class="workspace">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100vh;
  padding: 32px 32px 40px;
  background: #f1f1f1;
  box-sizing: border-box;
}

.layout-wrapper__content {
  display: grid;
  grid-template-columns: 256px 1fr;
  gap: 24px;
  flex: 1;
  min-height: 0;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 16px 20px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #dee3ee;
  box-shadow: 0 8px 24px rgba(31, 41, 55, 0.06);
}

.sidebar__menu {
  border-right: none;
}

.sidebar__menu :deep(.el-menu-item) {
  border-radius: 12px;
  height: 40px;
  margin-bottom: 4px;
  font-weight: 500;
  color: #4f4f4f;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.sidebar__menu :deep(.el-menu-item.is-active) {
  background: rgba(47, 128, 237, 0.12);
  color: #2f80ed;
}

.sidebar__menu-icon {
  font-size: 18px;
  margin-right: 12px;
}

.sidebar__footer {
  margin-top: auto;
  padding: 20px 16px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #dee3ee;
  text-align: center;
}

.sidebar__footer-title {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.42px;
}

.sidebar__footer-caption {
  margin: 0;
  font-size: 12px;
  color: #8e8e93;
}

.topbar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
  height: 64px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #dee3ee;
  box-shadow: 0 8px 24px rgba(31, 41, 55, 0.06);
}

.topbar__identity-trigger {
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
  color: inherit;
}

.topbar__identity-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
}

.topbar__search {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #8e8e93;
  font-size: 14px;
  border-bottom: 1px solid #d1d1d6;
  padding-bottom: 8px;
}

.topbar__search input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: #4f4f4f;
  width: 100%;
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.topbar__actions button {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
}

.topbar__notification {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  color: #8e8e93;
}

.topbar__notification-dot {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #eb5757;
}

.topbar__add {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 18px;
  height: 40px;
  border-radius: 20px;
  background: #27ae60;
  border: 1px solid #219653;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.topbar__add i {
  font-size: 18px;
}

.topbar__add span {
  line-height: 1;
}

.workspace {
  background: transparent;
  min-height: 0;
}

.language-menu :deep(.el-dropdown-menu__item.is-active) {
  color: #2f80ed;
  font-weight: 500;
}
</style>
