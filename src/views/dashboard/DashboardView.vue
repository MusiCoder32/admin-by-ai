<script setup lang="ts">
import { computed } from 'vue'
import StackedAreaChart from '@/components/charts/StackedAreaChart.vue'
import DonutChart from '@/components/charts/DonutChart.vue'

const areaSeries = [
  {
    name: 'Paris',
    color: '#F2994A',
    values: [
      { year: 2016, value: 120 },
      { year: 2017, value: 160 },
      { year: 2018, value: 190 },
      { year: 2019, value: 220 }
    ]
  },
  {
    name: 'Bangkok',
    color: '#56CCF2',
    values: [
      { year: 2016, value: 80 },
      { year: 2017, value: 110 },
      { year: 2018, value: 130 },
      { year: 2019, value: 150 }
    ]
  },
  {
    name: 'San Francisco',
    color: '#9B51E0',
    values: [
      { year: 2016, value: 140 },
      { year: 2017, value: 200 },
      { year: 2018, value: 230 },
      { year: 2019, value: 337 }
    ]
  }
]

const donutSlices = [
  { name: 'KFC', value: 12, color: '#F2C94C' },
  { name: 'FIAT-Chrysler LLC', value: 14, color: '#EB5757' },
  { name: 'KLM', value: 10, color: '#BB6BD9' },
  { name: 'Aeroflot', value: 11, color: '#27AE60' },
  { name: 'Lukoil', value: 8, color: '#2D9CDB' },
  { name: 'American Express', value: 9, color: '#A84069' },
  { name: 'Daimler', value: 7, color: '#00B2A9' }
]

const totalEmployees = computed(() =>
  areaSeries.reduce((sum, series) => sum + series.values[series.values.length - 1].value, 0)
)
</script>

<template>
  <div class="dashboard">
    <section class="dashboard__grid">
      <article class="dashboard-card">
        <header class="dashboard-card__header">
          <div>
            <h2>Company Facts</h2>
            <p>Employees</p>
          </div>
          <div class="card-actions">
            <i class="i-carbon-chevron-left" />
            <i class="i-carbon-chevron-right" />
          </div>
        </header>
        <StackedAreaChart :series="areaSeries" />
        <footer class="dashboard-card__footer">
          <div class="legend">
            <span v-for="item in areaSeries" :key="item.name" class="legend__item">
              <span :style="{ backgroundColor: item.color }"></span>
              {{ item.name }}
            </span>
          </div>
          <div class="pagination">
            <span class="active" />
            <span />
            <span />
          </div>
        </footer>
      </article>

      <article class="dashboard-card">
        <header class="dashboard-card__header">
          <h2>Statistics</h2>
          <div class="card-actions">
            <i class="i-carbon-chevron-left" />
            <i class="i-carbon-chevron-right" />
          </div>
        </header>
        <DonutChart :slices="donutSlices" />
        <footer class="dashboard-card__footer">
          <div class="legend legend--wrap">
            <span v-for="slice in donutSlices" :key="slice.name" class="legend__item">
              <span :style="{ backgroundColor: slice.color }"></span>
              {{ slice.name }}
            </span>
          </div>
          <div class="pagination">
            <span class="active" />
            <span />
            <span />
          </div>
        </footer>
      </article>

      <article class="dashboard-card dashboard-card--empty">
        <header class="dashboard-card__header">
          <h2>Assigned Risks</h2>
        </header>
        <div class="empty-state">There are no risks assigned.</div>
      </article>

      <article class="dashboard-card dashboard-card--empty">
        <header class="dashboard-card__header">
          <h2>Assigned Action Items</h2>
        </header>
        <div class="empty-state">There are no action items assigned.</div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.dashboard__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.dashboard-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e2e7f2;
  box-shadow: 0 2px 8px rgba(46, 50, 66, 0.08);
}

.dashboard-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.dashboard-card__header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: #1f2937;
}

.dashboard-card__header p {
  margin: 4px 0 0;
  font-size: 16px;
  color: #8e8e93;
}

.card-actions {
  display: flex;
  gap: 8px;
  color: #8e8e93;
}

.card-actions i {
  font-size: 20px;
}

.dashboard-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.legend {
  display: flex;
  gap: 16px;
  flex-wrap: nowrap;
}

.legend--wrap {
  flex-wrap: wrap;
}

.legend__item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4f4f4f;
}

.legend__item span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.pagination {
  display: flex;
  gap: 8px;
}

.pagination span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d1d1d6;
  display: inline-block;
}

.pagination .active {
  background: #2f80ed;
}

.dashboard-card--empty {
  justify-content: center;
  min-height: 260px;
}

.empty-state {
  width: 100%;
  text-align: center;
  color: #8e8e93;
  font-size: 12px;
}

@media (max-width: 1200px) {
  .dashboard__grid {
    grid-template-columns: 1fr;
  }
}
</style>
