/*
 * @Descripttion:
 * @version:
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 14:02:46
 */
import request from '@/utils/request'

// 测试
export const TestError = () => {
  return request({
    url: '/api/500',
    method: 'get',
  })
}

// 用户列表
export const getUsers = data => {
  return request({
    url: '/api/test/users',
    method: 'post',
    data,
  })
}
