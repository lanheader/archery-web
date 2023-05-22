<template>
  <div class="page-box">
    <el-row :gutter="40" class="search">
      <el-col :span="16">
        <div id="sqlsubmit">
          <MonacoEditor
            v-model="state.code"
            :language="state.sql"
            :value="state.value"
            :theme="state.theme"
            :options="state.options"
            ref="editorRef"
          />
        </div>
      </el-col>
      <el-col :span="8">
        <el-form :model="searchForm" label-position="left" label-width="10%">
          <el-row>
            <el-col></el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="工单名称">
                <el-input
                  v-model="searchForm.submitName"
                  placeholder="请输入上线单名称，如:XX项目会员功能建表"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="需求链接">
                <el-input
                  v-model="searchForm.demand_url"
                  placeholder="请输入需求链接"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="资源组">
                <el-autocomplete
                  v-model="searchForm.group_name"
                  :fetch-suggestions="getResourceGroupOptions"
                  placeholder="请选择资源组"
                  :debounce="500"
                  highlight-first-item
                  weight="100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="实例">
                <el-autocomplete
                  v-model="searchForm.instance_name"
                  :fetch-suggestions="getInstanceOptions"
                  :placeholder="请选则实例"
                  :debounce="500"
                  highlight-first-item
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="数据库">
                <el-input
                  v-model="searchForm.db_name"
                  placeholder="请选择数据库"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="执行时间">
                <el-date-picker
                  v-model="searchForm.run_date_range"
                  type="datetimerange"
                  :shortcuts="shortcuts"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item class="search-btn">
                <el-button @click="handleReset" type="warning">
                  美化
                </el-button>
                <el-button type="danger" @click="handleSearch">
                  SQL检测
                </el-button>
                <el-button type="success" @click="handleSearch">
                  SQL提交
                </el-button>
                <el-button type="primary" @click="dialogVisible = true">
                  上传文件
                </el-button>
                <el-dialog
                  v-model="dialogVisible"
                  title=""
                  width="30%"
                  draggable
                >
                  <el-upload
                    class="upload"
                    drag
                    accept=".sql"
                    :limit="1"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :on-change="beforeUpload"
                  >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                      拖拽文件 或
                      <em>点击上传</em>
                    </div>
                    <template #tip>
                      <div class="el-upload__tip">
                        .sql文件， 并且不能超过 10MB.
                      </div>
                    </template>
                  </el-upload>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="dialogVisible = false">
                        关闭
                      </el-button>
                    </span>
                  </template>
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <!-- title 和 工具栏 -->
    <div class="head" v-if="!hideTitleBar">
      <slot name="title">
        <span class="title">{{ title }}</span>
      </slot>
      <div class="toolbar">
        <slot name="toolbar"></slot>
      </div>
    </div>
    <div class="table">
      <!-- <el-table
        v-loading="loading"
        :data="tableData"
        :row-key="rowKey"
        tooltip-effect="dark"
        stripe
        :border="border"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-for="item in columns"
          :key="item.label"
          :filter-method="item.filters && filterHandler"
          :show-overflow-tooltip="!item.wrap"
          v-bind="item"
          :label="item.label ? $t(item.label) : ''"
        >
          <template #header="scope" v-if="!!item.labelSlot">
            <slot :name="item.labelSlot" v-bind="scope"></slot>
          </template>
          <template #default="scope" v-if="!!item.tdSlot">
            <slot :name="item.tdSlot" v-bind="scope"></slot>
          </template>
        </el-table-column>
      </el-table> -->
    </div>
    <!-- 分页 -->
    <!-- <el-pagination
      v-if="paginationConfig.show && total > 0"
      class="pagination"
      :style="paginationConfig.style"
      @size-change="handleSizeChange"
      v-model:currentPage="pageNum"
      @current-change="handleCurrentChange"
      :page-sizes="paginationConfig.pageSizes"
      v-model:pageSize="pageSize"
      :layout="paginationConfig.layout"
      :total="total"
    ></el-pagination> -->
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import MonacoEditor from '@/components/editor/index.vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { Instance, ResourceGroup, InstanceResource } from '@/api/instance'
const editorRef = ref()
// 编辑器对象
const state = reactive({
  code: '',
  language: 'sql',
  theme: 'vc',
  value:
    '-- 请在此输入SQL，以分号结尾，仅支持DML和DDL语句，查询语句请使用SQL查询功能。',
  options: {
    minimap: {
      enabled: false,
    },
  },
})
/**
 * @msg: sql提交表单对象
 * @return {obj}
 */
const searchForm = reactive({
  submitName: '',
})
/**
 * @msg: 弹框对象
 * @return {*}
 */
const dialogVisible = ref(false)
/**
 * @msg: SQL文件解析
 * @return {None}
 * @param {*} file
 */
const beforeUpload = file => {
  // 检查文件类型是否是 .sql 文件
  if (!file.name.endsWith('.sql')) {
    ElMessage({
      message: '只能上传 .sql 文件。',
      type: 'warning',
    })
    return false
  }
  let reader = new FileReader() //先new 一个读文件的对象 FileReader
  if (typeof FileReader === 'undefined') {
    //用来判断你的浏览器是否支持 FileReader
    ElMessage({
      message: '您的浏览器不支持文件读取。',
      type: 'warning',
    })
    return
  }
  reader.readAsArrayBuffer(file.raw) //读任意文件
  reader.onload = function(e) {
    var ints = new Uint8Array(e.target.result) //要使用读取的内容，所以将读取内容转化成Uint8Array
    ints = ints.slice(0, 5000) //截取一段读取的内容
    let snippets = new TextDecoder('gb2312').decode(ints) //二进制缓存区内容转化成中文（即也就是读取到的内容）
    snippets = state.value + '\n' + snippets
    const editor = editorRef.value
    editor.setEditorValue(snippets)
  }
}
/**
 * @msg: 获取资源组
 * @return {*}
 * @param {*} queryString
 * @param {*} cb
 */
const getResourceGroupOptions = async (queryString, cb) => {
  const { data } = await ResourceGroup({
    group_name__icontains: queryString,
  })
  const options = data.results.map(res => {
    return { name: res.group_id, value: res.group_name }
  })
  return cb(options)
}
/**
 * @msg: 获取实例信息
 * @return {*}
 * @param {*} queryString
 * @param {*} cb
 */
const getInstanceOptions = async (queryString, cb) => {
  const { data } = await Instance({
    resource_group__group_name: searchForm.group_name,
    size: 100,
  })
  const options = data.results.map(result => {
    return { name: result.id, value: result.instance_name }
  })
  return cb(options)
}
/**
 * @msg: 获取实例资源信息
 * @return {*}
 * @param {*} queryString
 * @param {*} cb
 */
const getInstanceResource = async (queryString, cb) => {
  const { data } = await InstanceResource({
    instance_id: 550,
    resource_type: 'database',
  })
  const options = data.results.map(result => {
    return { name: result.id, value: result.instance_name }
  })
  return cb(options)
}
</script>

<style lang="scss" scoped>
.page-box {
  width: 100%;
  box-sizing: border-box;
  .search {
    padding: 20px 20px 0;
    background: #fff;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    // .el-form-item {
    //   margin-bottom: 20px;
    // }
    #sqlsubmit {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: left;
      color: #2c3e50;
      margin-bottom: 10px;
      height: 350px;
      width: 100%;
      box-sizing: border-box;
    }
    .search-btn {
      margin-left: auto;
    }
    :deep(.el-input-number .el-input__inner) {
      text-align: left;
    }
    :deep(.el-range-editor.el-input__wrapper) {
      box-sizing: border-box;
    }
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 0;
    background: #fff;
    .title {
      font-size: 16px;
    }
  }
  .table {
    padding: 20px;
    background: #fff;
  }
  .pagination {
    padding: 0 20px 20px;
    background: #fff;
    justify-content: flex-end;
    :last-child {
      margin-right: 0;
    }
  }
}
</style>
