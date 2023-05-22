<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 13:56:44
-->
<template>
  <div class="brand">
    <img class="logo" src="~@/assets/logo.svg" @click="goHome" />
    <div class="title">Archery</div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const goHome = () => {
      router.push('/')
    }
    return { goHome }
  },
})
</script>
<style lang="scss" scoped>
.brand {
  height: 48px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo {
    cursor: pointer;
    max-width: 32px;
    max-height: 32px;
  }
  .title {
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    margin-left: 8px;
    transition: all 0.5s;
  }
}
</style>
