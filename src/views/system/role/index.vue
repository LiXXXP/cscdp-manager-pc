<template>
  <div class="role">
    <el-row justify="space-between" class="flex flex-only-center pad-20">
      <div class="title">权限管理</div>
      <el-popover placement="bottom" :width="300" trigger="click">
        <template #reference>
          <el-button class="btn-font-normal" type="primary" size="large">
            <svg-icon class-name="icon" icon-class="add"></svg-icon>添加角色
          </el-button>
        </template>
        <div class="popverBg">
          <h3>添加角色</h3>
          <div>
            <el-form label-position="top">
              <el-form-item label="角色名称">
                <el-input v-model="data.roleName" placeholder="请输入角色名称"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" size="large" class="w-100" @click="createNameBtn">创建并配置</el-button>
          </div>
        </div>
      </el-popover>
    </el-row>
    <div class="roleList">
      <el-table :data="data.tableData.dataList" style="width: 100%" @row-click="rowBtn">
        <el-table-column prop="roleName" />
        <el-table-column align="center" fixed="right" width="150">
          <template #default="scope">{{ scope.row.category === 'system' ? '系统默认角色' : '自定义' }}</template>
        </el-table-column>
        <el-table-column align="center" fixed="right" width="100">
          <template #default="scope">
            <popover :row="scope.row" :role-index="1" @handleConfrim="handleConfrim"></popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/system/role'
import { ElMessage } from 'element-plus'
import popover from './components/popover.vue'

const router = useRouter()

const data = reactive({
  tableData: <any>{},
  switchValue: 'off',
  isHandleShow: true,
  visible: false,
  confrimBox: {
    content: '',
    status: '',
    title: ''
  },
  roleName: ''
})

onMounted(() => {
  // 获取列表
  getList()
})

// 点击当前行
const rowBtn = (row: any) => {
  router.push(
    '/system/enterprise/jurisdiction?roleId=' + row.roleId + '&roleName=' + row.roleName + '&category=' + row.category
  )
}

// 创建角色
const createNameBtn = async () => {
  if (data.roleName === '' || data.roleName.length < 3 || data.roleName.length > 15) {
    ElMessage.error('请输入正确角色名称3-15个字')
    return
  }
  const res = await api.SubjectRoleAddition({
    roleName: data.roleName,
    roleType: 'CORPORATE'
  })
  if (res.status.success) {
    ElMessage.success('创建成功')
    router.push('/system/enterprise/jurisdiction?roleId=' + res.body.roleId + '&roleName=' + data.roleName)
    getList()
    data.roleName = ''
    data.visible = false
  }
}

// 企业移除
const handleConfrim = async (row: any) => {
  const res = await api.SubjectRoleDeleting({
    roleId: row.roleId
  })
  if (res.status.success) {
    getList()
  }
}

// 获取列表
const getList = async () => {
  const res = await api.SubjectRoleListInquiry({
    page: {
      count: 0,
      orderBy: '',
      pageNum: 1,
      pageSize: 999,
      returnCount: true
    },
    roleName: data.roleName,
    roleType: 'corporate'
  })
  if (res.status.success) {
    data.tableData = res.body
  }
}
</script>

<style scoped lang="scss">
:deep(.el-table thead) {
  display: none !important;
}
:deep(svg) {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
.handle {
  .title {
    color: #333;
    font-weight: 600;
    text-align: center;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    .left {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    .close {
      width: 18px;
      cursor: pointer;
    }
  }
  .item {
    text-align: center;
    padding: 10px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
    &.del:hover {
      color: #fc4949;
      background-color: rgba(252, 73, 73, 0.09);
    }
  }
}
.confrim {
  .content {
    color: #333;
    padding-top: 10px;
    .info {
      color: #666;
      font-size: 12px;
      padding-left: 8px;
      list-style: lower-alpha inside;
    }
  }
  .confrim-btn {
    width: 100%;
    margin-top: 10px;
  }
}
.popverBg {
  h3 {
    display: inline-block;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
  }
}

.role {
  min-height: 80vh;
  overflow-y: scroll;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
  .roleList {
    border-top: 1px solid #f5f5f5;
    padding: 20px;
  }
  .polf {
    position: relative;
    left: -4px;
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
