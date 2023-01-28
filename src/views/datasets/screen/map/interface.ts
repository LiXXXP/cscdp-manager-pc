export interface MapState {
  map: any
  categoryValue: number
  districtCode: string
  isZoomMin: boolean
  isZoomMax: boolean
  categorys: Categorys[]
}

interface Categorys {
  label: string
  value: number
}

export interface Item {
  districtCode: string
  districtName: string
  lat: number
  lng: number
  quantity: number
}
