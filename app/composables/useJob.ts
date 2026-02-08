import type { JobsCollectionItem } from '@nuxt/content'

// 获取所有岗位，但只包含指定字段
export const useAllJobsWithFields = (
  fields: (keyof JobsCollectionItem)[],
  options?: {
    order?: 'ASC' | 'DESC'
    sortBy?: keyof JobsCollectionItem
    limit?: number
  },
) => {
  const sortBy = (options?.sortBy ?? 'order') as keyof JobsCollectionItem
  const order = options?.order ?? 'ASC'
  const limit = options?.limit

  // 关键：把影响结果的参数纳入 key，避免缓存串数据
  const key = `jobs:all:${fields.join(',')}:sort=${String(sortBy)}:order=${order}:limit=${limit ?? 'all'}`

  return useAsyncData(key, async () => {
    let q = queryCollection('jobs')
      .select(...fields)
      .order(sortBy, order)

    // 关键：未传 limit 或 limit 非正数 => 不加 limit（返回全部）
    if (typeof limit === 'number' && Number.isFinite(limit) && limit > 0) {
      q = q.limit(limit)
    }

    return (await q.all()) as Pick<JobsCollectionItem, (typeof fields)[number]>[]
  })
}
