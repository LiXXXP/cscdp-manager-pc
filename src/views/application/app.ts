import { FormItemType, HandleType, InteractionType, LabelType } from '@gwin/admin-ui'

export const appState = {
  tablePageConfig: {
    forms: {
      searchForm: {
        key: 'searchForm',
        formItems: [
          [
            {
              key: 'name',
              type: FormItemType.INPUT,
              data: {
                placeholder: '请输入应用名称'
              }
            },
            {
              key: 'createAt',
              type: FormItemType.DATEPICKER,
              handleKey: 'datetime',
              handleValue: ['startDate', 'endDate'],
              data: {
                'start-placeholder': '开始日期',
                'end-placeholder': '结束日期',
                type: 'daterange',
                style: {
                  width: '240px !important'
                }
              },
              status: true,
              isIgnore: false
            }
          ]
        ],
        actions: ['reset', 'search', 'create']
      },
      createForm: {
        key: 'createForm',
        title: '新增应用',
        width: '800px',
        formItems: [
          [
            {
              key: 'b24920ab-ec06-4a06-bbc1-01d41445ddf9',
              label: '应用信息',
              labelType: 'Normal',
              type: 'Render',
              labelStyle: {
                'font-weight': 600
              },
              data: {}
            }
          ],
          [
            {
              key: 'categoryId',
              label: '业务分类',
              labelType: LabelType.NORMAL,
              type: FormItemType.SELECT,
              data: {
                clearable: true,
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'businessNameApi',
                valueKey: 'id',
                labelKey: 'name'
              },
              required: true
            }
          ],
          [
            {
              key: 'name',
              label: '应用名称',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '30',
                'show-word-limit': true,
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              required: true,
              rules: [{ pattern: /^[^\s]*$/, message: '不能输入空格' }]
            }
          ],
          [
            {
              key: 'memo',
              label: '应用描述',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              labelStyle: {
                'font-weight': 600
              },
              data: {
                type: 'textarea',
                'show-word-limit': true,
                maxlength: '200',
                style: {
                  width: '400px !important'
                }
              }
            }
          ],
          [
            {
              key: 'b24920ab-ec06-4a06-bbc1-01d41445ddf0',
              label: '主体信息',
              labelType: 'Normal',
              type: 'Render',
              labelStyle: {
                'font-weight': 600
              },
              data: {}
            }
          ],
          [
            {
              key: 'orgName',
              label: '运营机构',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '50',
                'show-word-limit': true,
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              required: true,
              rules: [{ pattern: /^[^\s]*$/, message: '不能输入空格' }]
            }
          ],
          [
            {
              key: 'adminName',
              label: '管理员姓名',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '50',
                'show-word-limit': true,
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              required: true,
              rules: [{ pattern: /^[^\s]*$/, message: '不能输入空格' }]
            }
          ],
          [
            {
              key: 'adminEmail',
              label: '管理员邮箱',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                clearable: true,
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              rules: [
                {
                  pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                  message: '请输入正确的邮箱'
                }
              ]
            }
          ],
          [
            {
              key: 'adminMobile',
              label: '管理员手机号',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                clearable: true,
                placeholder: '请输入管理员手机号 (默认密码手机号后六位)',
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              required: true,
              rules: [
                {
                  pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
                  message: '请输入正确的手机号'
                }
              ]
            }
          ],
          [
            {
              key: 'fixedTelephone',
              label: '座机',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                clearable: true,
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              rules: [
                {
                  pattern: /^(|[1-9][0-9]*)$/,
                  message: '请输入正确的座机号'
                }
              ]
            }
          ],
          [
            {
              key: 'district',
              label: '地区',
              labelType: 'Normal',
              type: 'Cascader',
              labelStyle: {
                'font-weight': 600
              },
              data: {
                props: {
                  multiple: false
                },
                'show-all-levels': true,
                style: {
                  width: '400px !important'
                },
                clearable: true,
                value: []
              },
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'districtApi',
                valueKey: 'value',
                labelKey: 'label'
              }
            }
          ],
          [
            {
              key: 'postCode',
              label: '邮编',
              labelType: 'Normal',
              type: 'Input',
              labelStyle: {
                'font-weight': 600
              },
              data: {
                style: {
                  width: '400px !important'
                }
              },
              rules: [
                {
                  pattern: /^[0-9]{6}$/,
                  message: '请输入正确的邮编'
                }
              ]
            }
          ],
          [
            {
              key: 'address',
              label: '地址',
              labelType: 'Normal',
              type: 'Input',
              labelStyle: {
                'font-weight': 600
              },
              data: {
                'show-word-limit': true,
                maxlength: '200',
                style: {
                  width: '400px !important'
                }
              },
              rules: [{ pattern: /^[^\s]*$/, message: '不能输入空格' }]
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
            apiKey: 'addApi'
          }
        ]
      },
      editFrom: {
        key: 'editFrom',
        width: '800px',
        formItems: [
          [
            {
              key: 'b24920ab-ec06-4a06-bbc1-01d41445ddf9',
              label: '应用信息',
              labelType: 'Normal',
              type: 'Render',
              labelStyle: {
                'font-weight': 600
              },
              data: {}
            }
          ],
          [
            {
              key: 'categoryId',
              label: '业务分类',
              labelType: LabelType.NORMAL,
              type: FormItemType.SELECT,
              data: {
                clearable: true,
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'businessNameApi',
                valueKey: 'id',
                labelKey: 'name'
              },
              required: true
            }
          ],
          [
            {
              key: 'name',
              label: '应用名称',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '30',
                'show-word-limit': true,
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              required: true,
              rules: [{ pattern: /^[^\s]*$/, message: '不能输入空格' }]
            }
          ],
          [
            {
              key: 'memo',
              label: '应用描述',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              labelStyle: {
                'font-weight': 600
              },
              data: {
                type: 'textarea',
                'show-word-limit': true,
                maxlength: '200',
                style: {
                  width: '400px !important'
                }
              }
            }
          ],
          [
            {
              key: 'b24920ab-ec06-4a06-bbc1-01d41445ddf0',
              label: '主体信息',
              labelType: 'Normal',
              type: 'Render',
              labelStyle: {
                'font-weight': 600
              },
              data: {}
            }
          ],
          [
            {
              key: 'orgName',
              label: '运营机构',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '50',
                'show-word-limit': true,
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              required: true,
              rules: [{ pattern: /^[^\s]*$/, message: '不能输入空格' }]
            }
          ],
          [
            {
              key: 'adminName',
              label: '管理员姓名',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                clearable: true,
                maxlength: '50',
                'show-word-limit': true,
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              required: true,
              rules: [{ pattern: /^[^\s]*$/, message: '不能输入空格' }]
            }
          ],
          [
            {
              key: 'adminEmail',
              label: '管理员邮箱',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                clearable: true,
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              rules: [
                {
                  pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                  message: '请输入正确的邮箱'
                }
              ]
            }
          ],
          [
            {
              key: 'adminMobile',
              label: '管理员手机号',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                clearable: true,
                placeholder: '请输入管理员手机号 (默认密码手机号后六位)',
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              required: true,
              rules: [
                {
                  pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
                  message: '请输入正确的手机号'
                }
              ]
            }
          ],
          [
            {
              key: 'fixedTelephone',
              label: '座机',
              labelType: LabelType.NORMAL,
              type: FormItemType.INPUT,
              data: {
                clearable: true,
                style: {
                  width: '400px !important'
                }
              },
              labelStyle: {
                'font-weight': 600
              },
              rules: [
                {
                  pattern: /^(|[1-9][0-9]*)$/,
                  message: '请输入正确的座机号'
                }
              ]
            }
          ],
          [
            {
              key: 'district',
              label: '地区',
              labelType: 'Normal',
              type: 'Cascader',
              labelStyle: {
                'font-weight': 600
              },
              data: {
                props: {
                  multiple: false
                },
                'show-all-levels': true,
                style: {
                  width: '400px !important'
                },
                clearable: true,
                value: []
              },
              isGetOptionsFromApi: true,
              getOptionsFromApi: {
                isMountedGet: true,
                apiKey: 'districtApi',
                valueKey: 'value',
                labelKey: 'label'
              }
            }
          ],
          [
            {
              key: 'postCode',
              label: '邮编',
              labelType: 'Normal',
              type: 'Input',
              labelStyle: {
                'font-weight': 600
              },
              data: {
                style: {
                  width: '400px !important'
                }
              },
              rules: [
                {
                  pattern: /^[0-9]{6}$/,
                  message: '请输入正确的邮编'
                }
              ]
            }
          ],
          [
            {
              key: 'address',
              label: '地址',
              labelType: 'Normal',
              type: 'Input',
              labelStyle: {
                'font-weight': 600
              },
              data: {
                'show-word-limit': true,
                maxlength: '200',
                style: {
                  width: '400px !important'
                }
              },
              rules: [{ pattern: /^[^\s]*$/, message: '不能输入空格' }]
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
            apiKey: 'maintenanceApi'
          }
        ]
      }
    },
    tableConfig: {
      columns: [
        {
          prop: 'categoryName',
          label: '业务分类'
        },
        {
          prop: 'appName',
          label: '应用名称',
          showOverflowTooltip: true
        },
        {
          prop: 'memo',
          label: '应用描述',
          showOverflowTooltip: true
        },
        {
          prop: 'createAt',
          label: '创建时间',
          handleType: HandleType.TIME
        },
        {
          prop: 'action',
          label: '操作'
        }
      ],
      actions: [
        {
          key: 'edit',
          label: '编辑',
          text: true,
          type: 'primary',
          title: undefined,
          interactionType: InteractionType.POPUP,
          onCallback: ['search', 'message'],
          dataSourceApiKey: 'detailApi',
          apiKey: 'maintenanceApi',
          formKey: 'editFrom'
        },
        {
          key: 'delete',
          label: '删除',
          text: true,
          type: 'primary',
          interactionType: InteractionType.CONFIRM,
          onCallback: ['search', 'message'],
          size: 'default',
          title: '应用删除',
          content: '确定将删除此应用吗？',
          modalWidth: '500px',
          apiKey: 'deleteApi'
        }
      ],
      isTablePagination: true
    },
    apis: {
      searchApi: {
        key: 'searchApi',
        path: '/api/csca/v1/AppListInquiry',
        method: 'post',
        config: {
          type: 'admin'
        },
        isMessage: true,
        isLoading: true,
        handleParams: (params: Record<string, any>) => {
          params.page.orderBy = 'cam.id DESC'
          return params
        }
      },
      addApi: {
        key: 'addApi',
        path: '/api/csca/v1/AppAddition',
        method: 'post',
        config: {
          type: 'admin'
        },
        isMessage: true,
        isLoading: true,
        handleParams: (params: Record<string, any>) => {
          return params
        }
      },
      deleteApi: {
        key: 'deleteApi',
        path: '/api/csca/v1/AppDeleting',
        method: 'post',
        config: {
          type: 'admin'
        },
        isMessage: true,
        isLoading: true,
        handleParams: (params: Record<string, any>) => {
          return { id: params.id }
        }
      },
      detailApi: {
        key: 'detailApi',
        path: '/api/csca/v1/AppInquiry',
        method: 'post',
        config: {
          type: 'admin'
        },
        isMessage: true,
        isLoading: true,
        handleParams: (params: Record<string, any>) => {
          return { id: params.id }
        }
      },
      maintenanceApi: {
        key: 'maintenanceApi',
        path: '/api/csca/v1/AppMaintenance',
        method: 'post',
        config: {
          type: 'admin'
        },
        isMessage: true,
        isLoading: true,
        handleParams: (params: Record<string, any>) => {
          return params
        }
      },
      businessNameApi: {
        key: 'businessNameApi',
        path: '/api/csca/v1/BusinessNameListInquiry',
        method: 'post',
        config: {
          type: 'admin'
        }
      },
      districtApi: {
        key: 'districtApi',
        path: '/api/pwm/v1/RegionListInquiry',
        method: 'post',
        config: {
          type: 'admin'
        }
      }
    }
  }
}
