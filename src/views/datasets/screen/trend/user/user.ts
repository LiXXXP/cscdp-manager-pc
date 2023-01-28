import { ref, reactive } from 'vue'
import * as echarts from 'echarts/core'
import { TitleComponent, GridComponent, DataZoomComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { trendState } from '@/views/datasets/screen/trend/trend'

echarts.use([TitleComponent, GridComponent, DataZoomComponent, BarChart, CanvasRenderer])

export const userState = reactive({
  option: {}
})

export const useUserMethod = () => {
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
    userState.option = {
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
        data: trendState.userTrendData.xAxisData
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
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#00FFF6' },
              { offset: 0.5, color: '#40D0FD' },
              { offset: 1, color: '#40D0FD' }
            ]),
            borderRadius: [6]
          },
          data: trendState.userTrendData.seriesData
        }
      ]
    }
    userState.option && myChart.value.setOption(userState.option)
  }
  return {
    myChart,
    initECharts
  }
}
