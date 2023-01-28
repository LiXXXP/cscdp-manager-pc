export interface HeaderState {
  time: string
  isFull: boolean
  timeInterval: NodeJS.Timer | null
}

export interface ExtendedDocument extends Document {
  fullScreen?: any
  mozFullScreen?: any
  webkitIsFullScreen?: any
  mozCancelFullScreen?: any
  webkitExitFullscreen?: any
}
