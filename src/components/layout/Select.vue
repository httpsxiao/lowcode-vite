<template>
  <div class="container">
    <p class="title">{{ title }}</p>
    <div class="lib">
      <div
        v-for="component in componentList"
        :key="component.title"
        class="component"
        draggable="true"
        @dragstart="onDragstart($event, component)"
        @dragend="dragend"
      >
        <div>{{ component.title }}</div>
      </div>
      <div v-if="componentList.length % 2 === 1" class="component transparent"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'

export default defineComponent({
  name: 'Select',
  setup() {
    const title = ref('物料库')
    const store = useStore(key)
    const onDragstart = (e: DragEvent, component: ComponentConfig) => {
      if (e.dataTransfer) {
        e.dataTransfer.setData('config', JSON.stringify(component))
        e.dataTransfer.effectAllowed = 'copyMove'
      }
    }

    return {
      title,
      componentList: computed(() => store.state.componentList),
      onDragstart
    }
  }
})
</script>

<style lang="stylus" scoped>
.container
  height 100%
  padding 10px 20px
  box-sizing border-box
  .title
    font-size 20px
    font-weight bold
    margin-bottom 10px
  .lib
    display flex
    justify-content space-around
    flex-wrap wrap
    .component
      width 45%
      height 50px
      line-height 50px
      font-size 18px
      color #fff
      background-color #79bbff
      user-select none
      cursor pointer
      border-radius 2px
      margin-top 10px
      &.transparent
        pointer-events none
        background-color transparent
</style>>
