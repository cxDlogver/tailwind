// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    jobs: defineCollection({
      type: 'page', // 页面型内容（会有 body，可用于 ContentRenderer）
      source: 'jobs/**/*.md',
      schema: z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        base: z.array(z.string()).default([]),
        category: z.string().optional(),
        order: z.number().optional(),
        description: z.string().optional(),
      }),
    }),
  },
})
