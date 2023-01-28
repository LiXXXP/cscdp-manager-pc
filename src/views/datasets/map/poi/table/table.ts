import { ref, onMounted } from 'vue'
import api from '@/api/datasets/poi'
export const tableState = () => {
  // 表格数据
  const tableData = ref([])
  const aedTable = ref([])

  // POI点排名列表接口
  const personTableInfo = async () => {
    const params = {
      type: 1
    }
    const res = await api.adminWelfareBrowseOrderListInquiry(params)
    tableData.value = res.body.dataList
  }
  // AED点排名列表接口
  const aedTableInfo = async () => {
    const params = {
      type: 2
    }
    const res = await api.adminWelfareBrowseOrderListInquiry(params)
    aedTable.value = res.body.dataList
  }

  onMounted(() => {
    personTableInfo()
    aedTableInfo()
  })
  return {
    tableData,
    aedTable
  }
}
