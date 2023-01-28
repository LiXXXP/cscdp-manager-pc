<template>
  <div
    id="mapLK"
    class="gwin-platform-map"
    :style="{ height: headerState.isFull ? 'calc(100vh - 50px)' : 'calc(100vh - 180px)' }"
  ></div>
  <el-select
    v-model="mapState.categoryValue"
    class="gwin-platform-select"
    popper-class="gwin-platform-select-popper"
    :style="{ right: isFull ? '320px' : '20px' }"
    :teleported="false"
    @change="onChangeCategory"
  >
    <el-option v-for="item in mapState.categorys" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { mapState, useMapMethod } from './map'
import { headerState } from '@/views/datasets/screen/header/header'

import { isFull } from '@/views/datasets/screen/full/full'

const { initMap, onChangeCategory, destroyMap, getWelfareQuantityListInquiry } = useMapMethod()

onMounted(() => {
  mapState.isZoomMin = true
  mapState.isZoomMax = true
  mapState.districtCode = ''
  Promise.all([initMap(), getWelfareQuantityListInquiry()])
})

onUnmounted(() => {
  destroyMap()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('map') {
  width: 100%;
  min-height: 840px;
}
@include b('select') {
  width: 120px;
  z-index: 999;
  position: absolute;
  top: 100px;
  margin-right: 30px;
}
</style>
