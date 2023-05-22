/*
 * @Author: lanjiaxuan lanjiaxuan@e6yun.com
 * @Date: 2023-05-12 21:24:02
 * @LastEditors: Lanjx
 * @LastEditTime: 2023-05-19 11:44:25
 * @FilePath: /archery-web/.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 0,
    'no-use-before-define': 'off',
    'no-unused-vars': [
      'off',
      {
        // 允许声明未使用变量
        vars: 'local',
        // 参数不检查
        args: 'none',
      },
    ],
    'vue/no-unused-vars': 'warn',
    'no-prototype-builtins': 'off',
    'no-irregular-whitespace': 'off',
    'space-before-function-paren': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/attributes-order': 'off',
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-unused-components': 'off',
    'vue/no-setup-props-destructure': 'off',
    'vue/script-setup-uses-vars': 'off',
  },
}
