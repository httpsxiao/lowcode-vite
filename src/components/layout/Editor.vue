<template>
  <div class="container">
    <div class="bg">
      <div class="panel" :style="panelStyle" :class="isEnter ? 'highlight' : ''" @click="clearActiveUuid">
        <div
          class="content"
          @dragenter="onDragenter"
          @dragleave="onDragleave"
          @dragover.prevent
          @drop="onDrop"
        >
          <div v-for="el in elements" :key="el.uuid" class="single">
            <component-panel :comp="el" @updatePosition="updatePosition"></component-panel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import createNonElement from '@/utils/createNonElement'
import ComponentPanel from '../editor/ComponentPanel.vue'

function toggleStatus() {
  const isEnter = ref(false)
  const onDragenter = () => {
    isEnter.value = true
  }
  const onDragleave = () => {
    isEnter.value = false
  }
  const setStatus = (val: boolean) => {
    isEnter.value = val
  }

  return {
    isEnter,
    onDragenter,
    onDragleave,
    setStatus
  }
}

export default defineComponent({
  name: 'Editor',
  components: {
    ComponentPanel
  },
  setup() {
    const store = useStore(key)
    const panelStyle = computed(() => {
      const project = store.state.projectData
      const scale = `transform: scale(${project.scaleX}, ${project.scaleY});`
      const width = `width:${project.width}px;`
      const height = `height:${project.height}px;`

      return [width, height, scale].join('')
    })
    const elements = computed(() => {
      return store.state.projectData.elements
    })

    const { isEnter, onDragenter, onDragleave, setStatus } = toggleStatus()

    const onDrop = (e: DragEvent) => {
      setStatus(false)

      if (e.dataTransfer) {
        const component: ComponentConfig = JSON.parse(e.dataTransfer.getData('config'))
        e.dataTransfer.clearData()
        store.commit('addElement', createNonElement(component.elName, component.style))
      }
    }

    const clearActiveUuid = () => {
      store.commit('setActiveElementUuid')
    }

    const updatePosition = (data: SetElementPositionIns) => {
      store.commit('setElementPosition', data)
    }

    return {
      panelStyle,
      elements,
      isEnter,
      onDragenter,
      onDragleave,
      onDrop,
      clearActiveUuid,
      updatePosition
    }
  }
})
</script>

<style lang="stylus" scoped>
.container
  width 100%
  height 100%
  display flex
  justify-content center
  background-color #f5f5f5
  box-sizing border-box
  padding 20px
  .panel
    position relative
    margin 0 auto
    box-shadow 0 1px 2px rgba(150,150,150,.3)
    border 1px solid rgba(150,150,150,.3)
    border-radius 5px
    background-color #fff
    box-sizing border-box
    &.highlight
      border 1px solid #79bbff
    .content
      height 100%
      .single
        height 100%
</style>