import { reactive, ref, onMounted } from 'vue'
import api from '@/api/datasets/poi'

export const headerState = () => {
  // 省市选择器参数
  const selectValue = reactive({
    provinceCode: '',
    cityCode: ''
  })
  // 汇总统计数据
  const totalObj = reactive({
    aed: '',
    donate: '',
    total: ''
  })
  // 地址接口
  const regionInfo = async () => {
    const res = await api.regionListInquiry({})
    res.body.dataList.forEach((item: any) => {
      item.children.forEach((i: any) => {
        i.children = []
        options.value.push(item)
      })
    })
  }
  // 汇总统计接口
  const getInfo = async () => {
    const params = {
      provinceCode: selectValue.provinceCode,
      cityCode: selectValue.cityCode
    }
    const res = await api.adminWelfareSummaryInquiry(params)
    totalObj.aed = res.body.aed
    totalObj.donate = res.body.donate
    totalObj.total = res.body.total
  }
  // 地区选择器数据
  const options: any = ref([])
  const cityChange = (item: any) => {
    if (item.length === 1) {
      selectValue.provinceCode = item[0]
    } else {
      selectValue.provinceCode = item[0]
      selectValue.cityCode = item[1]
    }
    getInfo()
  }
  onMounted(() => {
    regionInfo()
    getInfo()
  })
  return {
    options,
    totalObj,
    cityChange
  }
}
