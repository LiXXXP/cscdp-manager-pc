<template>
  <el-select v-model="appState.appId" style="width: 200px">
    <el-option label="全部" value="0" />
    <el-option label="鲸益地图" value="1" />
  </el-select>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const appState = reactive({
  appId: '1'
})
</script>
