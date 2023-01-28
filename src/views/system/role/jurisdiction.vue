<template>
  <div class="role">
    <el-row justify="space-between" class="flex flex-only-center pad-20">
      <div class="title">
        企业权限 / <span>{{ state.roleNameQuery }}</span>
      </div>
    </el-row>
    <div class="roleList">
      <div v-if="route.query.category !== 'system'" class="search">
        <el-row>
          <el-col> 角色名称：</el-col>
          <el-col :span="12" class="rtt">
            <el-input v-model="state.roleName" placeholder="请输入角色名称"></el-input>
            <el-button type="primary" class="btn" @click="roleNameBtn">保存</el-button>
          </el-col>
        </el-row>
      </div>
      <div v-for="(item, index) of state.permissionList" :key="index" class="checkboxList">
        <el-checkbox
          v-model="item.checked"
          :disabled="route.query.category === 'system' || item.mandatory === 1"
          :indeterminate="item.indeterminate == undefined ? false : !item.indeterminate ? true : false"
          @change="handleCheckAllChange($event, item, index)"
          >{{ item.label }}
        </el-checkbox>
        <el-checkbox-group v-model="state.checkedCities[index]" @change="handleCheckedCitiesChange($event, index)">
          <el-checkbox
            v-for="list in item.children"
            :key="list"
            :label="list.value"
            :disabled="route.query.category === 'system' || list.mandatory === 1"
            @click="handelItem(list.value)"
            >{{ list.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <br />
    <div class="flex flex-center back">
      <el-button type="primary" size="large" @click="router.back()">返回</el-button>
    </div>
    <br />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/system/role'
import { ElNotification } from 'element-plus'

const route = useRoute()
const router = useRouter()

interface State {
  roleNameQuery: any
  roleName: any
  checkAll: any
  checkedCities: any
  initialization: any
  roleLength: number
  handelItemValue: any
  handelItemindex: string
  permissionList: {
    checked: boolean
    children: any
    indeterminate: boolean
    label: string
    mandatory: number
    parentId: string
    value: string
  }[]
}

const state: State = reactive({
  roleNameQuery: route.query.roleName,
  roleName: route.query.roleName,
  checkAll: [], // 全选
  checkedCities: [], // 选中
  permissionList: [],
  initialization: [],
  roleLength: 0,
  handelItemValue: [],
  handelItemindex: ''
})

onMounted(() => {
  // 获取资源列表
  getDetail()
})

// 获取资源列表
const getDetail = async () => {
  const res = await api.ResourceCascadeListInquiry({
    category: 1,
    roleId: route.query.roleId
  })
  if (res.status.success) {
    state.permissionList = res.body.dataList
    state.permissionList.forEach((item: any, index: any) => {
      state.checkedCities[index] = []
      if (item.children) {
        item.children.forEach((list: any) => {
          if (list.checked) {
            state.checkedCities[index].push(list.value)
          }
        })
      }

      if (item.checked) {
        state.checkedCities[index].push(item.value)
      }

      if (state.checkedCities[index].length > 0) {
        if (item.children) {
          if (state.checkedCities[index].length <= item.children.length) {
            item.indeterminate = false
          } else {
            item.indeterminate = true
          }
        }
      }

      state.roleLength = res.body.checkedList.length
    })
  }
}

// 保存新角色
const roleNameBtn = async () => {
  const res = await api.SubjectRoleMaintenance({
    roleId: route.query.roleId,
    roleName: state.roleName
  })
  if (res.status.success) {
    ElNotification({
      title: '保存角色',
      message: '保存成功',
      type: 'success'
    })
    state.roleNameQuery = state.roleName
  }
}

// 当前值
const handelItem = (value: string) => {
  state.handelItemindex = value
}

// 全选
const handleCheckAllChange = async (val: any, item: any, index: any) => {
  // 设置全选数值
  const resourceIds = []
  resourceIds.push(item.value)
  if (item.children) {
    item.children.forEach((list: any) => {
      resourceIds.push(list.value)
    })
  } else {
  }
  const action = val ? 'A' : 'D'
  // 保存
  const res = await api.SubjectRoleResourceMaintenance({
    action: action,
    resourceIds: resourceIds,
    roleId: route.query.roleId
  })
  if (res.status.success) {
    ElNotification({
      title: '权限配置',
      message: '权限配置更新成功',
      type: 'success'
    })
    // 获取资源列表
    getDetail()
  }
}

// 选中
const handleCheckedCitiesChange = (value: any, index: any) => {
  let action = ''
  const arr = []
  state.checkedCities.forEach((item: any) => {
    item.forEach((list: any) => {
      arr.push(list)
    })
  })

  if (state.roleLength > arr.length) {
    action = 'D'
  } else {
    action = 'A'
  }

  // 赋值数量
  state.roleLength = arr.length

  const checkedCount = value.length
  if (action === 'D') {
    state.permissionList[index].indeterminate = checkedCount === 1
  } else {
    state.permissionList[index].indeterminate =
      checkedCount > 0 && checkedCount < state.permissionList[index].children.length
  }

  if (checkedCount === 1 && checkedCount === state.permissionList[index].children.length) {
    state.handelItemValue.push(state.permissionList[index].value)
  }

  if (state.permissionList[index].indeterminate) {
    state.handelItemValue.push(state.permissionList[index].value)
  }
  state.handelItemValue.push(state.handelItemindex)

  save(action) // 保存
}

// 保存权限
const save = async (action: string) => {
  // 保存
  const res = await api.SubjectRoleResourceMaintenance({
    action: action,
    resourceIds: state.handelItemValue,
    roleId: route.query.roleId
  })
  if (res.status.success) {
    ElNotification({
      title: '权限配置',
      message: '权限配置更新成功',
      type: 'success'
    })
    state.handelItemValue = []
  }
  // 获取资源列表
  getDetail()
}
</script>

<style lang="scss" scoped>
.role {
  min-height: calc(100%);
  overflow-y: scroll;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
  position: relative;
  .back {
    position: absolute;
    bottom: 2px;
    padding: 30px 0;
    width: 100%;
  }
  .roleList {
    border-top: 1px solid #f5f5f5;
    padding: 20px;
    .checkboxList,
    .search {
      line-height: 40px;
      color: #999999;
      .rtt {
        position: relative;
      }
      padding: 20px;

      .btn {
        position: absolute;
        right: 0;
        top: 5px;
        border-radius: 0 5px 5px 0;
      }
    }
    .checkboxList:not(div:first-child) {
      border-top: 1px solid #f5f5f5;
    }
  }
  .title {
    color: #999999;
    font-size: 16px;
    font-weight: 500;
    span {
      color: #121212;
    }
    &::before {
      content: '';
      width: 4px;
      height: 18px;
      margin-right: 6px;
      display: inline-block;
      vertical-align: text-bottom;
      background-color: #3c7dff;
    }
  }
}
</style>
