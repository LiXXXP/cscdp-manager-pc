import { reactive, onMounted } from 'vue'
import api from '@/api/datasets/content'

export const headerState = () => {
  // 汇总统计数据
  const statisticsObj = reactive({
    totalNews: '',
    totalText: '',
    totalVideo: ''
  })
  // 汇总统计接口
  const statisticsInfo = async () => {
    const res = await api.adminNewsSummaryInquiry({})
    statisticsObj.totalNews = res.body.totalNews
    statisticsObj.totalText = res.body.totalText
    statisticsObj.totalVideo = res.body.totalVideo
  }
  onMounted(() => {
    statisticsInfo()
  })
  return {
    statisticsObj
  }
}
