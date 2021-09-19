const defaultStyle = {
  position: 'absolute',
  top: 5,
  left: 5
}

module.exports = {
  list: [{
    elName: 'lib-button',
    title: '按钮',
    icon: '',
    points: ['tl', 'tr', 'bl', 'br', 'l', 'r', 't', 'b'],
    contenteditable: false,
    options: {
      classList: []
    },
    style: {
      ...defaultStyle,
      fontSize: 20,
      lineHeight: 50,
      width: 100,
      height: 50,
      minWidth: 35,
      textAlign: 'center'
    },
    propsValue: {}
  }]
}
