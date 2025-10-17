<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import * as d3 from 'd3'

type DataPoint = {
  date: string
  value: number
}

type ChartDatum = {
  date: Date
  value: number
}

const props = defineProps<{ data: DataPoint[] }>()
const chartRef = ref<HTMLDivElement | null>(null)
let resizeObserver: ResizeObserver | null = null

function renderChart() {
  if (!chartRef.value) return
  const container = chartRef.value
  container.innerHTML = ''

  const margin = { top: 16, right: 16, bottom: 24, left: 40 }
  const width = container.clientWidth || 560
  const height = 260
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const parseDate = d3.timeParse('%Y-%m-%d')
  const data: ChartDatum[] = props.data.map((d) => ({
    date: parseDate(d.date) ?? new Date(),
    value: d.value
  }))

  const x = d3
    .scaleTime()
  .domain(d3.extent<ChartDatum, Date>(data, (d: ChartDatum) => d.date) as [Date, Date])
    .range([0, innerWidth])

  const y = d3
    .scaleLinear()
  .domain([0, (d3.max<ChartDatum, number>(data, (d: ChartDatum) => d.value) ?? 0) * 1.2])
    .range([innerHeight, 0])

  const line = d3
    .line<ChartDatum>()
  .x((d: ChartDatum) => x(d.date))
  .y((d: ChartDatum) => y(d.value))
    .curve(d3.curveCatmullRom.alpha(0.8))

  const area = d3
    .area<ChartDatum>()
  .x((d: ChartDatum) => x(d.date))
    .y0(innerHeight)
  .y1((d: ChartDatum) => y(d.value))
    .curve(d3.curveCatmullRom.alpha(0.8))

  const gradientId = 'traffic-gradient'
  const gradient = svg
    .append('defs')
    .append('linearGradient')
    .attr('id', gradientId)
    .attr('x1', '0%')
    .attr('x2', '0%')
    .attr('y1', '0%')
    .attr('y2', '100%')

  gradient
    .append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#246BFD')
    .attr('stop-opacity', 0.35)

  gradient
    .append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#246BFD')
    .attr('stop-opacity', 0)

  g.append('path')
    .datum(data)
    .attr('fill', `url(#${gradientId})`)
    .attr('d', area)

  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#246BFD')
    .attr('stroke-width', 3)
    .attr('d', line)

  const xAxis = d3.axisBottom<Date>(x).ticks(6).tickPadding(10)
  const yAxis = d3.axisLeft<number>(y).ticks(5).tickPadding(10)

  g.append('g')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(xAxis)
    .call((gAxis: d3.Selection<SVGGElement, unknown, null, undefined>) =>
      gAxis.select('.domain').attr('stroke-opacity', 0)
    )

  g.append('g')
    .call(yAxis)
    .call((gAxis: d3.Selection<SVGGElement, unknown, null, undefined>) =>
      gAxis.select('.domain').attr('stroke-opacity', 0)
    )

  g.selectAll('.tick line')
    .attr('stroke', '#E2E8F0')
    .attr('stroke-dasharray', '2,4')
}

onMounted(() => {
  renderChart()
  if (chartRef.value) {
    resizeObserver = new ResizeObserver(() => renderChart())
    resizeObserver.observe(chartRef.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})

watch(
  () => props.data,
  () => renderChart(),
  { deep: true }
)
</script>

<template>
  <div ref="chartRef" class="w-full" />
</template>
