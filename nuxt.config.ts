import tailwindcss from '@tailwindcss/vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/content', '@nuxtjs/seo'],
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page-slide' },
  },
  css: ['~/assets/css/main.css', '~/assets/css/animate.css'],
  site: {
    title: '缔零科技', // 网站标题
    name: '缔零科技', // 网站名称
    description:
      '缔零科技提供一站式多模态全风险域内容审查平台，助力企业构建安全、合规的数字环境。了解我们的产品矩阵和合作伙伴，加入我们，共创安全未来。',
    url: 'https://nuxtseo.com/docs/nuxt-seo/getting-started/introduction',
    image: '/favicon.ico', // 网站预览图
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  compatibilityDate: '2025-07-15',
  vite: {
    plugins: [tailwindcss(), viteTsconfigPaths()],
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
        dir: './app/assets/icons',
      },
      {
        prefix: 'my-job',
        dir: './app/assets/icons/jobs',
      },
    ],
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: '公司/组织名称',
      logo: 'https://example.com/logo.png',
      sameAs: ['https://www.linkedin.com/company/xxx'],
    },
  },
})
