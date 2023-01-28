import { reactive } from 'vue'
import api from '@/api/datasets/user'

export const userState = reactive(<any>{
  dateTime: { startDate: '', endDate: '' },
  totalObj: { totalUser: '', totalEnterprise: '' },
  tableData: [],
  option: {}
})

export const useUserMethod = () => {
  /**
   * 汇总统计
   */
  const getUserSummaryInquiry = async () => {
    const res = await api.adminUserSummaryInquiry({})
    userState.totalObj.totalUser = res.body.totalUser
    userState.totalObj.totalEnterprise = res.body.totalEnterprise
  }

  /**
   * 趋势分布
   */
  const getUserTrendListInquiry = async () => {
    const params = {
      startDate: userState.dateTime.startDate,
      endDate: userState.dateTime.endDate
    }
    const res = await api.adminUserTrendListInquiry(params)
    userState.tableData = res.body.dataList
    const xAxis = []
    const series: any = {
      totalUser: [],
      addedUser: [],
      activeUser: [],
      totalEnterprise: [],
      addedEnterPrise: []
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
   * charts 配置
   */
  const setOption = (xAxis: any, series: any) => {
    userState.option = {
      title: {
        text: '用户增长趋势',
        textStyle: {
          fontSize: 16
        }
      },
      legend: {
        data: ['总个人用户数(人)', '新增个人用户数(人)', '日活个人用户数(人)', '总企业数', '新增企业数']
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
          name: '总个人用户数(人)',
          type: 'line',
          label: {
            show: true,
            postion: 'middle',
            color: 'black'
          },
          data: series.totalUser
        },
        {
          name: '新增个人用户数(人)',
          type: 'line',
          label: {
            show: true,
            postion: 'middle',
            color: 'black'
          },
          data: series.addedUser
        },
        {
          name: '日活个人用户数(人)',
          type: 'line',
          label: {
            show: true,
            postion: 'middle',
            color: 'black'
          },
          data: series.activeUser
        },
        {
          name: '总企业数',
          type: 'line',
          label: {
            show: true,
            postion: 'middle',
            color: 'black'
          },
          data: series.totalEnterprise
        },
        {
          name: '新增企业数',
          type: 'line',
          label: {
            show: true,
            postion: 'middle',
            color: 'black'
          },
          data: series.addedEnterPrise
        }
      ]
    }
  }

  const dateChange = (form: any) => {
    userState.dateTime.startDate = form[0]
    userState.dateTime.endDate = form[1]
    getUserTrendListInquiry()
  }

  const yearMonthChange = (form: any) => {
    userState.dateTime.startDate = form[0]
    userState.dateTime.endDate = form[1]
    getUserTrendListInquiry()
  }

  return {
    getUserSummaryInquiry,
    getUserTrendListInquiry,
    dateChange,
    yearMonthChange
  }
}
