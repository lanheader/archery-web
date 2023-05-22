<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 13:56:21
-->
<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cacheList">
      <component :is="Component" :key="key" />
    </keep-alive>
  </router-view>
</template>
<script>
import { storeToRefs } from 'pinia'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useTags } from '@/pinia/modules/tags'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { cacheList } = storeToRefs(useTags())
    const key = computed(() => route.fullPath)

    return {
      cacheList,
      key,
    }
  },
})
</script>
