export function createUuid(): string {
  return '' + Date.now()
}

export default function createNonElement(name: string, style?: Record<string, string | number>): any {
  let text = ''

  if (name === 'lib-button') {
    text = '按钮'
  }

  return {
    elName: name,
    uuid: createUuid(),
    points: ['tl', 'tr', 'bl', 'br', 'l', 'r', 't', 'b'],
    config: {
      contenteditable: true,
      lineHeightSame: true,
      classList: []
    },
    style: {
      position: 'absolute',
      top: 5,
      left: 5,
      fontSize: 15,
      lineHeight: 50,
      width: 160,
      height: 50,
      textAlign: 'center',
      ...style
    },
    propsValue: {
      text
    }
  }
}
