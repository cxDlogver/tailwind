import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import viteTsconfigPaths from 'vite-tsconfig-paths'

const rootDir = fileURLToPath(new URL('./', import.meta.url))

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/icon'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [tailwindcss(), viteTsconfigPaths()],
    resolve: {
      alias: {
        '~': rootDir,
        '~~': rootDir,
        '@': rootDir,
        '@@': rootDir,
      },
    },
  },
  eslint: {
    checker: true, // 开发时实时检查
    config: {
      stylistic: true,
    },
  },
  icon: {
    // 统一默认表现（不写 size 时就是这个）
    size: '1.1em',
    class: 'inline-block align-[-0.125em]',

    // Tailwind v4 + css mode 必配
    mode: 'css',
    cssLayer: 'base',

    // 全局别名：你在组件里可以直接用 <Icon name="close" />
    aliases: {
      close: 'heroicons:x-mark', // 关闭
      open: 'heroicons:bars-3', // 打开/菜单
      expand: 'heroicons:chevron-down', // 展开
      collapse: 'heroicons:chevron-up', // 收起
      ok: 'heroicons:check', // 确认
      warn: 'heroicons:exclamation-triangle',
    },
    provider: 'server',
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/icons',
      },
    ],
  },
})
