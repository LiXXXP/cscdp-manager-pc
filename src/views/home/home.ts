import { reactive } from 'vue'
import api from '@/api/home/index'
import { HomeState } from './interface'

export const homeState = reactive(<HomeState>{
  collectData: [],
  option: {}
})

export const useHomeMethod = () => {
  /**
   * 汇总统计
   */
  const getHomeSummaryInquiry = async () => {
    const res = await api.adminHomeSummaryInquiry({})
    homeState.collectData = [
      {
        title: '用户数',
        sum: res.body.totalUser,
        today: res.body.todayUser
      },
      {
        title: '内容数',
        sum: res.body.totalNews,
        today: res.body.todayNews
      },
      {
        title: 'POI点数',
        sum: res.body.totalWelfare,
        today: res.body.todayWelfare
      }
    ]
  }

  /**
   * 趋势分布
   */
  const getHomeTrendListInquiry = async () => {
    const res = await api.adminHomeTrendListInquiry({})
    const xAxis = []
    const series: any = {
      currentNews: [],
      addedNews: [],
      currentUser: [],
      addedUser: [],
      currentWelfare: [],
      addedWelfare: []
    }
    for (const item of res.body.dataList) {
      xAxis.push(item.date)
      for (const k of Object.keys(item)) {
        if (k !== 'date') {
          series[k].push(item[k])
        }
      }
    }
    setOption(xAxis, series)
  }

  /**
   *
   */
  const setOption = (xAxis: any, series: any) => {
    homeState.option = {
      title: {
        text: '趋势分布',
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        data: ['当前内容数', '新增内容数', '当前用户量', '新增用户量', '当前POI点数', '新增POI点数']
      },
      tooltip: {
        show: true
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        data: xAxis
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '当前内容数',
          type: 'line',
          label: {
            show: true,
            postion: 'middle',
            color: 'black'
          },
          data: series.currentNews
        },
        {
          name: '新增内容数',
          type: 'line',
          label: {
            show: true,
            postion: 'middle',
            color: 'black'
          },
          data: series.addedNews
        },
        {
          name: '当前用户量',
          type: 'line',
          label: {
            show: true,
            postion: 'middle',
            color: 'black'
          },
          data: series.currentUser
        },
        {
          name: '新增用户量',
          type: 'line',
          label: {
            show: true,
            postion: 'middle',
            color: 'black'
          },
          data: series.addedUser
        },
        {
          name: '当前POI点数',
          type: 'line',
          label: {
            show: true,
            postion: 'middle',
            color: 'black'
          },
          data: series.currentWelfare
        },
        {
          name: '新增POI点数',
          type: 'line',
          label: {
            show: true,
            postion: 'middle',
            color: 'black'
          },
          data: series.addedWelfare
        }
      ]
    }
  }

  return {
    getHomeSummaryInquiry,
    getHomeTrendListInquiry
  }
}
