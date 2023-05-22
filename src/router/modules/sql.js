/*
 * @Descripttion:
 * @version:
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-12 21:59:32
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-19 10:37:43
 */
const Layout = () => import('@/layout/index.vue')
const Workflow = () => import('@/views/sqlworkflow/index.vue')
const Sqlsubmit = () => import('@/views/sqlworkflow/nest/sqlsubmit.vue')
const Edit = () => import('@/views/sqlworkflow/nest/edit.vue')

export default [
  {
    path: '/sqlworkflow',
    component: Layout,
    name: 'sqlworkflow',
    meta: {
      title: 'SQL审核',
    },
    icon: 'Location',
    children: [
      {
        path: '',
        name: 'sqlworkflow',
        component: Workflow,
        meta: {
          title: 'SQL上线',
        },
      },
      {
        path: 'submitsql',
        name: 'submitsql',
        component: Sqlsubmit,
        meta: {
          title: '提交SQL',
        },
        hidden: true, // 不在菜单中显示
      },
      {
        path: 'edit/:id',
        name: 'edit',
        component: Edit,
        meta: {
          title: '审核详细信息',
        },
        hidden: true, // 不在菜单中显示
      },
      {
        path: 'sqlanalyze',
        name: 'sqlanalyze',
        component: Edit,
        meta: {
          title: 'SQL分析',
        },
      },
    ],
  },
]
