import type { JobsCollectionItem } from '@nuxt/content'
import { createError, defineEventHandler, getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing job slug parameter' })
  }

  const job = (await queryCollection(event, 'jobs')
    .where('slug', '=', slug)
    .first()) as JobsCollectionItem | null

  if (!job) {
    throw createError({ statusCode: 404, statusMessage: `Job with slug "${slug}" not found` })
  }

  return job
})
