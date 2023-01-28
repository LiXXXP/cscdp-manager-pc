import { Request, Response } from '@gwin/networking'

export class Api {
  // 企业部门列表
  async SubjectGroupListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/sms/v1/GroupListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 新增部门
  async SubjectGroupAddition(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/sms/v1/GroupAddition',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 编辑部门
  async SubjectGroupMaintenance(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/sms/v1/GroupMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 删除部门
  async SubjectGroupDeleting(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/sms/v1/GroupDeleting',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 成员列表
  async UserItemListInquiry(params: any): Promise<Response> {
    const request = new Request({
      url: '/api/sms/v1/UserItemListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new Api()
