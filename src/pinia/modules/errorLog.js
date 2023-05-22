/*
 * @Descripttion: 
 * @version: 
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 13:55:40
 */
import { defineStore } from 'pinia'

export const useErrorlog = defineStore('errorLog', {
  state: () => ({
    logs: [],
  }),
  actions: {
    addErrorLog(log) {
      // 可以根据需要将错误上报给服务器
      // ....code.......

      this.logs.push(log)
    },
    clearErrorLog() {
      this.logs.splice(0)
    },
  },
})
