import { Request, Response } from '@gwin/networking'
export class Api {
  // 首页汇总接口
  async adminHomeSummaryInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminHomeSummaryInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 代办任务列表
  async adminHomeUpcomingListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminHomeUpcomingListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 趋势图
  async adminHomeTrendListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminHomeTrendListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}
export default new Api()
