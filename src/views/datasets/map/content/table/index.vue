<template>
  <el-card>
    <div class="gwin-platform-table-list">
      <div>
        <p class="header-title">访问内容次数排名</p>
        <el-table style="width: 95%" class="gwin-platform-table" :data="contentState.limitTable">
          <el-table-column prop="order" label="名次"> </el-table-column>
          <el-table-column prop="title" label="内容标题"> </el-table-column>
          <el-table-column prop="value" label="次数"> </el-table-column>
        </el-table>
      </div>
      <div>
        <p class="header-title">访问内容人次排名</p>
        <el-table style="width: 95%" class="gwin-platform-table" :data="contentState.personTable">
          <el-table-column prop="order" label="名次"> </el-table-column>
          <el-table-column prop="title" label="内容标题"> </el-table-column>
          <el-table-column prop="value" label="人次"> </el-table-column>
        </el-table>
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { contentState } from '../content'
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
