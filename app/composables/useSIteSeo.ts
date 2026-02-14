// composables/useSiteSeo.ts
export const useSiteSeo = () => {
  const siteUrl = 'https://example.com'
  const siteName = '缔零科技'
  const siteDescription =
    '缔零科技提供一站式多模态全风险域内容审查平台，助力企业构建安全、合规的数字环境。了解我们的产品矩阵和合作伙伴，加入我们，共创安全未来。'
  useSeoMeta({
    description: siteDescription,
    ogSiteName: siteName,
    ogType: 'website',
    ogUrl: siteUrl,
    ogDescription: siteDescription,
    twitterCard: 'summary_large_image',
    twitterDescription: siteDescription,
  })

  useHead({
    htmlAttrs: { lang: 'zh-CN' },
    titleTemplate: (t) => (t ? `${t} - ${siteName}` : siteName),
    link: [{ rel: 'icon', href: '/favicon.ico' }],
  })

  return { siteUrl, siteName, siteDescription }
}
