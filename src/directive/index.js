/*
 * @Descripttion:
 * @version:
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 14:00:36
 */
import { useAccount } from '@/pinia/modules/account'

export const Permission = app => {
  app.directive('permission', {
    mounted: function(el, binding) {
      const { permissionList } = useAccount()

      if (
        binding.value &&
        permissionList.every(item => item !== binding.value)
      ) {
        // 移除组件
        el.parentNode.removeChild(el)
      }
    },
  })
}
