import { reactive, onMounted } from 'vue'
import api from '@/api/datasets/content'
export const pieChartState = () => {
  // 内容类型饼状图
  const contentPieData = reactive(<any>{
    option: {}
  })
  // 内容栏目饼状图
  const partPieData = reactive(<any>{
    option: {}
  })
  // 内容数据汇总
  const contentCountObj = reactive({
    todayBrowseCount: '',
    todayBrowseUser: '',
    totalBrowseCount: '',
    totalBrowseUser: ''
  })

  onMounted(() => {
    typeSummaryInquiry()
    summaryInquiry()
    contentCountInfo()
  })

  // 内容类型接口
  const typeSummaryInquiry = async () => {
    const res = await api.adminNewsTypeSummaryInquiry({})
    setOption(contentPieData, '内容类型分布', res.body.dataList)
  }
  // 内容栏目接口
  const summaryInquiry = async () => {
    const res = await api.adminNewsCategorySummaryInquiry({})
    setOption(partPieData, '内容栏目分布', res.body.dataList)
  }
  // 内容汇总接口
  const contentCountInfo = async () => {
    const res = await api.adminNewsBrowseSummaryInquiry({})
    contentCountObj.todayBrowseCount = res.body.todayBrowseCount
    contentCountObj.todayBrowseUser = res.body.todayBrowseUser
    contentCountObj.totalBrowseCount = res.body.totalBrowseCount
    contentCountObj.totalBrowseUser = res.body.totalBrowseUser
  }

  /**
   * charts 配置
   */
  const setOption = (key: any, title: string, series: any) => {
    key.option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'item'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: series,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  return {
    contentPieData,
    partPieData,
    contentCountObj
  }
}
