import prettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt()
  // 你的自定义规则
  .append([
    {
      plugins: {
        'simple-import-sort': simpleImportSort,
      },
      rules: {
        // 1) import 自动排序（保存可自动 fix）
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',

        // 2) 常见“可自动修复/更一致”的规则（按需）
        'no-unused-vars': 'off', // Nuxt/TS 通常交给 TS/相关规则
        // 配置 script 在 template 之上的规则
        'vue/order-in-components': [
          'error',
          {
            // 强制定义组件的顺序，script 必须在 template 上方
            order: [
              ['template'],
              ['script'],
              'style', // 可选，可以调整样式的位置
            ],
          },
        ],
        // 关闭 vue 组件命名规则
        'vue/multi-word-component-names': 'off',
      },
    },

    // 3) 放在最后：关闭与 Prettier 冲突的 ESLint 格式类规则
    prettier,
  ])
