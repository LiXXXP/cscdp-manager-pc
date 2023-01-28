import { Request, Response } from '@gwin/networking'
export class Api {
  // 用户汇总统计
  async adminUserSummaryInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminUserSummaryInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
  // 用户增长趋势
  async adminUserTrendListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminUserTrendListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}
export default new Api()
