/*
 * @Descripttion:
 * @version:
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 22:24:15
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 14:02:41
 */
import request from '@/utils/request'

export const SQLWorkflow = params => {
  return request({
    url: '/api/v2/workflow/sql/',
    method: 'get',
    params,
  })
}

export const SQLWorkflowLog = data => {
  return request({
    url: '/api/v1/workflow/log/',
    method: 'post',
    data,
  })
}
