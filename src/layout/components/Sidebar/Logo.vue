<!--
 * @Author: lanjiaxuan lanjiaxuan@e6yun.com
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: lanjiaxuan lanjiaxuan@e6yun.com
 * @LastEditTime: 2023-05-15 22:56:06
 * @FilePath: /archery-web/src/layout/components/Sidebar/Logo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *                               神兽保佑            永无BUG
 * 
 * @Descripttion: 
 * @version: 
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-04-21 12:46:41
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 -->

<template>
  <div class="brand">
    <img class="logo" src="~@/assets/logo.svg" @click="goHome" />
    <div class="title">Archery</div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const goHome = () => {
      router.push('/')
    }
    return { goHome }
  },
})
</script>
<style lang="scss" scoped>
.brand {
  height: 48px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo {
    cursor: pointer;
    max-width: 32px;
    max-height: 32px;
  }
  .title {
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    margin-left: 8px;
    transition: all 0.5s;
  }
}
</style>
