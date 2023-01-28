<template>
  <div style="height: 100%">
    <Header />
    <div class="gwin-platform-app-main">
      <Sidebar />
      <div class="gwin-platform-app-right">
        <tags-view class="gwin-platform-app-tags" />
        <Content class="gwin-platform-app-content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from './components/header.vue'
import Sidebar from './components/sidebar.vue'
import Content from './components/content.vue'
import TagsView from './components/tagsView.vue'
import { defineComponent } from 'vue-demi'

defineComponent({
  Header,
  Sidebar,
  Content
})
</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';

@include b('app-main') {
  width: 100%;
  min-height: calc(100vh - 50px);
  background: hsl(0, 0%, 95%);
  display: flex;
}
@include b('app-right') {
  width: 100%;
  overflow: hidden;
}
@include b('app-tags') {
  background: #fff;
  border-top: 1px solid #f5f5f5;
}
@include b('app-content') {
  border-top: 1px solid #f5f5f5;
  flex: 1;
  padding: 20px;
}
</style>
