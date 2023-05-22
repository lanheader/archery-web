/*
 * @Descripttion:
 * @version:
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 14:02:36
 */
import request from '@/utils/request'

// 获取菜单
export const GetMenus = params => {
  return request({
    url: '/api/menus',
    method: 'get',
    params,
  })
}
