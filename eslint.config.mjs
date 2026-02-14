import prettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt().append([
  // 1) 全局规则（JS/TS/Vue 通用）
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-unused-vars': 'off',
    },
  },

  // 2) 只对 Vue SFC 生效：强制 <script> 在 <template> 上面
  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/multi-word-component-names': 'off',
    },
  },

  // 3) 必须放最后：关闭与 Prettier 冲突的规则
  prettier,
])
