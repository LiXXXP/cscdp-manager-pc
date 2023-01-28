import { ref, reactive } from 'vue'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { trendState } from '@/views/datasets/screen/trend/trend'

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

export const poiState = reactive({
  option: {}
})

export const usePoiMethod = () => {
  const myChart = ref()

  /**
   * 初始化 echarts
   */
  const initECharts = () => {
    myChart.value = echarts.init(myChart.value)

    // 绘制图表
    setOption()
  }

  /**
   * echarts 配置项
   */
  const setOption = () => {
    poiState.option = {
      grid: {
        top: '10',
        left: '3%',
        right: '20',
        bottom: '20',
        containLabel: true
      },
      tooltip: {
        show: true
      },
      xAxis: {
        boundaryGap: false,
        axisLabel: {
          color: '#fff'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#39456A'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#39456A',
            type: 'dashed'
          }
        },
        data: trendState.poiTrendData.xAxisData
      },
      yAxis: {
        axisLabel: {
          show: true,
          margin: 9,
          color: '#fff'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#39456A'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#39456A',
            type: 'dashed'
          }
        }
      },
      series: [
        {
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          sampling: 'average',
          itemStyle: {
            color: '#007BFF'
          },
          stack: 'a',
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(0, 123, 255, 0.2)'
              },
              {
                offset: 1,
                color: 'rgba(0, 123, 255, 0)'
              }
            ])
          },
          data: trendState.poiTrendData.seriesData
        }
      ]
    }
    poiState.option && myChart.value.setOption(poiState.option)
  }
  return {
    myChart,
    initECharts
  }
}
