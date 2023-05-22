/*
 * @Descripttion:
 * @version:
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 14:02:31
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
