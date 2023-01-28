<template>
  <el-popover placement="bottom" width="10" trigger="click">
    <template #reference>
      <div @click.stop="state.isHandleShow = true">
        <svg-icon class-name="icon" icon-class="Icon-more"></svg-icon>
      </div>
    </template>
    <div v-if="state.isHandleShow" class="handle">
      <div class="title flex flex-center flex-only-center">
        <p>更多菜单</p>
      </div>
      <div class="item del" @click="handleDeleteRow">
        {{ props.roleIndex == 1 ? '移除角色' : '从项目移除角色' }}
      </div>
    </div>
    <div v-else class="confrim handle">
      <div class="title flex flex-center flex-only-center">
        <p>{{ state.confrimBox.title }}</p>
      </div>
      <div class="content">
        <p>{{ state.confrimBox.content }}</p>
      </div>
      <el-button class="confrim-btn" type="danger" size="large" @click="handleConfrim()">确认</el-button>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const props = defineProps({
  row: {
    type: Object,
    default: () => ({})
  },
  roleIndex: {
    type: Number,
    default: () => 1
  }
})

const emit = defineEmits(['handleConfrim'])

const state = reactive({
  isHandleShow: false,
  confrimBox: {
    title: '',
    content: '',
    status: ''
  },
  popShow: false
})

/**
 * 删除按钮
 */
const handleDeleteRow = () => {
  state.isHandleShow = false
  state.confrimBox.title = '移除角色'
  state.confrimBox.content = '你确定把该角色移除吗？'
  state.confrimBox.status = 'delete'
}

// 移除角色
const handleConfrim = () => {
  state.popShow = false
  emit('handleConfrim', props.row)
}
</script>

<style lang="scss" scoped>
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
</style>
