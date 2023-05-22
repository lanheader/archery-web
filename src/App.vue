<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 14:04:31
-->
<template>
  <el-config-provider :locale="locales[lang]" :size="size">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import localeZH from 'element-plus/lib/locale/lang/zh-cn'
import localeEN from 'element-plus/lib/locale/lang/en'
import useLang from '@/i18n/useLang'

export default defineComponent({
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  setup() {
    const { lang } = useLang()
    return {
      lang,
      locales: {
        'zh-cn': localeZH,
        en: localeEN,
      },
      size: 'default',
    }
  },
})
</script>
<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  * {
    outline: none;
  }
}
</style>
