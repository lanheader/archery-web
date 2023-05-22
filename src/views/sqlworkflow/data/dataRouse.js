/*
 * @Descripttion:
 * @version:
 * @Author: Lanjx <lanheader@163.com>
 * @HomePage: https://www.cnblogs.com/lanheader/
 * @Date: 2023-05-19 14:52:06
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-19 20:31:31
 */

import { Instance, ResourceGroup, InstanceResource } from '@/api/instance'

/**
 * @msg: 获取实例信息
 * @return {*}
 * @param {*} queryString
 * @instance_name__icontains {str} 根据后端查询字段命名
 */
export const getInstance = async (queryString, resource_group = '') => {
  const { data } = await Instance({
    instance_id: queryString,
    resource_group__group_name: resource_group,
    size: 100,
  })
  return data
}
/**
 * @msg: 获取资源组信息
 * @return {*}
 * @param {*} queryString 用户输入的字符串
 */
export const getResourceGroup = async queryString => {
  const { data } = await ResourceGroup({
    group_id: queryString,
    size: 100,
  })
  return data
}
/**
 * @msg: 获取实例资源信息，如数据库，表、列等信息
 * @return {*}
 * @param {*} queryString
 * @param {*} cb
 */
export const getInstanceResource = async (instanceId, resourceType) => {
  console.log(instanceId)
  console.log(resourceType)
  const { data } = await InstanceResource({
    instance_id: instanceId,
    resource_type: resourceType,
  })
  const options = data.results.map(result => {
    return { name: result.id, value: result.instance_name }
  })
  return options
}
/**
 * @msg: 表格列头
 * @return {*}
 */
export const columns = [
  { type: 'selection', width: 56 },
  {
    label: '工单名称',
    prop: 'workflow_name',
    sortable: true,
  },
  {
    label: '工单完整名称',
    prop: 'workflow_name',
  },
  {
    label: '类型',
    prop: 'syntax_type',
    tdSlot: 'syntax_type',
  },
  {
    label: '发起人',
    prop: 'engineer_display',
  },
  {
    label: '工单状态',
    prop: 'status',
    tdSlot: 'status',
  },
  {
    label: '备份',
    prop: 'is_backup',
    tdSlot: 'is_backup',
  },
  {
    label: '发起时间',
    prop: 'create_time',
  },
  {
    label: '执行起始',
    prop: 'run_date_start',
  },
  {
    label: '执行结束',
    prop: 'run_date_end',
  },
  {
    label: '目标实例',
    prop: 'instance_name',
  },
  {
    label: '数据库',
    prop: 'db_name',
  },
  {
    label: '组',
    prop: 'group_name',
  },
  {
    label: '操作',
    align: 'center',
    tdSlot: 'operate', // 自定义单元格内容的插槽名称
    width: 170,
  },
]
/**
 * @msg: 获取资源组选项
 * @return {*}
 * @param {*} query
 */
export const getResourceGroupOptions = async (query, cb) => {
  const data = await getResourceGroup(query)
  const options = data.results.map(res => {
    return { label: res.group_name, value: res.group_id }
  })
  return cb(options)
}
/**
 * @msg: 获取实例选项
 * @return {*}
 * @param {*} query
 */
export const getInstanceOptions = async (query, cb) => {
  const options = await getInstance(query).results.map(result => {
    return { label: result.instance_name, value: result.id }
  })
  return cb(options)
}

/**
 * @msg: form表单数据
 * @return {*}
 */
export const searchfields = [
  {
    label: '状态',
    name: 'workflow__status',
    type: 'select',
    options: [
      {
        value: 'workflow_finish',
        name: '已正常结束',
        btn: 'success',
      },
      {
        value: 'workflow_abort',
        name: '人工终止流程',
        btn: 'info',
      },
      {
        value: 'workflow_manreviewing',
        name: '等待审核人审核',
      },
      {
        value: 'workflow_review_pass',
        name: '审核通过',
        btn: 'warning',
      },
      {
        value: 'workflow_timingtask',
        name: '定时执行',
        btn: 'warning',
      },
      {
        value: 'workflow_executing',
        name: '执行中',
        btn: 'warning',
      },
      {
        value: 'workflow_autoreviewwrong',
        name: '自动审核不通过',
        btn: 'danger',
      },
      {
        value: 'workflow_exception',
        name: '执行有异常',
        btn: 'danger',
      },
    ],
  },
  {
    label: '资源组',
    name: 'workflow__group_name',
    type: 'autocomplete',
    debounce: 500,
    querySearchAsync: getResourceGroupOptions,
    options: [],
  },
  {
    label: '实例',
    name: 'workflow__instance__id',
    type: 'autocomplete',
    debounce: 500,
    querySearchAsync: getInstanceOptions,
    options: [],
  },
  {
    label: '发起时间',
    name: 'workflow__create_time',
    type: 'datetimerange',
    trueNames: ['workflow__create_time__gte', 'workflow__create_time__lt'],
    style: { width: '400px' },
    defaultValue: [],
  },
]
