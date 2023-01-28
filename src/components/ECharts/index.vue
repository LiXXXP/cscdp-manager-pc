<template>
  <div ref="myChart" class="gwin-platform-echarts" :style="{ height: props.height }"></div>
</template>

<script lang="ts" setup>
import { ref, markRaw, watchEffect } from 'vue'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { UniversalTransition, LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  PieChart,
  BarChart,
  LineChart,
  LabelLayout,
  GridComponent,
  TitleComponent,
  CanvasRenderer,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  UniversalTransition
])

interface Props {
  option: any
  height: string
}

const myChart = ref()
const props = defineProps<Props>()

watchEffect(() => {
  myChart.value && initECharts()
})

/**
 * init echarts
 */
const initECharts = () => {
  const myEChart = markRaw(echarts.init(myChart.value))

  window.onresize = function () {
    myEChart.resize()
  }

  window.addEventListener('resize', function () {
    myEChart.resize()
  })

  // 绘制图表
  props.option && myEChart.setOption(props.option)
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('echarts') {
  width: 100%;
}
</style>
