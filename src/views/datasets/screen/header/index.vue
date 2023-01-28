<template>
  <div class="gwin-platform-header">
    <div class="gwin-platform-time">数据更新时间 {{ headerState.time }}</div>
    <div class="gwin-platform-header__title">民政智慧云数字平台</div>
    <div class="flex">
      <Full></Full>
      <div class="gwin-platform-screen-btn" @click="onFullScreen">
        <span>{{ headerState.isFull ? '退出全屏' : '全屏显示' }}</span>
        <i :class="headerState.isFull ? 'gwin-platform-screen-btn__out' : 'gwin-platform-screen-btn__full'"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Full from '@/views/datasets/screen/full/index.vue'
import { headerState, useHeaderMethod } from './header'
interface Props {
  screenRef: any
}

const props = defineProps<Props>()

const { onFullScreen } = useHeaderMethod(props)
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@include b('header') {
  width: 100%;
  height: 60px;
  display: flex;
  padding-top: 20px;
  box-sizing: border-box;
  justify-content: space-between;
  background: url('@/assets/img/map/title.png') no-repeat 0 0;
  background-size: 100% 100%;
  @include e('title') {
    font-size: 36px;
    font-weight: 600;
    letter-spacing: 6px;
    background: linear-gradient(90deg, #00ffff 0%, #00eaff 50%, #01aaff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: absolute;
    top: 3px;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
@include b('time') {
  font-size: 16px;
  font-weight: 500;
  color: #00ffff;
}
@include b('screen-btn') {
  width: 86px;
  height: 30px;
  display: flex;
  cursor: pointer;
  font-size: 12px;
  color: #00ffff;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #00ffff;
  &:hover {
    border: 0;
    color: #fff;
    background: linear-gradient(135deg, #00c6ff 0%, #311ea7 100%);
    .gwin-platform-screen-btn__full {
      background-image: url('@/assets/img/map/screen-hover.png');
    }
    .gwin-platform-screen-btn__out {
      background-image: url('@/assets/img/map/out-hover.png');
    }
  }
  i {
    width: 10px;
    height: 10px;
    margin-left: 2px;
  }
  @include e('full') {
    background: url('@/assets/img/map/screen.png') no-repeat 0 0;
    background-size: 100%;
  }
  @include e('out') {
    background: url('@/assets/img/map/out.png') no-repeat 0 0;
    background-size: 100%;
  }
}
</style>
