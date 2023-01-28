import { reactive, onMounted, onUnmounted } from 'vue'
import { parseTime } from '@/utils/index'
import { HeaderState, ExtendedDocument } from './interface'

import { useSheetMethod } from '@/views/datasets/screen/overview/sheet/sheet'
const { getOverviewInquiry } = useSheetMethod()

import { useFeedbackMethod } from '@/views/datasets/screen/overview/feedback/feedback'
const { getFeedbackSummaryInquiry } = useFeedbackMethod()

import { useNewlyMethod } from '@/views/datasets/screen/overview/newly/newly'
const { getSummaryInquiry } = useNewlyMethod()

export const headerState = reactive(<HeaderState>{
  time: '', // 当前时间
  isFull: false, // 是否全屏
  timeInterval: null
})

export const useHeaderMethod = (props: any) => {
  onMounted(() => {
    headerState.time = parseTime(new Date(), '')

    // 10分钟更新一次 600000
    headerState.timeInterval = setInterval(() => {
      // 总览 反馈 新增 趋势
      Promise.all([getOverviewInquiry(), getFeedbackSummaryInquiry(), getSummaryInquiry()])
      headerState.time = parseTime(new Date(), '')
    }, 600000)

    // 监听退出全屏状态
    window.addEventListener('resize', () => {
      if (!isFullScreen()) {
        headerState.isFull = false
      }
    })
  })

  /**
   * 销毁 生命周期
   */
  onUnmounted(() => {
    window.removeEventListener('resize', isFullScreen, false)
    headerState.timeInterval && clearInterval(headerState.timeInterval)
  })

  /**
   * 全屏显示
   */
  const onFullScreen = () => {
    const el = props.screenRef
    const htmlDocument: ExtendedDocument = document
    const isFullscreen = htmlDocument.fullScreen || htmlDocument.mozFullScreen || htmlDocument.webkitIsFullScreen
    if (!isFullscreen) {
      // 进入全屏
      headerState.isFull = true
      el?.requestFullscreen() ||
        el?.mozRequestFullScreen() ||
        el?.webkitRequestFullscreen() ||
        el?.msRequestFullscreen()
    } else {
      // 退出全屏
      headerState.isFull = false
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (htmlDocument.mozCancelFullScreen) {
        htmlDocument.mozCancelFullScreen()
      } else if (htmlDocument.webkitExitFullscreen) {
        htmlDocument.webkitExitFullscreen()
      }
    }
  }

  /**
   * 浏览器当前是否全屏
   * @return {*|boolean}
   */
  const isFullScreen = () => {
    return (document as any).isFullScreen || (document as any).mozIsFullScreen || (document as any).webkitIsFullScreen
  }

  return {
    onFullScreen,
    isFullScreen
  }
}
