// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    jobs: defineCollection({
      type: 'page',
      source: 'jobs/*.md',
      schema: z.object({
        id: z.string(),
        order: z.number(),
        title: z.string(),
        base: z.array(z.string()),
        updatedAt: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
})
