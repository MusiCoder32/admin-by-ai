<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowRight, RefreshRight } from '@element-plus/icons-vue'
import TrafficLine from '@/components/charts/TrafficLine.vue'
import type { DashboardResponse } from '@/services/dashboard'
import { fetchDashboard } from '@/services/dashboard'

const { t } = useI18n()

const loading = ref(true)
const dashboard = ref<DashboardResponse | null>(null)

async function loadDashboard() {
  loading.value = true
  try {
    dashboard.value = await fetchDashboard()
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)
</script>

<template>
  <div class="px-6 py-8 min-h-full">
    <div class="flex items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">{{ t('dashboard.welcome') }}</h1>
        <p class="text-slate-500 mt-2 text-sm">{{ t('dashboard.subtitle') }}</p>
      </div>
      <ElSpace>
        <ElButton type="primary" :icon="ArrowRight">Generate Report</ElButton>
        <ElButton :icon="RefreshRight" @click="loadDashboard" :loading="loading">Refresh</ElButton>
      </ElSpace>
    </div>

    <ElSkeleton :loading="loading" animated :count="1">
      <div class="grid gap-6 xl:grid-cols-4 md:grid-cols-2 mb-8">
        <ElCard v-if="dashboard" v-for="metric in [
            { label: t('dashboard.traffic'), value: dashboard.summary.traffic, delta: '+12.4%' },
            { label: t('dashboard.conversion'), value: dashboard.summary.conversion + '%', delta: '+1.8%' },
            { label: t('dashboard.avgSession'), value: dashboard.summary.avgSession + 'm', delta: '+0.6m' },
            { label: t('dashboard.newUsers'), value: dashboard.summary.newUsers, delta: '+320' }
          ]" :key="metric.label" class="card-base">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-slate-500 text-sm">{{ metric.label }}</p>
              <h3 class="text-3xl font-semibold text-slate-900 mt-2">{{ metric.value }}</h3>
            </div>
            <ElTag type="success" round size="small">{{ metric.delta }}</ElTag>
          </div>
        </ElCard>
      </div>

      <div class="grid gap-6 xl:grid-cols-3 mb-8">
        <ElCard class="card-base xl:col-span-2">
          <template #header>
            <div class="flex justify-between items-center">
              <h2 class="section-title">{{ t('dashboard.traffic') }}</h2>
              <ElRadioGroup size="small" model-value="30d">
                <ElRadioButton label="7d">7d</ElRadioButton>
                <ElRadioButton label="14d">14d</ElRadioButton>
                <ElRadioButton label="30d">30d</ElRadioButton>
              </ElRadioGroup>
            </div>
          </template>
          <TrafficLine v-if="dashboard" :data="dashboard.traffic" />
        </ElCard>

        <ElCard class="card-base">
          <template #header>
            <h2 class="section-title">{{ t('dashboard.recentActivity') }}</h2>
          </template>
          <ElTimeline v-if="dashboard" class="max-h-72 overflow-y-auto pr-2">
            <ElTimelineItem
              v-for="activity in dashboard.activities"
              :key="activity.id"
              :timestamp="activity.time"
              placement="top"
              :type="activity.status === 'success' ? 'success' : activity.status === 'warning' ? 'warning' : 'info'"
            >
              <div class="font-medium text-slate-700">{{ activity.user }}</div>
              <div class="text-sm text-slate-500">{{ activity.action }}</div>
            </ElTimelineItem>
          </ElTimeline>
        </ElCard>
      </div>

      <div class="grid gap-6 xl:grid-cols-3">
        <ElCard class="card-base xl:col-span-2">
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="section-title">{{ t('dashboard.performance') }}</h2>
              <ElButton text size="small">{{ t('dashboard.viewAll') }}</ElButton>
            </div>
          </template>
          <ElTable v-if="dashboard" :data="dashboard.tickets" border size="large">
            <ElTableColumn prop="id" label="ID" width="80" />
            <ElTableColumn prop="title" label="Ticket" min-width="200" />
            <ElTableColumn prop="assignee" label="Owner" width="140" />
            <ElTableColumn prop="priority" label="Priority" width="120">
              <template #default="{ row }">
                <ElTag :type="row.priority === 'High' ? 'danger' : row.priority === 'Medium' ? 'warning' : 'info'" round>
                  {{ row.priority }}
                </ElTag>
              </template>
            </ElTableColumn>
            <ElTableColumn prop="status" label="Status" width="140">
              <template #default="{ row }">
                <ElTag type="success" v-if="row.status === 'Resolved'" round>Resolved</ElTag>
                <ElTag type="warning" v-else-if="row.status === 'In progress'" round>In progress</ElTag>
                <ElTag type="info" v-else round>Open</ElTag>
              </template>
            </ElTableColumn>
          </ElTable>
        </ElCard>

        <ElCard class="card-base">
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="section-title">{{ t('dashboard.tasks') }}</h2>
              <ElButton text size="small">{{ t('dashboard.viewAll') }}</ElButton>
            </div>
          </template>
          <ElSpace v-if="dashboard" direction="vertical" fill size="large">
            <div v-for="task in dashboard.tasks" :key="task.id" class="bg-slate-100 rounded-xl p-4">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h3 class="text-sm font-semibold text-slate-800">{{ task.title }}</h3>
                  <p class="text-xs text-slate-500">Owner: {{ task.owner }}</p>
                </div>
                <ElTag round type="info">Due {{ task.dueDate }}</ElTag>
              </div>
              <ElProgress :percentage="task.progress" :stroke-width="6" :show-text="false" />
              <div class="flex justify-between text-xs text-slate-500 mt-2">
                <span>Progress</span>
                <span>{{ task.progress }}%</span>
              </div>
            </div>
          </ElSpace>
        </ElCard>
      </div>
    </ElSkeleton>
  </div>
</template>
