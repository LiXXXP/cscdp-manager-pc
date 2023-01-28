import { reactive } from 'vue'
import ScreenApi from '@/api/screen/screen'
import { MapState, Item } from './interface'

export const mapState = reactive(<MapState>{
  map: null,
  categoryValue: 1,
  districtCode: '',
  isZoomMin: true,
  isZoomMax: true,
  categorys: [
    {
      label: '捐助点位',
      value: 1
    },
    {
      label: 'AED点位',
      value: 2
    }
  ]
})

export const useMapMethod = () => {
  /**
   * 地图初始化
   */
  const initMap = () => {
    mapState.map = new LKMap.Map('mapLK', {
      center: [108.5525, 34.3227], // 中心点
      zoom: 3, // 缩放级别
      style: 'lkmap://styles/nightblue'
    })

    mapState.map.on('zoomend', onMapZoomend)
  }

  /**
   * 地图缩放
   */
  const onMapZoomend = () => {
    // 当前缩放等级
    const zoom = mapState.map.getZoom()

    // 小于 5 级时
    if (zoom < 5) {
      mapState.isZoomMax = true
      mapState.districtCode = ''
      getWelfareQuantityListInquiry()
      mapState.isZoomMin = false
    }

    // 大于 5 级时
    if (zoom >= 5) {
      mapState.isZoomMin = true
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mapState.map.plugin(['Geocoder'], function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const geocoderService = new LKMap.Geocoder({ size: 1 })

        // 逆地理编码
        const center = mapState.map.getCenter()
        geocoderService.getAddress(center, (status: string, result: any) => {
          if (status === 'complete' && result) {
            mapState.districtCode = result[0]?.properties?.province_id
            getWelfareQuantityListInquiry()
            mapState.isZoomMax = false
          }
        })
      })
    }
  }

  /**
   * 切换点位时
   */
  const onChangeCategory = () => {
    mapState.isZoomMin = true
    mapState.isZoomMax = true
    getWelfareQuantityListInquiry()
  }

  /**
   * poi点聚合（捐助点位 or AED点位）
   */
  const getWelfareQuantityListInquiry = async () => {
    if (mapState.isZoomMin && mapState.isZoomMax) {
      // 清除地图覆盖物
      clearMap()

      // 获取点位数据
      const params = {
        category: mapState.categoryValue,
        parentDistrictCode: mapState.districtCode
      }
      const res = await ScreenApi.adminWelfareQuantityListInquiry(params)
      for (const item of res.body.dataList) {
        setTextMarker(item)
      }
    }
  }

  /**
   * 点聚合
   */
  const setTextMarker = (item: Item) => {
    const text = new LKMap.Text({
      position: new LKMap.LngLat(item.lng, item.lat),
      text: `<p>${item.districtName}</p><p>${item.quantity}</p>`, // 内容
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      anchor: 'center', // 设置文本对齐方式
      opacity: 1, // 设置透明度
      rotation: 0, // 旋转角度
      extData: item,
      style: {
        width: '80px',
        height: '80px',
        display: 'flex',
        color: '#020124',
        cursor: 'pointer',
        'font-weight': 800,
        'font-size': '12px',
        'line-height': '12px',
        'border-radius': '100%',
        'align-items': 'center',
        'flex-direction': 'column',
        'justify-content': 'center',
        background: 'url(https://cdgwin-prod.cn-bj.ufileos.com/gwin-platform/csca/blue_circle.png) no-repeat 0 0',
        'background-size': '100%'
      }
    })
    text.setMap(mapState.map)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    text.on('click', onClickTextMarker)
  }

  /**
   * 点击聚合，散到省份，显示城市数据
   */
  const onClickTextMarker = (item: any) => {
    const target = item.target.getExtData()

    // 设置地图中心点，省中心坐标
    mapState.map.setCenter([target.lng, target.lat])

    // 请求地区数据
    mapState.districtCode = target.districtCode

    // 设置地图层级
    mapState.map.setZoom(5)
  }

  /**
   * 删除地图上所有的覆盖物
   */
  const clearMap = () => {
    mapState.map?.clearMap()
  }

  /**
   * 注销地图对象，并清空地图容器
   */
  const destroyMap = () => {
    mapState.map?.destroy()
  }

  return {
    initMap,
    onChangeCategory,
    destroyMap,
    getWelfareQuantityListInquiry
  }
}
