<template>
  <el-container>
    <el-header height="50px"></el-header>
    <el-main class="main">
      <div class="select-container">
        <Select></Select>
      </div>
      <div class="editor-container">
        <Editor></Editor>
      </div>
    </el-main>
    <el-footer height="30px"></el-footer>
  </el-container>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import Editor from './layout/Editor.vue'
import Select from './layout/Select.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Select,
    Editor
  },
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>

<style scoped lang="stylus">
.el-container
  height 100%
  .el-header
    border-bottom 1px solid rgba(0,0,0,.1)
  .el-footer
    border-top 1px solid rgba(0,0,0,.1)
  .main
    display flex
    padding 0
    .select-container
      width 300px
      border-right 1px solid rgba(0,0,0,.1)
    .editor-container
      flex 1

</style>
