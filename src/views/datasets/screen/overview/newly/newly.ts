import { reactive } from 'vue'
import ScreenApi from '@/api/screen/screen'
import { NewlyState } from './interface'

export const newlyState = reactive<NewlyState>({
  newlyList: []
})

export const useNewlyMethod = () => {
  /**
   * 获取新增统计
   */
  const getSummaryInquiry = async () => {
    const res = await ScreenApi.adminHomeSummaryInquiry()
    newlyState.newlyList = [
      {
        name: '今日新增图文数',
        data: res.body.todayText
      },
      {
        name: '今日新增视频数',
        data: res.body.todayVideo
      },
      {
        name: '今日新增用户数',
        data: res.body.todayUser
      },
      {
        name: '今日新增POI数',
        data: res.body.todayWelfare
      }
    ]
  }
  return {
    getSummaryInquiry
  }
}
