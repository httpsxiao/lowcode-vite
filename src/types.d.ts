type PointType = 'tl'|'tr'|'bl'|'br'|'l'|'r'|'t'|'b'

interface ComponentConfig {
  elName: string
  uuid: string
  title: string
  icon: string
  points: PointType[]
  config: {
    contenteditable: boolean
    lineHeightSame: boolean
    classList: string[]
  },
  style: {
    position: 'absolute' | 'fixed'
    top: number
    left: number
    width: number
    height: number
    padding: number
    fontSize: number
    lineHeight: number
    textAlign: string
    minWidth?: number
    minHeight?: number
  },
  propsValue: Record<string, string>
}

interface SetElementPositionIns {
  uuid: string
  data: {
    top: number
    left: number
    width?: number
    height?: number
  }
}
