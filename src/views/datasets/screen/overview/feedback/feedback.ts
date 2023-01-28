import { reactive } from 'vue'
import ScreenApi from '@/api/screen/screen'

interface FeedbackState {
  noProcessing: number
  processed: number
}

export const feedbackState = reactive<FeedbackState>({
  noProcessing: 0,
  processed: 0
})

export const useFeedbackMethod = () => {
  /**
   * 获取反馈问题统计
   */
  const getFeedbackSummaryInquiry = async () => {
    const res = await ScreenApi.adminFeedbackSummaryInquiry()
    feedbackState.noProcessing = res.body.noProcessing
    feedbackState.processed = res.body.processed
  }
  return {
    getFeedbackSummaryInquiry
  }
}
