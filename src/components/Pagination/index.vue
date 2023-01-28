<template>
  <div class="pagination flex flex-end">
    <el-pagination
      small
      :current-page="props.currentPage"
      :page-size="props.pageSize"
      :layout="props.layout"
      :total="props.total"
      :page-sizes="pageSizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
// interface definePropsData {
//   currentPage: number
//   pageSize: number
//   total: number
//   layout: string
//   pageSizes: Array<number>
// }
// eslint-disable-next-line no-undef
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
    required: false
  },
  pageSize: {
    type: Number,
    default: 10,
    required: false
  },
  total: {
    type: Number,
    default: 0,
    required: false
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
    required: false
  },
  pageSizes: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: [10, 20, 50, 100],
    required: false
  }
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['sizeChange', 'currentChange'])

const handleSizeChange = (val) => {
  emit('sizeChange', val)
}
const handleCurrentChange = (val) => {
  emit('currentChange', val)
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 16px;
}
</style>
