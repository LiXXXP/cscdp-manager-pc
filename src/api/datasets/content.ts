import { Request, Response } from '@gwin/networking'
export class Api {
  // 用户汇总统计
  async adminNewsSummaryInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminNewsSummaryInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
  // 内容类型分布
  async adminNewsTypeSummaryInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminNewsTypeSummaryInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
  // 内容栏目分布
  async adminNewsCategorySummaryInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminNewsCategorySummaryInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
  // 内容数据
  async adminNewsBrowseSummaryInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminNewsBrowseSummaryInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
  // 内容增长趋势
  async adminNewsTrendListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminNewsTrendListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
  // 内容消费趋势
  async adminNewsBrowseListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminNewsBrowseListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
  // 内容次数排名 type	1次数 2人次
  async adminNewsBrowseOrderListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/csca/v1/AdminNewsBrowseOrderListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}
export default new Api()
