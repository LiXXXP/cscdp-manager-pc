import { reactive } from 'vue'
import ScreenApi from '@/api/screen/screen'

interface TrendState {
  userTrendData: Params
  newsTrendData: Params
  poiTrendData: Params
}

interface Params {
  xAxisData: string[]
  seriesData: any[]
}

export const trendState = reactive(<TrendState>{
  userTrendData: {}, // 个人用户增长趋势
  newsTrendData: {}, // 新增内容浏览增长趋势
  poiTrendData: {} // poi 点浏览增长趋势
})

export const useTrendMethod = () => {
  /**
   * 获取7天增长趋势
   */
  const getWeekTrendListInquiry = async () => {
    const res = await ScreenApi.adminWeekTrendListInquiry()
    // 个人用户增长趋势
    setTrendData(res.body.userTrendDataList, trendState.userTrendData)
    // 新增内容浏览增长趋势
    setTrendData(res.body.newsTrendDataList, trendState.newsTrendData)
    // poi 点浏览增长趋势
    setTrendData(res.body.poiTrendDataList, trendState.poiTrendData)
  }

  /**
   * 个人用户增长趋势
   */
  const setTrendData = (data: any, vars: any) => {
    vars.xAxisData = []
    vars.seriesData = []
    if (!data?.length) return
    for (const item of data) {
      vars.xAxisData.push(item.date.slice(8))
      vars.seriesData.push(item.value)
    }
  }

  return {
    getWeekTrendListInquiry
  }
}
