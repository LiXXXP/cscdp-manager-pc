import { Request, Response } from '@gwin/networking'

export class Api {
  // 企业角色列表
  async SubjectRoleListInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/api/sms/v1/RoleListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 新增角色
  async SubjectRoleAddition(params: object): Promise<Response> {
    const request = new Request({
      url: '/api/sms/v1/RoleAddition',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 修改角色
  async SubjectRoleMaintenance(params: object): Promise<Response> {
    const request = new Request({
      url: '/api/sms/v1/RoleMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 删除角色
  async SubjectRoleDeleting(params: object): Promise<Response> {
    const request = new Request({
      url: '/api/sms/v1/RoleDeleting',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 获取权限列表
  async ResourceCascadeListInquiry(params: object): Promise<Response> {
    const request = new Request({
      url: '/api/sms/v1/ResourceCascadeListInquiry',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }

  // 保存权限
  async SubjectRoleResourceMaintenance(params: object): Promise<Response> {
    const request = new Request({
      url: '/api/sms/v1/RolePermissionMaintenance',
      params: params,
      isLoading: true,
      isMessage: true
    })
    return await request.start()
  }
}

export default new Api()
