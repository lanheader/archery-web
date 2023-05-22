/*
 * @Author: lanjiaxuan lanjiaxuan@e6yun.com
 * @Date: 2023-05-13 02:40:39
 * @LastEditors: lanjiaxuan lanjiaxuan@e6yun.com
 * @LastEditTime: 2023-05-18 20:38:47
 * @FilePath: /archery-web/src/api/instance.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request'

export const Instance = params => {
  return request({
    url: '/api/v1/instance/',
    method: 'get',
    params,
  })
}
export const ResourceGroup = params => {
  return request({
    url: '/api/v1/user/resourcegroup/',
    method: 'get',
    params,
  })
}
export const InstanceResource = data => {
  return request({
    url: '/api/v1/instance/resource/',
    method: 'post',
    data,
  })
}
