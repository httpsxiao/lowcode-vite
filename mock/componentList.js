const defaultStyle = {
  position: 'absolute',
  top: 5,
  left: 5
}

module.exports = {
  list: [{
    elName: 'el-button',
    title: '按钮',
    icon: '',
    pointList: ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b'],
    contenteditable: false,
    options: {
      classList: []
    },
    commonStyle: {
      ...defaultStyle,
      padding: 8,
      fontSize: 15,
      lineHeight: 17,
      width: 160,
      height: 20,
      minWidth: 35,
      textAlign: 'left'
    },
    propsValue: {}
  }]
}
