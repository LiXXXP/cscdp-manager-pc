<template>
  <el-table
    v-if="props.tableDetail.dataList.length > 0"
    ref="multipleTable"
    height="600"
    class="table-list"
    :data="props.tableDetail.dataList"
    :header-row-style="{ color: '#515151' }"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    :load="handleLoadLevel"
    :row-key="props.id"
    lazy
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
  >
    <!-- <el-table-column type="selection" /> -->
    <!-- <el-table-column label="#" width="80">
      <template #default="scope">{{ scope.$index + 1 }}</template>
    </el-table-column>-->
    <!-- 头像 -->
    <el-table-column v-if="props.tableDetail.avatar" label="姓名" width="200px">
      <template #default="scope">
        <slot name="avatar" :row="scope.row"></slot>
      </template>
    </el-table-column>
    <el-table-column
      v-for="item in props.tableDetail.tableLabels"
      :key="item.key"
      :prop="item.key"
      :label="item.label"
      :show-overflow-tooltip="true"
    ></el-table-column>
    <el-table-column v-if="props.tableDetail.roles" :label="props.tableDetail.roles.name">
      <template #default="scope">
        <slot name="rolesname" :row="scope"></slot>
      </template>
    </el-table-column>
    <el-table-column v-if="props.tableDetail.operation" label="操作" align="center" fixed="right">
      <template #default="scope">
        <slot name="handle" :row="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
  <div v-else class="text">暂无数据...</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// eslint-disable-next-line no-undef
const props = defineProps({
  tableDetail: {
    type: Object,
    default: () => {},
    required: false
  },
  id: {
    type: String,
    default: () => '',
    required: false
  }
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['selectionChange', 'tableHandles', 'rowClick', 'loadLevel'])

const multipleTable = ref(null)

const handleRowClick = (row) => {
  emit('rowClick', row)
}

const handleSelectionChange = (val: []) => {
  emit('selectionChange', val, multipleTable.value)
}
/**
 * 加载下级 table 数据
 */
const handleLoadLevel = (tree: any, treeNode: any, resolve: any) => {
  emit('loadLevel', tree, treeNode, resolve)
}
</script>

<style lang="scss" scoped>
.edit {
  color: #1890ff;
  cursor: pointer;
  padding-right: 10px;
}
.text {
  text-align: center;
  margin: 5px 0px;
}
.table-list {
  width: 100%;
  cursor: pointer;
  height: 40vh;
  // border: 1px solid red;
  margin-top: 10px;
}
</style>
