<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import * as d3 from 'd3'

type DonutSlice = {
  name: string
  value: number
  color: string
}

const props = defineProps<{ slices: DonutSlice[] }>()

const containerRef = ref<HTMLDivElement | null>(null)
let resizeObserver: ResizeObserver | null = null

const drawChart = () => {
  if (!containerRef.value) return
  const host = containerRef.value
  const rect = host.getBoundingClientRect()
  const size = Math.min(rect.width, rect.height)
  const radius = size / 2

  host.innerHTML = ''

  const svg = d3
    .select(host)
    .append('svg')
    .attr('width', rect.width)
    .attr('height', rect.height)
    .append('g')
    .attr('transform', `translate(${rect.width / 2}, ${rect.height / 2})`)

  const arc = d3
    .arc<d3.PieArcDatum<DonutSlice>>()
    .innerRadius(radius * 0.55)
    .outerRadius(radius * 0.9)
    .cornerRadius(6)

  const pie = d3
    .pie<DonutSlice>()
    .value(d => d.value)
    .sort(null)

  svg
    .selectAll('path')
    .data(pie(props.slices))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => d.data.color)

  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr('font-size', 16)
    .attr('font-weight', 500)
    .attr('fill', '#4F4F4F')
    .text('Projects by account')
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
  () => props.slices,
  () => {
    drawChart()
  },
  { deep: true }
)
</script>

<template>
  <div ref="containerRef" class="donut-container"></div>
</template>

<style scoped>
.donut-container {
  width: 100%;
  height: 260px;
}
</style>
