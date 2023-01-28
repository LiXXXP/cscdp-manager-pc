import { Request } from '@gwin/networking'
import { AdminWelfareQuantityListInquiry } from './interface'

class ScreenApi {
  // 后台大屏总览查询
  async adminOverviewInquiry() {
    const request = new Request<any>({
      url: '/api/csca/v1/AdminOverviewInquiry',
      method: 'post',
      isLoading: true,
      isMessage: true,
      isError: false
    })
    return await request.start()
  }

  // 反馈问题
  async adminFeedbackSummaryInquiry() {
    const request = new Request<any>({
      url: '/api/csca/v1/AdminFeedbackSummaryInquiry',
      method: 'post',
      isLoading: true,
      isMessage: true,
      isError: false
    })
    return await request.start()
  }

  // 新增数统计
  async adminHomeSummaryInquiry() {
    const request = new Request<any>({
      url: '/api/csca/v1/AdminHomeSummaryInquiry',
      method: 'post',
      isLoading: true,
      isMessage: true,
      isError: false
    })
    return await request.start()
  }

  // 7天增长趋势
  async adminWeekTrendListInquiry() {
    const request = new Request<any>({
      url: '/api/csca/v1/AdminWeekTrendListInquiry',
      method: 'post',
      isLoading: true,
      isMessage: true,
      isError: false
    })
    return await request.start()
  }

  // 后台POI点数量列表查询
  async adminWelfareQuantityListInquiry(params: AdminWelfareQuantityListInquiry) {
    const request = new Request<any>({
      url: '/api/csca/v1/AdminWelfareQuantityListInquiry',
      method: 'post',
      params: params,
      isLoading: false,
      isMessage: true,
      isError: false
    })
    return await request.start()
  }
}

export default new ScreenApi()
