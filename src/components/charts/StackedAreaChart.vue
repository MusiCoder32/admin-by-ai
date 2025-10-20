<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import * as d3 from 'd3'

type SeriesPoint = {
  year: number
  value: number
}

type AreaSeries = {
  name: string
  color: string
  values: SeriesPoint[]
}

const props = defineProps<{ series: AreaSeries[] }>()

const containerRef = ref<HTMLDivElement | null>(null)
let resizeObserver: ResizeObserver | null = null

const drawChart = () => {
  if (!containerRef.value) return
  const host = containerRef.value
  const rect = host.getBoundingClientRect()
  const width = rect.width
  const height = rect.height

  host.innerHTML = ''

  const svg = d3
    .select(host)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const years: number[] = props.series[0]?.values.map((point: SeriesPoint) => point.year) ?? []
  const keys: string[] = props.series.map((_series: AreaSeries, index: number) => index.toString())
  const dataset = years.map((year: number) => {
    const entry: Record<string, number> = { year }
    props.series.forEach((series: AreaSeries, idx: number) => {
      entry[idx.toString()] =
        series.values.find((point: SeriesPoint) => point.year === year)?.value ?? 0
    })
    return entry
  })

  const stackedData = d3
    .stack<Record<string, number>, string>()
    .keys(keys)
    .value((d: Record<string, number>, key: string) => d[key] ?? 0)

  type StackPoint = d3.SeriesPoint<Record<string, number>>
  type StackSeries = d3.Series<Record<string, number>, string>

  const layers: StackSeries[] = stackedData(dataset)

  const maxY =
    d3.max(layers, (layer: StackSeries) =>
      d3.max(layer, (d: StackPoint) => d[1])
    ) ?? 0

  const xScale = d3
    .scalePoint<number>()
    .domain(years)
    .range([48, width - 24])

  const yScale = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([height - 40, 40])

  const area = d3
    .area<StackPoint>()
    .x((_d: StackPoint, i: number) => xScale(years[i]) ?? 0)
    .y0((d: StackPoint) => yScale(d[0]))
    .y1((d: StackPoint) => yScale(d[1]))
    .curve(d3.curveCatmullRom.alpha(0.5))

  layers.forEach((layer: d3.Series<Record<string, number>, string>, index: number) => {
    svg
      .append('path')
      .attr('d', area(layer) ?? '')
      .attr('fill', props.series[index].color)
      .attr('fill-opacity', 0.85)
  })

  const axisGroup = svg.append('g')

  yScale.ticks(4).forEach((tick: number) => {
    axisGroup
      .append('line')
      .attr('x1', 48)
      .attr('x2', width - 24)
      .attr('y1', yScale(tick))
      .attr('y2', yScale(tick))
      .attr('stroke', '#D1D1D6')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', tick === 0 ? '0' : '4 4')
  })

  axisGroup
    .selectAll('text.y-label')
    .data(yScale.ticks(4))
    .enter()
    .append('text')
    .attr('class', 'y-label')
    .attr('x', width - 16)
    .attr('y', (tick: number) => yScale(tick) + 4)
    .attr('text-anchor', 'end')
    .attr('fill', '#4F4F4F')
    .attr('font-size', 14)
    .text((tick: number) => tick)

  const total = props.series.reduce((sum: number, series: AreaSeries) => {
    const last = series.values[series.values.length - 1]
    return sum + (last?.value ?? 0)
  }, 0)

  svg
    .append('text')
    .attr('x', width - 16)
    .attr('y', 32)
    .attr('text-anchor', 'end')
    .attr('fill', '#4F4F4F')
    .attr('font-size', 14)
    .text(`Total ${total}`)

  svg
    .append('text')
    .attr('x', width - 16)
    .attr('y', 16)
    .attr('text-anchor', 'end')
    .attr('fill', '#8E8E93')
    .attr('font-size', 12)
    .text('Employees')

  svg
    .append('g')
    .selectAll('text.x-label')
    .data(years)
    .enter()
    .append('text')
    .attr('class', 'x-label')
    .attr('x', (year: number) => xScale(year) ?? 0)
    .attr('y', height - 12)
    .attr('text-anchor', 'middle')
    .attr('fill', '#4F4F4F')
    .attr('font-size', 14)
    .text((year: number) => year)
}

onMounted(() => {
  drawChart()
  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => drawChart())
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})

watch(
  () => props.series,
  () => {
    drawChart()
  },
  { deep: true }
)
</script>

<template>
  <div ref="containerRef" class="chart-container"></div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 260px;
}
</style>
