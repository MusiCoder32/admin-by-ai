<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Bell } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

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
</script>

<template>
  <div class="layout-wrapper">
    <aside class="sidebar">
      <div class="sidebar__profile">
        <ElAvatar size="large" src="https://i.pravatar.cc/80?img=5" />
        <div>
          <p class="sidebar__profile-name">{{ t('layout.profileName') }}</p>
          <p class="sidebar__profile-role">{{ t('layout.profileRole') }}</p>
        </div>
      </div>

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

    <section class="workspace">
      <header class="topbar">
        <div class="topbar__identity">
          <ElAvatar size="large" src="https://i.pravatar.cc/80?img=5" />
          <span class="topbar__identity-name">{{ t('layout.profileName') }}</span>
          <i class="i-carbon-caret-down" />
        </div>

        <label class="topbar__search">
          <i class="i-carbon-search" />
          <input :placeholder="t('layout.searchPlaceholder')" type="text" />
        </label>

        <div class="topbar__actions">
          <ElBadge is-dot>
            <ElButton circle text>
              <ElIcon>
                <Bell />
              </ElIcon>
            </ElButton>
          </ElBadge>
          <ElButton class="topbar__add" round type="success">+ {{ t('layout.addWidget') }}</ElButton>
        </div>
      </header>

      <main class="workspace__content">
        <RouterView />
      </main>
    </section>
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: grid;
  grid-template-columns: 256px 1fr;
  gap: 24px;
  min-height: 100vh;
  padding: 24px 24px 32px;
  background: #f1f1f1;
  box-sizing: border-box;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 16px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e2e7f2;
  box-shadow: 0 2px 8px rgba(46, 50, 66, 0.08);
}

.sidebar__profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar__profile-name {
  margin: 0;
  font-weight: 600;
  color: #1f2937;
}

.sidebar__profile-role {
  margin: 4px 0 0;
  font-size: 12px;
  color: #8e8e93;
}

.sidebar__menu {
  border-right: none;
}

.sidebar__menu :deep(.el-menu-item) {
  border-radius: 8px;
  height: 44px;
  margin-bottom: 4px;
  font-weight: 500;
  color: #4f4f4f;
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
  padding: 16px;
  border-radius: 12px;
  background: #fafbff;
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

.workspace {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.topbar {
  display: grid;
  grid-template-columns: 240px 1fr auto;
  align-items: center;
  gap: 24px;
  padding: 16px 24px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e2e7f2;
  box-shadow: 0 2px 8px rgba(46, 50, 66, 0.08);
}

.topbar__identity {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: #1f2937;
}

.topbar__identity-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.topbar__search {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  height: 42px;
  border-radius: 999px;
  background: #f5f7fb;
  color: #8e8e93;
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

.topbar__actions :deep(.el-button) {
  color: #8e8e93;
}

.topbar__add {
  border: none;
  background: linear-gradient(180deg, #34d399 0%, #27ae60 100%);
  color: #ffffff;
  font-weight: 600;
  padding: 0 24px;
  height: 40px;
}

.workspace__content {
  flex: 1;
}
</style>
