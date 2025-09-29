<!-- .vuepress/components/MonthlyChart.vue -->
<template>
  <v-chart autoresize :option="chartOption" style="width: 100%; height: 600px;"></v-chart>
</template>

<script setup>
import { useSiteData } from 'vuepress/client'

import { computed } from 'vue'
import { use } from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { GridComponent, TooltipComponent  } from 'echarts/components';



// 注册 ECharts 组件
use([BarChart, LineChart, CanvasRenderer, TooltipComponent, GridComponent])

const sietData  = useSiteData()
const allPosts = computed(() => sietData.value.posts || [])

console.log(allPosts)

// 按月统计文章数量
const monthlyData = computed(() => {
  const counts = {}
  
  allPosts.value.forEach(page => {
    if (page.frontmatter.date) {
      const date = new Date(page.frontmatter.date)
      const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
      counts[month] = (counts[month] || 0) + 1
    }
  })
  console.log(counts)
  return Object.entries(counts).sort()
})

const chartOption = computed(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  xAxis: {
    type: 'category',
    data: monthlyData.value.map(([month]) => month)
  },
  yAxis: {
    type: 'value',
    name: '文章数量',
    min: 0,
    interval: 1
  },
  series: [{
    type: 'line',
    data: monthlyData.value.map(([, count]) => count),
    name: '博客文章'
  }]
}))
</script>

<style scoped>
</style>