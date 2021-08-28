<template>
  <div class="container">
    <div class="tip">404</div>
    <div class="btn">
      <el-button type="primary" plain @click="goIndex">回到首页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent(() => {
  const state = reactive({ msg: '404' })
  const computedMsg = computed(() => state.msg + '~')
  const router = useRouter()
  const goIndex = () => router.replace('/')

  return { computedMsg, goIndex }
})
</script>

<style scoped lang="stylus">
.container
  margin-top: 100px;
  .tip
    font-size 40px
  .btn
    margin-top 20px
</style>
