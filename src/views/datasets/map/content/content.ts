import { reactive } from 'vue'
import api from '@/api/datasets/content'

export const contentState = reactive(<any>{
  dateTime: { startDate: '', endDate: '' },
  limitTable: [],
  personTable: [],
  newsOption: {},
  browseOption: {}
})

export const useContentMethod = () => {
  /**
   * 次数排名表格接口
   */
  const limitTableInfo = async () => {
    const params = {
      startDate: contentState.dateTime.startDate,
      endDate: contentState.dateTime.endDate,
      type: 1
    }
    const res = await api.adminNewsBrowseOrderListInquiry(params)
    contentState.limitTable = res.body.dataList
  }

  /**
   * 人次排名接口
   */
  const personTableInfo = async () => {
    const params = {
      startDate: contentState.dateTime.startDate,
      endDate: contentState.dateTime.endDate,
      type: 2
    }
    const res = await api.adminNewsBrowseOrderListInquiry(params)
    contentState.personTable = res.body.dataList
  }

  /**
   * 增长趋势接口
   */
  const getNewsTrendListInquiry = async () => {
    const params = {
      startDate: contentState.dateTime.startDate,
      endDate: contentState.dateTime.endDate
    }
    const res = await api.adminNewsTrendListInquiry(params)
    const xAxis = []
    const series: any = {
      totalNews: [],
      addedNews: [],
      totalText: [],
      addedText: [],
      totalVideo: [],
      addedVideo: []
    }
    for (const item of res.body.dataList) {
      xAxis.push(item.date)
      for (const k of Object.keys(item)) {
        if (k !== 'date') {
          series[k].push(item[k])
        }
      }
    }
    const legend = ['总内容数', '新增内容数', '总图文数', '新增图文数', '总视频数', '新增视频数']
    const seriesData = [
      {
        name: '总内容数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.totalNews
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
        name: '总图文数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.totalText
      },
      {
        name: '新增图文数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.addedText
      },
      {
        name: '总视频数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.totalVideo
      },
      {
        name: '新增视频数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.addedVideo
      }
    ]
    setOption('newsOption', '增长趋势', xAxis, seriesData, legend)
  }

  /**
   * 内容消费趋势接口
   */
  const getNewsBrowseListInquiry = async () => {
    const params = {
      startDate: contentState.dateTime.startDate,
      endDate: contentState.dateTime.endDate
    }
    const res = await api.adminNewsBrowseListInquiry(params)
    const xAxis = []
    const series: any = {
      totalBrowseCount: [],
      addedBrowseCount: [],
      totalBrowseUser: [],
      addedBrowseUser: []
    }
    for (const item of res.body.dataList) {
      xAxis.push(item.date)
      for (const k of Object.keys(item)) {
        if (k !== 'date') {
          series[k].push(item[k])
        }
      }
    }
    const legend = ['总浏览次数', '新增浏览次数', '总浏览人数', '新增浏览人数']
    const seriesData = [
      {
        name: '总浏览次数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.totalBrowseCount
      },
      {
        name: '新增浏览次数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.addedBrowseCount
      },
      {
        name: '总浏览人数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.totalBrowseUser
      },
      {
        name: '新增浏览人数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.addedBrowseUser
      }
    ]
    setOption('browseOption', '内容消费趋势', xAxis, seriesData, legend)
  }

  /**
   * charts 配置
   */
  const setOption = (key: any, title: string, xAxis: any, seriesData: any, legend: any) => {
    contentState[key] = {
      title: {
        text: title,
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        data: legend
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
      series: seriesData
    }
  }

  const dateChange = (form: any) => {
    contentState.dateTime.startDate = form[0]
    contentState.dateTime.endDate = form[1]
    getNewsTrendListInquiry()
    getNewsBrowseListInquiry()
    limitTableInfo()
    personTableInfo()
  }

  const yearMonthChange = (form: any) => {
    contentState.dateTime.startDate = form[0]
    contentState.dateTime.endDate = form[1]
    getNewsTrendListInquiry()
    getNewsBrowseListInquiry()
    limitTableInfo()
    personTableInfo()
  }

  return {
    limitTableInfo,
    personTableInfo,
    getNewsTrendListInquiry,
    dateChange,
    yearMonthChange,
    getNewsBrowseListInquiry
  }
}
