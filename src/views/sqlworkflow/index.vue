<template>
  <pro-table
    ref="table"
    title="审核列表"
    :request="getWorkflowList"
    :columns="columns"
    :search="searchConfig"
    :border="true"
    @selectionChange="handleSelectionChange"
  >
    <!-- 工具栏 -->
    <template #toolbar>
      <el-button
        type="primary"
        icon="Check"
        @click="$router.push(`/sqlworkflow/submitsql`)"
      >
        SQL提交
      </el-button>
      <el-button type="primary" icon="Refresh" @click="refresh">
        刷新
      </el-button>
    </template>
    <template #status="scope">
      <el-tag v-if="scope.row.status === 'workflow_finish'" type="success">
        已正常结束
      </el-tag>
      <el-tag v-else-if="scope.row.status === 'workflow_manreviewing'">
        等待审核人审核
      </el-tag>
      <el-tag v-else-if="scope.row.status === 'workflow_abort'" type="info">
        人工终止流程
      </el-tag>
      <el-tag
        v-else-if="scope.row.status === 'workflow_review_pass'"
        type="warning"
      >
        审核通过
      </el-tag>
      <el-tag
        v-else-if="scope.row.status === 'workflow_timingtask'"
        type="warning"
      >
        定时执行
      </el-tag>
      <el-tag
        v-else-if="scope.row.status === 'workflow_executing'"
        type="warning"
      >
        执行中
      </el-tag>
      <el-tag
        v-else-if="scope.row.status === 'workflow_autoreviewwrong'"
        type="danger"
      >
        自动审核不通过
      </el-tag>
      <el-tag
        v-else-if="scope.row.status === 'workflow_exception'"
        type="danger"
      >
        执行有异常
      </el-tag>
      <el-tag v-else type="info">
        未知状态
      </el-tag>
    </template>
    <template #is_backup="{row}">
      <el-tag :type="row.is_backup === true ? 'success' : 'danger'">
        {{ row.is_backup === true ? '是' : '否' }}
      </el-tag>
    </template>
    <template #syntax_type="{row}">
      {{ syntax_type[row.syntax_type] }}
    </template>
    <template #operate="scope">
      <el-button
        size="small"
        type="primary"
        @click="$router.push(`/sqlworkflow/edit/${scope.row.id}`)"
      >
        编辑
      </el-button>
      <el-button size="small" type="info" @click="workflowLog(scope)">
        操作日志
      </el-button>
    </template>
  </pro-table>
  <el-dialog v-model="workflowLogSwitch" title="工单日志">
    <el-table :data="workflowLogData">
      <el-table-column
        property="operation_type_desc"
        label="操作"
        width="150"
      />
      <el-table-column property="operator_display" label="操作人" width="200" />
      <el-table-column property="operation_time" label="操作时间" />
      <el-table-column property="operation_info" label="操作信息" />
    </el-table>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { SQLWorkflow, SQLWorkflowLog } from '@/api/sqlworkflow'
import { columns, searchfields } from './data/dataRouse.js'
export default defineComponent({
  name: 'workflowList',
  setup() {
    const state = reactive({
      current: 1,
      syntax_type: { 0: '未知', 1: 'DDL', 2: 'DML' },
      columns: columns,
      searchConfig: {
        labelWidth: '90px',
        inputWidth: '300px',
        fields: searchfields,
      },
      workflowLogSwitch: false,
      workflowLogData: [],
      selectedItems: [],
      /**
       * @msg: 异步获取sql上线日志类型
       * @return {*}
       * @param {*} scop
       * @workflow_type {integer} 里的类型是指当前页面数据sql上线，所以为2，如果是sql查询则这里的值变为1
       */
      async workflowLog(scop) {
        const { data } = await SQLWorkflowLog({
          workflow_id: scop.row.id,
          workflow_type: 2,
        })
        this.workflowLogData = data.results
        state.workflowLogSwitch = true
      },
      /**
       * @msg: 表格数据选则以后触发的操作
       * @return {*}
       * @param {*} arr
       */
      handleSelectionChange(arr) {
        state.selectedItems = arr
      },
      /**
       * @msg: 获取审核列表
       * @return {*}
       * @param {*} params
       */
      async getWorkflowList(params) {
        const { data } = await SQLWorkflow(params)
        return {
          data: data.results,
          total: +data.count,
        }
      },
    })
    /**
     * @msg: 初始化table
     * @return {*}
     */
    const table = ref(null)
    /**
     * @msg: 刷新按钮
     * @return {*}
     */
    const refresh = () => {
      table.value.refresh()
    }
    return {
      ...toRefs(state),
      refresh,
      table,
    }
  },
})
</script>
