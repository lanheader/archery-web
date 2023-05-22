/*
 * @Descripttion:
 * @version:
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 13:54:45
 */
const Lock = () => import('@/views/lock/index.vue')

export default [
  {
    path: '/lock',
    name: 'lock',
    component: Lock,
    meta: {
      title: '屏幕已锁定',
    },
  },
]
