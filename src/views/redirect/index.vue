<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 13:51:43
-->
<script>
import { h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    router.replace(route.fullPath.replace(/^\/redirect/, ''))
  },
  render() {
    return h('div')
  },
}
</script>
