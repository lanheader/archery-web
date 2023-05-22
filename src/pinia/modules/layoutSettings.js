/*
 * @Descripttion:
 * @version:
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-22 13:55:34
 */
import { defineStore } from 'pinia'
import { getItem, setItem } from '@/utils/storage' //getItem和setItem是封装的操作localStorage的方法
import defaultSettings from '@/default-settings'

export const useLayoutsettings = defineStore('layoutSettings', {
  state: () => getItem('defaultSettings') || defaultSettings,
  actions: {
    saveSettings(data) {
      Object.entries(data).forEach(([key, value]) => {
        this[key] = value
      })
      setItem('defaultSettings', data)
    },
  },
})
