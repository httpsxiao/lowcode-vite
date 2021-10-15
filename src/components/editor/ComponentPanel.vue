<template>
  <!-- 阻止 click 冒泡，防止父组件清空当前选中元素 -->
  <div
    class="component-container"
    :style="computedOuterStyle"
    @mousedown="onComponentMousedown"
    @click.stop
  >
    <component
      :is="comp.elName"
      :style="computedStyle"
      :props-value="comp.propsValue"
    ></component>

    <!-- 拖动点 -->
    <div
      v-for="item in computedPoints"
      :key="item"
      class="point"
      :style="getPointStyle(item)"
      @mousedown.stop.prevent="onPointMousedown(item, $event)"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'

type DirectionType = 't'|'b'|'l'|'r'

const needUnitStr = ['width', 'height', 'lineHeight', 'padding', 'top', 'left', 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom', 'borderWidth', 'fontSize', 'borderRadius', 'letterSpacing']
const outerAttrs = ['position', 'top', 'left', 'zIndex']
const direction = { t: 'n', b: 's', l: 'w', r: 'e' }

export default defineComponent({
  props: {
    comp: {
      type: Object as () => ComponentConfig,
      default: () => ({})
    }
  },
  emits: ['updatePosition'],
  setup(props, context) {
    const store = useStore(key)

    // 计算外层和内层组件的样式
    const computedOuterStyle = computed(() => computeStyle(props.comp.style, true))
    const computedStyle = computed(() => computeStyle(props.comp.style, false))

    // 获取 point 点
    const computedPoints = computed(() => {
      const comp = props.comp
      if (comp.uuid !== store.getters.activeElementUuid) {
        return []
      }
      return comp.points || []
    })

    // 计算每个 point 的位置和 cursor
    function getPointStyle(point: PointType) {
      return calculatePointStyle(props.comp.style, point)
    }

    // 外层鼠标按下事件
    function onComponentMousedown(e: MouseEvent) {
      const { uuid, style: { top, left } } = props.comp

      // 设置当前组件
      store.commit('setActiveElementUuid', uuid)

      const startY = e.clientY
      const startX = e.clientX

      const move = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault()

        const currX = moveEvent.clientX
        const currY = moveEvent.clientY
        const newTop = currY - startY + top
        const newLeft = currX - startX + left

        context.emit('updatePosition', {
          uuid,
          data: { top: newTop, left: newLeft }
        })
      }

      const up = () => {
        document.removeEventListener('mousemove', move, true)
        document.removeEventListener('mouseup', up, true)
      }

      document.addEventListener('mousemove', move, true)
      document.addEventListener('mouseup', up, true)
    }

    function onPointMousedown(point: PointType, e: MouseEvent) {
      const { uuid, style, config } = props.comp
      const {
        top,
        left,
        width,
        height,
        lineHeight,
        minWidth = 0,
        minHeight = 0
      } = style

      const startY = e.clientY
      const startX = e.clientX

      const move = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault()

        const disY = moveEvent.clientY - startY
        const disX = moveEvent.clientX - startX
        const hasT = point.includes('t') // 上
        const hasB = point.includes('b') // 下
        const hasL = point.includes('l') // 左
        const hasR = point.includes('r') // 右
        const newWidth = width + (hasL ? -disX : hasR ? disX : 0)
        const newHeight = height + (hasT ? -disY : hasB ? disY : 0)
        const newLineHeight = config.lineHeightSame ? newHeight : lineHeight
        const newTop = top + (hasT ? disY : 0)
        const newLeft = left + (hasL ? disX : 0)

        if (newWidth < minWidth) return
        if (newHeight < minHeight) return

        context.emit('updatePosition', {
          uuid,
          data: {
            top: newTop,
            left: newLeft,
            width: newWidth,
            height: newHeight,
            lineHeight: newLineHeight
          }
        })
      }

      const up = () => {
        document.removeEventListener('mousemove', move, true)
        document.removeEventListener('mouseup', up, true)
      }

      document.addEventListener('mousemove', move, true)
      document.addEventListener('mouseup', up, true)
    }

    return {
      computedPoints,
      computedStyle,
      computedOuterStyle,
      getPointStyle,
      onComponentMousedown,
      onPointMousedown
    }
  }
})

// 根据 style 参数计算最终样式
function computeStyle(style: ComponentConfig['style'], isOuter: boolean): string {
  const attrs = Object.keys(style)

  let res = ''

  for (let i = 0; i < attrs.length; i++) {
    const k = attrs[i] as keyof ComponentConfig['style']
    
    if (
      (isOuter && !outerAttrs.includes(k)) ||
      (!isOuter && outerAttrs.includes(k))
    ) {
      continue
    }

    if (needUnitStr.includes(k)) {
      res += `${k}:${style[k]}px;`
    } else {
      res += `${k}:${style[k]};`
    }
  }

  return res
}

// 计算 point 的样式
function calculatePointStyle(style: ComponentConfig['style'], point: PointType): Record<string, string | number> {
  const { width, height } = style
  const hasT = point.includes('t') // 上
  const hasB = point.includes('b') // 下
  const hasL = point.includes('l') // 左
  const hasR = point.includes('r') // 右

  let newTop = 0
  let newLeft = 0

  // 两个方向
  if (point.length === 2) {
    newLeft = hasL ? 0 : width
    newTop = hasT ? 0 : height
  } else {
    if (hasT || hasB) {
      newTop = hasT ? 0 : height
      newLeft = width / 2
    }

    if (hasL || hasR) {
      newLeft = hasL ? 0 : width
      newTop = height / 2
    }
  }

  return {
    top: `${newTop}px`,
    left: `${newLeft}px`,
    marginTop: (hasT || hasB) ? '-4px' : 0,
    marginLeft: (hasL || hasR) ? '-4px' : 0,
    cursor: (point.split('') as DirectionType[]).map(m => direction[m]).join('') + '-resize'
  }
}

</script>

<style lang="stylus" scoped>
.component-container
  position relative
  .point
    position absolute
    z-index 3000
    width 6px
    height 6px
    background-color #fff
    border 1px solid #79bbff
</style>