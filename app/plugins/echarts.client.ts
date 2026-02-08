import { BarChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
// ECharts 按需注册
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

import { defineNuxtPlugin } from '#app'

// 注册你用到的能力
use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent])

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VChart', VChart)
})
