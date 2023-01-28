<template>
  <div class="group">
    <el-row justify="space-between" class="flex flex-only-center pad-20">
      <div class="title">组织架构</div>
      <el-popover ref="popoverRef" placement="bottom" :width="300" trigger="click">
        <template #reference>
          <el-button
            class="btn-font-normal"
            type="primary"
            size="large"
            @click=";(state.addName = ''), (state.manager = '')"
          >
            <svg-icon class-name="icon" icon-class="add"></svg-icon>创建部门
          </el-button>
        </template>
        <div class="popverBg">
          <div class="title-box">
            <h3>新建一级部门</h3>
          </div>
          <div>
            <el-form label-position="top">
              <el-form-item label="一级部门名称">
                <el-input v-model="state.addName" placeholder="请输入一级部门名称"></el-input>
              </el-form-item>
              <el-form-item label="上级部门">
                <el-input placeholder="我的团队" disabled></el-input>
              </el-form-item>
              <el-form-item label="设置部门负责人">
                <el-select
                  v-model="state.manager"
                  :popper-append-to-body="false"
                  filterable
                  clearable
                  style="width: 100%"
                  :teleported="false"
                  placeholder="请添加部门负责人"
                >
                  <el-option v-for="item in state.userData" :key="item.value" :label="item.label" :value="item.value">
                    <div class="avatar">
                      <span>{{ item.label ? item.label.substr(0, 1) : '' }}</span>
                      {{ item.label }}
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-button type="primary" size="large" class="w-100" @click="addDepartment">确认</el-button>
          </div>
        </div>
      </el-popover>
    </el-row>
    <!-- 表格 -->
    <div class="table pad-20">
      <el-row>
        <el-col :span="8">
          <el-input
            v-model="state.search"
            clearable
            placeholder="请输入部门名称"
            size="large"
            @change="searchChange"
          ></el-input>
        </el-col>
        <el-button type="primary" size="large" class="polf">搜索</el-button>
      </el-row>
      <br />
      <br />
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <h4 class="team"><img src="../../../assets/img/Icon-team.png" />我的团队：</h4>
        </el-col>
        <br />
        <br />
        <el-col :span="24" :offset="0">
          <el-tree
            ref="tree"
            :data="state.treeData"
            :filter-node-method="filterNode"
            :load="loadNode"
            highlight-current
            auto-expand-parent
            lazy
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ data.groupName }}</span>
                <span>
                  <el-popover placement="left" :width="300" trigger="click">
                    <template #reference>
                      <a @click.stop="edit(node, data)">
                        <svg-icon class-name="icon" icon-class="Icon-editor-hover"></svg-icon>
                      </a>
                    </template>
                    <div class="popverBg">
                      <h3>编辑部门</h3>
                      <div>
                        <el-form label-position="top">
                          <el-form-item label="部门名称">
                            <el-input v-model="state.addName" placeholder="请输入部门名称"></el-input>
                          </el-form-item>
                          <el-form-item label="上级部门">
                            <el-input :placeholder="state.superior || '我的团队'" disabled></el-input>
                          </el-form-item>
                          <el-form-item label="设置部门负责人">
                            <el-select
                              v-model="state.manager"
                              clearable
                              :popper-append-to-body="false"
                              filterable
                              style="width: 100%"
                              :teleported="false"
                              placeholder="请添加部门负责人"
                            >
                              <el-option
                                v-for="(item, index) in state.userData"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                              >
                                <div class="avatar">
                                  <span>{{ item.label ? item.label.substr(0, 1) : '' }}</span>
                                  {{ item.label }}
                                </div>
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-form>
                        <el-button type="primary" size="large" class="w-100" @click="editBtn">确认</el-button>
                      </div>
                    </div>
                  </el-popover>
                  <el-popover placement="left" :width="300" trigger="click">
                    <template #reference>
                      <a @click.stop="edit(node, data), (state.manager = '')">
                        <svg-icon class-name="icon" icon-class="Icon-add"></svg-icon>
                      </a>
                    </template>
                    <div class="popverBg">
                      <h3>新增子级部门</h3>
                      <div>
                        <el-form label-position="top">
                          <el-form-item label="子级部门名称">
                            <el-input v-model="state.addChildName" placeholder="请输入子级部门名称"></el-input>
                          </el-form-item>
                          <el-form-item label="上级部门">
                            <el-input :placeholder="state.addName" disabled></el-input>
                          </el-form-item>
                          <el-form-item label="设置部门负责人">
                            <el-select
                              v-model="state.manager"
                              clearable
                              :popper-append-to-body="false"
                              filterable
                              style="width: 100%"
                              :teleported="false"
                              placeholder="请添加部门负责人"
                            >
                              <el-option
                                v-for="(item, index) in state.userData"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                              >
                                <div class="avatar">
                                  <span>{{ item.label ? item.label.substr(0, 1) : '' }}</span>
                                  {{ item.label }}
                                </div>
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-form>
                        <el-button type="primary" size="large" class="w-100" @click="addItem()">确认</el-button>
                      </div>
                    </div>
                  </el-popover>
                  <el-popover placement="left" :width="300" trigger="click">
                    <template #reference>
                      <a @click.stop="edit(node, data)">
                        <svg-icon class-name="icon" icon-class="Icon-delete"></svg-icon>
                      </a>
                    </template>
                    <div class="popverBg">
                      <h3>移除部门</h3>
                      <div>
                        <p class="pad-20">
                          你确定把「
                          {{ state.editRow.groupName }} 」部门移除吗？如果部门下有子部门或者成员，部门将无法移除。
                        </p>
                        <el-button type="danger" size="large" class="w-100" @click="removeBtn">确认</el-button>
                      </div>
                    </div>
                  </el-popover>
                </span>
              </span>
            </template>
          </el-tree>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import api from '@/api/system/group'
import { ElMessage } from 'element-plus'
import { requestContextConfig } from '@gwin/networking'

const tree = ref()
const popoverRef = ref()

interface RootObject {
  visible: boolean
  manager: string
  search: string
  addName: string
  addChildName: string
  treeData: []
  label: string
  superior: string
  editRow: any
  enterprise: object
  userData: {
    label: string
    value: string
  }[]
}

const state: RootObject = reactive({
  visible: false,
  manager: '',
  search: '',
  addName: '',
  addChildName: '',
  treeData: [],
  label: '',
  superior: '',
  editRow: {},
  enterprise: {},
  userData: []
})

onMounted(() => {
  getList()
  getUserList()
})

const loadNode = async (node: any, resolve: any) => {
  if (node.level === 0) {
    return resolve([{ name: 'region' }])
  }
  const res = await api.SubjectGroupListInquiry({
    page: {
      pageNum: 1,
      pageSize: 999,
      returnCount: true,
      orderBy: 'sgm.tree_sort asc'
    },
    parentId: node.data.groupId
  })
  if (res.body.dataList) {
    resolve(res.body.dataList)
  }
}
// 编辑部门数据
const edit = (node: any, data: any) => {
  state.editRow = data
  console.log(state.editRow, 'state.editRow')
  state.manager = data.leaderId
  state.addName = data.groupName
  state.superior = node.parent.data.groupName
}

// 移除部门
const removeBtn = async () => {
  const res = await api.SubjectGroupDeleting({
    groupId: state.editRow.groupId
  })
  if (res.status.success) {
    ElMessage.success('移除成功')
    getList()
  }
}

// 获取成员
const getUserList = async () => {
  const res = await api.UserItemListInquiry({
    page: {
      pageNum: 1,
      pageSize: 9999,
      returnCount: true
    },
    subjectId: requestContextConfig.entityId
  })
  if (res.status.success) {
    state.userData = res.body.dataList
  }
}

// 编辑部门
const editBtn = async () => {
  if (state.addName === '') {
    ElMessage.error('请输入部门名称')
    return
  }
  const res = await api.SubjectGroupMaintenance({
    groupId: state.editRow.groupId,
    leaderId: state.manager,
    groupName: state.addName,
    sort: 1,
    groupParentId: state.editRow.groupParentId
  })
  if (res.status.success) {
    state.addName = ''
    ElMessage.success('编辑部门成功')
    getList()
  }
}

// 新增
const addDepartment = async () => {
  if (state.addName === '') {
    ElMessage.error('请输入部门名称')
    return
  }
  const res = await api.SubjectGroupAddition({
    groupName: state.addName,
    groupParentId: 0,
    leaderId: state.manager,
    sort: 1
  })
  if (res.status.success) {
    state.addName = ''
    popoverRef.value.hide()
    ElMessage.success('新增部门成功')
    getList()
  }
}

// 搜索词
const searchChange = (val: string) => {
  tree.value.filter(val)
}

// 搜索
const filterNode = (value: any, data: any) => {
  if (!value) return true
  return data.groupName.indexOf(value) !== -1
}

// 创建二级部门
const addItem = async () => {
  if (state.addChildName === '') {
    ElMessage.error('请输入部门名称')
    return
  }
  const res = await api.SubjectGroupAddition({
    groupName: state.addChildName,
    groupParentId: state.editRow.groupId,
    leaderId: state.manager,
    sort: 1
  })
  if (res.status.success) {
    state.addChildName = ''
    state.addName = ''
    ElMessage.success('新增部门成功')
    getList()
  }
}

// 获取列表
const getList = async () => {
  const res = await api.SubjectGroupListInquiry({
    page: {
      orderBy: 'sgm.tree_sort asc',
      pageNum: 1,
      pageSize: 99999,
      returnCount: true
    }
  })
  state.treeData = res.body.dataList
}
</script>

<style lang="scss" scoped>
.popverBg {
  .title-box {
    position: relative;
  }

  h3 {
    display: inline-block;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 20px;
  }

  .close-img {
    position: absolute;
    top: 15px;
    right: 10px;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
  }
}
.avatar {
  display: flex;
  align-items: center;

  span {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #3c7dff;
    color: #fff;
    border-radius: 50%;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    box-sizing: border-box;
  }
}
.gSelect {
  position: reactive;
  select {
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    border: 1px solid #dcdfe6;
    width: 89% !important;
    border-radius: 3px;
    color: #606266;
  }
  .svgSel {
    position: absolute;
    right: 21px;
    top: 15px;
  }
}
.group {
  width: 100%;
  min-height: 80vh;
  overflow-y: scroll;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);

  .leftTitleBg {
    height: 100vh;
    overflow-y: scroll;
    background: #ffffff;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
    padding: 20px;
  }
  .leftTitle {
    color: #121212;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
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

  .table {
    border-top: 1px solid #f5f5f5;
    .team {
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 3px;
      }
    }
  }

  svg {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
  :deep(.el-tree-node__content) {
    height: 45px !important;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    a {
      margin-right: 20px;
    }
  }
  .polf {
    position: relative;
    left: -4px;
    border-radius: 0 5px 5px 0;
    background: #3c7dff;
  }
  .btn-font-normal {
    width: 124px;
    height: 40px;
    background: #3c7dff;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
  }
  .title {
    color: #121212;
    font-size: 16px;
    font-weight: 500;
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
