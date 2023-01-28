import { reactive, onMounted } from 'vue'
import api from '@/api/datasets/poi'
export const poiState = () => {
  const dateTime = reactive({
    startDate: '',
    endDate: ''
  })
  // 增长趋势数据
  const chartsDataObj = reactive(<any>{
    option: {}
  })
  // POI详情浏览趋势数据
  const poichartsObj = reactive(<any>{
    option: {}
  })

  // 增长趋势接口
  const getChartsData = async () => {
    const params = {
      startDate: dateTime.startDate,
      endDate: dateTime.endDate
    }
    const res = await api.adminWelfareTrendListInquiry(params)
    const xAxis = []
    const series: any = {
      totalPoi: [],
      addedPoi: [],
      totalDonate: [],
      addedDonate: [],
      totalAed: [],
      addedAed: []
    }
    for (const item of res.body.dataList) {
      xAxis.push(item.date)
      for (const k of Object.keys(item)) {
        if (k !== 'date') {
          series[k].push(item[k])
        }
      }
    }
    const legend = ['总POI点数', '新增POI点数', '捐助点数', '新增捐助点数', 'AED点数', '新增AED点数']
    const seriesData = [
      {
        name: '总POI点数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.totalPoi
      },
      {
        name: '新增POI点数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.addedPoi
      },
      {
        name: '捐助点数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.totalDonate
      },
      {
        name: '新增捐助点数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.addedDonate
      },
      {
        name: 'AED点数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.totalAed
      },
      {
        name: '新增AED点数',
        type: 'line',
        label: {
          show: true,
          postion: 'middle',
          color: 'black'
        },
        data: series.addedAed
      }
    ]
    setOption(chartsDataObj, '增长趋势', xAxis, seriesData, legend)
  }

  // POI详情浏览趋势接口
  const getPoiIncrease = async () => {
    const params = {
      startDate: dateTime.startDate,
      endDate: dateTime.endDate
    }
    const res = await api.adminWelfareBrowseListInquiry(params)
    const xAxis = []
    const series: any = {
      totalBrowseCount: [],
      addedBrowseCount: [],
      totalBrowseUser: [],
      addedBroseUser: []
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
        data: series.addedBroseUser
      }
    ]
    setOption(poichartsObj, 'POI点详情浏览趋势', xAxis, seriesData, legend)
  }

  /**
   * charts 配置
   */
  const setOption = (key: any, title: string, xAxis: any, seriesData: any, legend: any) => {
    key.option = {
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
    dateTime.startDate = form[0]
    dateTime.endDate = form[1]
    getChartsData()
    getPoiIncrease()
  }
  const yearMonthChange = (form: any) => {
    dateTime.startDate = form[0]
    dateTime.endDate = form[1]
    getChartsData()
    getPoiIncrease()
  }

  onMounted(() => {
    getChartsData()
    getPoiIncrease()
  })
  return {
    chartsDataObj,
    poichartsObj,
    dateChange,
    yearMonthChange
  }
}
