<template>
  <div class="btn">
    {{ propsValue.text }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LibButton',
  props: {
    propsValue: {
      type: Object,
      default: () => ({})
    }
  }
})
</script>

<style lang="stylus" scoped>
.btn
  width 100px
  height 50px
  line-height 50px
  font-size 18px
  color #fff
  background-color #79bbff
  user-select none
  cursor pointer
  border-radius 2px
  box-sizing border-box
</style>>
