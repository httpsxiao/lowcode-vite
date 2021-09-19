type PointType = 'tl'|'tr'|'bl'|'br'|'l'|'r'|'t'|'b'

interface ComponentConfig {
  elName: string,
  uuid?: string,
  title: string,
  icon: string,
  points: PointType[],
  contenteditable: boolean,
  options: {
    classList: string[]
  },
  style: {
    position: 'absolute'
    top: number
    left: number
    width: number
    height: number
    padding: number
    minWidth: number
    fontSize: number
    lineHeight: number
    textAlign: string
  },
  propsValue: Record<string, string>
}

interface SetElementPositionIns {
  uuid: string,
  top: number,
  left: number
}
