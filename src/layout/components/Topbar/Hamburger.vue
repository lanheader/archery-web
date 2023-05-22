<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 13:58:48
-->
<template>
  <el-icon
    :size="20"
    class="fold-btn"
    :class="{ collapse: collapse }"
    @click="handleToggleMenu"
  >
    <Fold />
  </el-icon>
</template>
<script>
import { useApp } from '@/pinia/modules/app'
import { storeToRefs } from 'pinia'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const appStore = useApp()
    const { sidebar } = storeToRefs(appStore)
    const { setCollapse } = appStore
    const handleToggleMenu = () => {
      setCollapse(+!sidebar.value.collapse)
    }
    return {
      collapse: computed(() => sidebar.value.collapse),
      handleToggleMenu,
    }
  },
})
</script>
<style lang="scss" scoped>
.fold-btn {
  line-height: 48px;
  padding: 0 10px;
  cursor: pointer;
  &.collapse {
    transform: scale(-1, 1);
  }
}
</style>
