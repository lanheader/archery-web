/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: lanjiaxuan lanjiaxuan@e6yun.com
 * @LastEditTime: 2023-05-12 23:36:05
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */
import request from '@/utils/request'

// 登录接口
export const Login = data => {
  return request({
    url: '/api/auth/token/',
    method: 'post',
    data,
  })
}
// 刷新token
export const RefToken = data => {
  return request({
    url: '/api/auth/token/refresh/',
    method: 'post',
    data,
  })
}

// 获取登录用户信息
export const GetUserinfo = () => {
  return request({
    url: 'api/v1/userinfo/',
    method: 'get',
  })
}
