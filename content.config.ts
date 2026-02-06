// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    jobs: defineCollection({
      type: 'page', // 页面型内容（会有 body，可用于 ContentRenderer）
      source: 'jobs/**/*.md',
      schema: z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        slug: z.string().min(1),
        base: z.array(z.string()).default([]),
        category: z.string().default('研发组'),
        type: z.enum(['正式', '实习']).default('正式'),
        order: z.number().optional(),
        updatedAt: z.string().default(() => new Date().toISOString()),
        tags: z.array(z.string()).default([]),
        relatedJobs: z
          .array(
            z.object({
              title: z.string().min(1),
              base: z.array(z.string()).default([]),
              slug: z.string().min(1),
            }),
          )
          .default([]),
      }),
    }),
  },
})
