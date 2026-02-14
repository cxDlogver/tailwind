// composables/useSiteSeo.ts
export const useSiteSeo = () => {
  const siteUrl = 'https://example.com'
  const siteName = '你的站名'
  const siteDescription = '一句话站点定位（默认 description）'

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
