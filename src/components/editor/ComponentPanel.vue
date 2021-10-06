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
      type: Object,
      default: () => ({})
    }
  },
  emits: ['updatePosition'],
  setup(props, context) {
    const store = useStore(key)

    // 计算外层和内层组件的样式
    const computedOuterStyle = computed(() => computeStyle(true))
    const computedStyle = computed(() => computeStyle(false))

    function computeStyle(isOuter: boolean) {
      const style = props.comp.style
      const attrs = Object.keys(style)

      let res = ''

      for (let i = 0; i < attrs.length; i++) {
        const k = attrs[i]

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

    // 外层鼠标按下事件
    function onComponentMousedown(e: MouseEvent) {
      const comp = props.comp

      // 设置当前组件
      store.commit('setActiveElementUuid', comp.uuid)

      const startY = e.clientY
      const startX = e.clientX
      const startTop = comp.style.top
      const startLeft = comp.style.left

      const move = (e: MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()

        const currX = e.clientX
        const currY = e.clientY
        const top = currY - startY + startTop
        const left = currX - startX + startLeft

        context.emit('updatePosition', { uuid: comp.uuid, top, left })
      }

      const up = () => {
        document.removeEventListener('mousemove', move, true)
        document.removeEventListener('mouseup', up, true)
      }

      document.addEventListener('mousemove', move, true)
      document.addEventListener('mouseup', up, true)
    }

    return {
      computedStyle,
      computedOuterStyle,
      onComponentMousedown
    }
  }
})
</script>

<style lang="stylus" scoped>
.component-container
  position relative
  .point
    position absolute
    z-index 3000
    width 4px
    height 4px
    background-color #fff
    border 1px solid #79bbff
</style>