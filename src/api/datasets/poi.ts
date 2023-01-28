import { Request, Response } from '@gwin/networking'
export class Api {
  // 地区接口
  async regionListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/pwm/v1/RegionListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
  // poi汇总统计
  async adminWelfareSummaryInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminWelfareSummaryInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
  // poi增长趋势
  async adminWelfareTrendListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminWelfareTrendListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
  // poi详情浏览趋势
  async adminWelfareBrowseListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminWelfareBrowseListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
  // poi排名列表
  async adminWelfareBrowseOrderListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminWelfareBrowseOrderListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}
export default new Api()
