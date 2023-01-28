<template>
  <div>
    <div class="gwin-platform-table-list">
      <div>
        <p class="header-title">POI点排名列表</p>
        <el-table style="width: 95%" class="gwin-platform-table" max-height="400" :data="tableData">
          <el-table-column prop="order" label="排名"> </el-table-column>
          <el-table-column prop="title" label="捐助点名称"> </el-table-column>
          <el-table-column prop="value" label="访问次数"> </el-table-column>
        </el-table>
      </div>
      <div>
        <p class="header-title">AED排名列表</p>
        <el-table style="width: 95%" class="gwin-platform-table" max-height="400" :data="aedTable">
          <el-table-column prop="order" label="排名"> </el-table-column>
          <el-table-column prop="title" label="AED名称"> </el-table-column>
          <el-table-column prop="value" label="访问次数"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { tableState } from './table'
const { tableData, aedTable } = tableState()
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('table-list') {
  width: 100%;
  display: flex;
  div {
    width: 50%;
  }
}
@include b('table') {
  margin: 0 20px;
}
.header-title {
  margin: 20px;
  font-weight: bold;
}
</style>
