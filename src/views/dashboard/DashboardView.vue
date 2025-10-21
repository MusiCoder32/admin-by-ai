<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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

</script>

<template>
  <div class="dashboard">
    <section class="dashboard__grid">
      <article class="dashboard-card">
        <header class="dashboard-card__header">
          <div>
            <h2>{{ t('dashboard.companyFacts') }}</h2>
            <p>{{ t('dashboard.employees') }}</p>
          </div>
        </header>
        <div class="dashboard-card__chart">
          <button class="chart-nav chart-nav--left" type="button" aria-label="Previous dataset">
            <i class="i-carbon-chevron-left" aria-hidden="true" />
          </button>
          <StackedAreaChart :series="areaSeries" />
          <button class="chart-nav chart-nav--right" type="button" aria-label="Next dataset">
            <i class="i-carbon-chevron-right" aria-hidden="true" />
          </button>
        </div>
        <footer class="dashboard-card__footer">
          <div class="legend">
            <span v-for="item in areaSeries" :key="item.name" class="legend__item">
              <span class="legend__color" :style="{ backgroundColor: item.color }" />
              <span>{{ item.name }}</span>
            </span>
          </div>
          <div class="pagination" role="group" aria-label="Dataset pagination">
            <span class="pagination__dot is-active" />
            <span class="pagination__dot" />
            <span class="pagination__dot" />
          </div>
        </footer>
      </article>

      <article class="dashboard-card">
        <header class="dashboard-card__header">
          <h2>{{ t('dashboard.statistics') }}</h2>
        </header>
        <div class="dashboard-card__chart">
          <button class="chart-nav chart-nav--left" type="button" aria-label="Previous dataset">
            <i class="i-carbon-chevron-left" aria-hidden="true" />
          </button>
          <DonutChart :slices="donutSlices" />
          <button class="chart-nav chart-nav--right" type="button" aria-label="Next dataset">
            <i class="i-carbon-chevron-right" aria-hidden="true" />
          </button>
        </div>
        <footer class="dashboard-card__footer">
          <div class="legend legend--wrap">
            <span v-for="slice in donutSlices" :key="slice.name" class="legend__item">
              <span class="legend__color" :style="{ backgroundColor: slice.color }" />
              <span>{{ slice.name }}</span>
            </span>
          </div>
          <div class="pagination" role="group" aria-label="Dataset pagination">
            <span class="pagination__dot is-active" />
            <span class="pagination__dot" />
            <span class="pagination__dot" />
          </div>
        </footer>
      </article>

      <article class="dashboard-card dashboard-card--empty">
        <header class="dashboard-card__header">
          <h2>{{ t('dashboard.assignedRisks') }}</h2>
        </header>
        <div class="empty-state">{{ t('dashboard.noRisks') }}</div>
      </article>

      <article class="dashboard-card dashboard-card--empty">
        <header class="dashboard-card__header">
          <h2>{{ t('dashboard.assignedActionItems') }}</h2>
        </header>
        <div class="empty-state">{{ t('dashboard.noActions') }}</div>
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
  padding: 24px 24px 32px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #dee3ee;
  box-shadow: 0 12px 28px rgba(31, 41, 55, 0.08);
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
  line-height: 30px;
  letter-spacing: 0.15px;
  font-weight: 500;
  color: #1f2937;
}

.dashboard-card__header p {
  margin: 4px 0 0;
  font-size: 16px;
  color: #8e8e93;
}

.dashboard-card__chart {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
}

.chart-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: 1px solid #dee3ee;
  background: #ffffff;
  color: #8e8e93;
  box-shadow: 0 8px 24px rgba(31, 41, 55, 0.08);
  cursor: pointer;
}

.chart-nav--left {
  left: 16px;
}

.chart-nav--right {
  right: 16px;
}

.dashboard-card__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.legend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.legend--wrap {
  max-width: 100%;
}

.legend__item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4f4f4f;
}

.legend__color {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.pagination__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d1d1d6;
  transition: background-color 0.2s ease;
}

.pagination__dot.is-active {
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
