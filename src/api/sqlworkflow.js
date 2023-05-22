/*
 * @Author: lanjiaxuan lanjiaxuan@e6yun.com
 * @Date: 2023-05-12 22:24:15
 * @LastEditors: lanjiaxuan lanjiaxuan@e6yun.com
 * @LastEditTime: 2023-05-18 21:49:24
 * @FilePath: /archery-web/src/api/sqlworkflow.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
