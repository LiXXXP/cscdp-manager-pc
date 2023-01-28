export interface HomeState {
  collectData: CollectData[]
  option: any
}

interface CollectData {
  title: string
  sum: number
  today: number
}
