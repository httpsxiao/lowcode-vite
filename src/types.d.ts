interface ComponentConfig {
  elName: string,
  title: string,
  icon: string,
  pointList: string[],
  contenteditable: boolean,
  options: {
    classList: string[]
  },
  commonStyle: {
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