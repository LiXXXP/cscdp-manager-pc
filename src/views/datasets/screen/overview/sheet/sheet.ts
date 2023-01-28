import { reactive } from 'vue'
import ScreenApi from '@/api/screen/screen'
import { SheetState } from './interface'

export const sheetState = reactive<SheetState>({
  tableData: []
})

export const useSheetMethod = () => {
  /**
   * 获取总览数据
   */
  const getOverviewInquiry = async () => {
    const res = await ScreenApi.adminOverviewInquiry()
    sheetState.tableData = [
      {
        name: 'PV(页面浏览量)',
        data: res.body.pv
      },
      {
        name: 'UV(独立访客)',
        data: res.body.uv
      },
      {
        name: '内容总数',
        data: res.body.newsRelease
      },
      {
        name: '内容浏览数',
        data: res.body.newsBrowse
      },
      {
        name: '用户数',
        data: res.body.user
      },
      {
        name: 'POI点数',
        data: res.body.poi
      },
      {
        name: '企业数',
        data: res.body.enterprise
      }
    ]
  }
  return {
    getOverviewInquiry
  }
}
