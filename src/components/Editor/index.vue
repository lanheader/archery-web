<!-- MonacoEditor.vue -->
<template>
  <div ref="editorContainer" class="editor-container"></div>
</template>

<script setup>
import * as monaco from 'monaco-editor'

// import { format } from 'sql-formatter'
import {
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
  reactive,
  defineProps,
  defineExpose,
  defineEmits,
} from 'vue'
import sqlKeywords from './sqlKeywords.js'
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: 'sql',
  },
  theme: {
    type: String,
    default: 'vs-light',
  },
  options: {
    type: Object,
    default: () => ({}),
  },
})
const emits = defineEmits(['update:modelValue'])
const editorContainer = ref(null)
let editorInstance

// 数据库对应的表名
const hintData = reactive({
  a: ['group', 'area'],
  b: ['user', 'client'],
})
// 表对应的字段名
const tableData = reactive({
  user: ['age', 'gender'],
  group: ['id', 'name'],
})
// 关键字提示
const getSQLSuggest = () => {
  return sqlKeywords.map(key => ({
    label: key,
    kind: monaco.languages.CompletionItemKind.Keyword,
    insertText: key,
    detail: 'keyword',
  }))
}
// 表名提示
const getTableSuggest = dbName => {
  const tableNames = hintData[dbName]
  if (!tableNames) {
    return []
  }
  return tableNames.map(name => ({
    label: name,
    kind: monaco.languages.CompletionItemKind.Constant,
    insertText: name,
    detail: dbName,
  }))
}
// 字段名提示
const getParamSuggest = tableName => {
  const params = tableData[tableName]
  if (!params) {
    return []
  }
  return params.map(name => ({
    label: name,
    kind: monaco.languages.CompletionItemKind.Constant,
    insertText: name,
    detail: 'param',
  }))
}
// 数据库名提示
const getDBSuggest = () => {
  return Object.keys(hintData).map(key => ({
    label: key,
    kind: monaco.languages.CompletionItemKind.Enum,
    insertText: key,
    detail: 'database',
  }))
}
onMounted(() => {
  editorInstance = monaco.editor.create(editorContainer.value, {
    value: props.value,
    language: props.language,
    theme: props.theme,
    autoIndex: true,
    tabCompletion: 'on',
    cursorSmoothCaretAnimation: true,
    formatOnPaste: true,
    mouseWheelZoom: true,
    folding: true, //代码折叠
    autoClosingBrackets: 'always',
    autoClosingOvertype: 'always',
    autoClosingQuotes: 'always',
    automaticLayout: 'always',
    overviewRulerBorder: true,
    renderLineHighlight: 'gutter',
    lineNumbersMinChars: 2,
    ...props.options,
  })

  editorInstance.onDidChangeModelContent(() => {
    emits('update:modelValue', editorInstance.getValue())
  })
  monaco.languages.registerCompletionItemProvider('sql', {
    // 触发条件，也可以不写，不写的话只要输入满足label就会提示
    // 只能配置单字符
    triggerCharacters: ['.', ' '],
    provideCompletionItems: (model, position) => {
      let suggestions = []
      const { lineNumber, column } = position
      const textBeforePointer = model.getValueInRange({
        startLineNumber: lineNumber,
        startColumn: 0,
        endLineNumber: lineNumber,
        endColumn: column,
      })
      const tokens = textBeforePointer
        .toLocaleLowerCase()
        .trim()
        .split(/\s+/)
      const lastToken = tokens[tokens.length - 1] // 获取最后一段非空字符串
      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      }
      if (lastToken.endsWith('.')) {
        // 提示该数据库下的表名
        const tokenNoDot = lastToken.slice(0, lastToken.length - 1)
        if (Object.keys(hintData).includes(tokenNoDot)) {
          suggestions = [...getTableSuggest(tokenNoDot)]
        }
      } else if (lastToken === '.') {
        suggestions = []
      } else if (textBeforePointer.endsWith(' ')) {
        if (textBeforePointer.endsWith('select * from ')) {
          // select * from 提示指定数据库的表名
          suggestions = getTableSuggest(props.database)
        } else if (lastToken === 'where') {
          // select * from tableName where 提示指定表的字段名
          const lastToken2 = tokens[tokens.length - 2]
          const lastToken3 = tokens[tokens.length - 3]
          const lastToken4 = tokens[tokens.length - 4]
          const lastToken5 = tokens[tokens.length - 5]
          if (lastToken5 + lastToken4 + lastToken3 === 'select*from') {
            suggestions = [...getParamSuggest(lastToken2)]
          } else {
            suggestions = []
          }
        } else {
          suggestions = []
        }
      } else {
        // 提示数据库名和关键词
        suggestions = [...getDBSuggest(), ...getSQLSuggest()]
      }
      return {
        suggestions,
      }
    },
  })
  editorInstance.setValue(props.value)
})

onBeforeUnmount(() => {
  editorInstance.dispose()
})
watch(
  () => props.value,
  newValue => {
    if (editorInstance.getValue() !== newValue) {
      editorInstance.setValue(newValue)
    }
  }
)

watch(
  () => props.language,
  newLanguage => {
    monaco.editor.setModelLanguage(editorInstance.getModel(), newLanguage)
  }
)

watch(
  () => props.theme,
  newTheme => {
    monaco.editor.setTheme(newTheme)
  }
)

watch(
  () => props.options,
  newOptions => {
    editorInstance.updateOptions(newOptions)
  }
)
const setEditorValue = value => {
  editorInstance.setValue(value)
}

const getEditorValue = () => {
  return editorInstance.getValue()
}
defineExpose({
  editorContainer,
  setEditorValue,
  getEditorValue,
})
</script>

<style>
.editor-container {
  width: 100%;
  height: 100%;
  text-align: left;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 4px;
}
.margin {
  background: #f0f0f0 !important;
}
</style>
