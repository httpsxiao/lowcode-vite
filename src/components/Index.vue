<template>
  <el-container>
    <el-header height="100px"></el-header>
    <el-container>
      <el-aside width="300px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
    <el-footer height="50px"></el-footer>
  </el-container>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'Index',
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
