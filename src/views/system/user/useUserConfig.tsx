import {
  AdFormItemInstance,
  FormItemType,
  HandleType,
  InteractionType,
  LabelType,
  TablePageConfig
} from '@gwin/admin-ui'
import md5 from 'js-md5'
import { getUserId, setRealName } from '@/utils/auth'

export default function useUserConfig() {
  let curUserId = ''
  let userName = ''
  let pwd = ''
  const checkPwd2 = (rule: any, value: string, callback: any) => {
    if (value !== pwd) {
      callback(new Error('2次密码不一致'))
    } else {
      callback()
    }
  }

  const tablePageConfig: TablePageConfig = {
    forms: {
      searchForm: {
        key: 'searchForm',
        formItems: [
          [
            {
              key: 'userName',
              type: FormItemType.INPUT,
              data: {
                placeholder: '请输入成员姓名'
              }
            }
          ]
        ],
        actions: ['reset', 'search', 'create']
      },
      createForm: {
        key: 'createForm',
        formItems: [
          [
            {
              key: 'account',
              label: '登录账号',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              required: true,
              data: {},
              rules: [
                {
                  pattern: /^1[3|4|5|7|8]\d{9}$/,
                  message: '登录账号应为手机号格式'
                }
              ]
            }
          ],
          [
            {
              key: 'password',
              label: '密码',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              required: true,
              data: {}
            }
          ],
          [
            {
              key: 'passwords',
              label: '确认密码',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              required: true,
              data: {},
              rules: [{ validator: checkPwd2, trigger: 'blur' }],
              subscribe: {
                key: ['password'],
                match: (subscriber: AdFormItemInstance, value: any) => {
                  return value !== undefined && value !== ''
                },
                success: (subscriber: AdFormItemInstance, value: any, publisher: AdFormItemInstance) => {
                  const inputValue = publisher.props.item.data.value
                  if (inputValue) {
                    pwd = inputValue
                  }
                }
              }
            }
          ],
          [
            {
              key: 'userName',
              label: '姓名',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              required: true,
              data: {}
            }
          ],
          [
            {
              key: 'mobile',
              label: '手机号',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              required: true,
              data: {},
              rules: [
                {
                  pattern: /^1[3|4|5|7|8]\d{9}$/,
                  message: '请输入正确的手机号'
                }
              ]
            }
          ],
          [
            {
              key: 'roleIds',
              label: '角色',
              labelType: LabelType.NORMAL,
              type: FormItemType.SELECT,
              required: true,
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'roleApi',
                labelKey: 'label',
                valueKey: 'value'
              },
              data: {
                filterable: true,
                clearable: true
              }
            }
          ],
          [
            {
              key: 'groupIds',
              label: '所属部门',
              type: FormItemType.CASCADER,
              data: {
                props: {
                  expandTrigger: 'hover',
                  checkStrictly: true
                }
              },
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'groupApi',
                labelKey: 'label',
                valueKey: 'value'
              }
            }
          ],
          [
            {
              key: 'title',
              label: '职位',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {}
            }
          ],
          [
            {
              key: 'email',
              label: '邮箱',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {}
            }
          ]
        ],
        actions: [
          {
            key: 'cancel',
            label: '取消',
            type: ''
          },
          {
            key: 'confirm',
            label: '确定',
            type: 'primary',
            apiKey: 'createApi'
          }
        ]
      },
      editForm: {
        key: 'editForm',
        formItems: [
          [
            {
              key: 'userName',
              label: '姓名',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              required: true,
              data: {}
            }
          ],
          [
            {
              key: 'mobile',
              label: '手机号',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              required: true,
              data: {},
              rules: [
                {
                  pattern: /^1[3|4|5|7|8]\d{9}$/,
                  message: '请输入正确的手机号'
                }
              ]
            }
          ],
          [
            {
              key: 'roleIds',
              label: '角色',
              labelType: LabelType.NORMAL,
              type: FormItemType.SELECT,
              required: true,
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'roleApi',
                labelKey: 'label',
                valueKey: 'value'
              },
              data: {
                filterable: true,
                clearable: true
              },
              handleItemSetValue: (ctx: any, key: string) => {
                return key ? key[0] : ''
              }
            }
          ],
          [
            {
              key: 'groupIds',
              label: '所属部门',
              type: FormItemType.CASCADER,
              data: {
                props: {
                  expandTrigger: 'hover',
                  checkStrictly: true
                }
              },
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'groupApi',
                labelKey: 'label',
                valueKey: 'value'
              }
            }
          ],
          [
            {
              key: 'title',
              label: '职位',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {}
            }
          ],
          [
            {
              key: 'email',
              label: '邮箱',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {}
            }
          ]
        ],
        actions: [
          {
            key: 'cancel',
            label: '取消',
            type: ''
          },
          {
            key: 'confirm',
            label: '确定',
            type: 'primary',
            apiKey: 'updateApi'
          }
        ]
      }
    },
    tableConfig: {
      columns: [
        {
          prop: 'userName',
          label: '姓名',
          showOverflowTooltip: false
        },
        {
          prop: 'mobile',
          label: '登录账号',
          showOverflowTooltip: false
        },
        {
          prop: 'groupNames',
          label: '所属部门',
          showOverflowTooltip: false,
          tsx: (ctx, scope) => {
            return scope.row[scope.column.property].join(',').replaceAll(',', ' — ')
          }
        },
        {
          prop: 'status',
          label: '账号状态',
          showOverflowTooltip: false,
          variableMap: { variableKey: 'statusVariable' }
        },
        {
          prop: 'roleNames',
          label: '角色',
          showOverflowTooltip: false,
          tsx: (ctx, scope) => {
            return scope.row[scope.column.property].join(',')
          }
        },
        {
          prop: 'createAt',
          label: '注册时间',
          showOverflowTooltip: false,
          auto: false,
          handleType: HandleType.TIME,
          sortable: true
        },
        {
          prop: 'action',
          label: '操作',
          width: '220px'
        }
      ],
      actions: [
        {
          key: 'edit',
          label: '编辑',
          type: 'primary',
          text: true,
          modalWidth: '800px',
          interactionType: InteractionType.POPUP,
          apiKey: 'updateApi',
          dataSourceApiKey: 'detailApi',
          applyRowData: false,
          formKey: 'editForm'
        },
        {
          key: 'confirmPwd',
          label: '重置密码',
          type: 'primary',
          text: true,
          modalWidth: '500px',
          interactionType: InteractionType.CONFIRM,
          title: '提示',
          content: '你确定将密码重置为123456吗',
          apiKey: 'updatePwdApi'
        },
        {
          key: 'deactivate',
          type: 'primary',
          text: true,
          label: (ctx, row) => (row.status === 1 ? '停用' : '启用'),
          modalWidth: '500px',
          interactionType: InteractionType.CONFIRM,
          title: '提示',
          content: (ctx, row) => {
            return ctx.status === 1 ? '你确定要停用当前账号吗？' : '你确定要启用当前账号吗？'
          },
          apiKey: 'deactivateApi',
          onCallback: ['search', 'message']
        },
        {
          key: 'delete',
          label: '删除',
          type: 'primary',
          text: true,
          modalWidth: '500px',
          content: '请确认是否删除，删除后该条数据不可恢复',
          if: (row: Record<string, any>) => {
            return row.mobile !== '18888888888'
          }
        }
      ],
      isTablePagination: true
    },
    apis: {
      searchApi: {
        key: 'searchApi',
        path: '/api/sms/v1/UserListInquiry',
        handleParams: (params) => {
          params.page.orderBy = 'sum.id DESC'
          return params
        }
      },
      createApi: {
        key: 'createApi',
        path: '/api/sms/v1/UserAddition',
        handleParams: (params) => {
          params.roleIds = params.roleIds.split(',')
          params.password = md5(params.password)
          return {
            ...params
          }
        }
      },
      detailApi: {
        key: 'detailApi',
        path: '/api/sms/v1/UserInquiry',
        handleParams: (row) => {
          curUserId = row.userId
          return { userId: row.userId }
        }
      },
      updateApi: {
        key: 'updateApi',
        path: '/api/sms/v1/UserMaintenance',
        handleParams: (params) => {
          userName = params.userName
          params.roleIds = params.roleIds.split(',')
          return {
            userId: curUserId,
            ...params
          }
        },
        handleResult: (body: Record<string, any>) => {
          if (getUserId() === curUserId) {
            setRealName(userName)
          }
          return body
        }
      },
      deleteApi: {
        key: 'deleteApi',
        path: '/api/sms/v1/UserDeleting',
        handleParams: (row) => {
          return { userId: row.userId }
        }
      },
      updatePwdApi: {
        key: 'updatePwdApi',
        path: '/api/sms/v1/UserPasswordReset',
        handleParams: (row) => {
          return { userId: row.userId }
        }
      },
      deactivateApi: {
        key: 'deactivateApi',
        path: '/api/sms/v1/UserStateMaintenance',
        handleParams: (row: any) => {
          return { userId: row.userId, status: row.status === 1 ? 2 : 1 }
        }
      },
      roleApi: {
        key: 'roleApi',
        path: '/api/sms/v1/RoleItemListInquiry'
      },
      groupApi: {
        key: 'groupApi',
        path: '/api/sms/v1/GroupCascadeListInquiry'
      }
    },
    variables: {
      statusVariable: {
        key: 'statusVariable',
        value: [
          { label: '活动', value: 1 },
          { label: '冻结', value: 2 }
        ]
      }
    }
  }
  return {
    tablePageConfig
  }
}
