/*
 * @Descripttion:
 * @version:
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 13:59:28
 */
import { storeToRefs } from 'pinia'
import { useApp } from '@/pinia/modules/app'
import { onBeforeMount, onBeforeUnmount, computed } from 'vue'

const WIDTH = 768
export const useResizeHandler = () => {
  const appStore = useApp()
  const { sidebar } = storeToRefs(appStore)
  const { setDevice, setCollapse } = appStore
  const collapse = computed(() => sidebar.value.collapse)

  const isMobile = () => {
    return window.innerWidth < WIDTH
  }

  const resizeHandler = () => {
    if (isMobile()) {
      setDevice('mobile')
      setCollapse(1)
    } else {
      setDevice('desktop')
      setCollapse(collapse.value)
    }
  }

  onBeforeMount(() => {
    resizeHandler()
    window.addEventListener('resize', resizeHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
  })
}
