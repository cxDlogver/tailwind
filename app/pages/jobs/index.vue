<script setup lang="ts">
type JobListItem = {
  title: string
  slug: string
  base: string[]
  category?: string
  order?: number
  description?: string
  path: string
}

const route = useRoute()

const q = computed(() => (route.query.q as string) || '')
const city = computed(() => (route.query.city as string) || '')
const cat = computed(() => (route.query.cat as string) || '')

const { data: jobs } = await useAsyncData('jobs:list', async () => {
  // 只取列表需要的字段，避免把 body 拉下来
  const rows = await queryCollection('jobs')
    .select('title', 'slug', 'base', 'category', 'order', 'description', 'path')
    .order('order', 'ASC')
    .all()

  return rows as JobListItem[]
})

const filtered = computed(() => {
  const list = jobs.value || []
  return list.filter((j) => {
    const okQ = !q.value || j.title.toLowerCase().includes(q.value.toLowerCase())
    const okCity = !city.value || (j.base || []).includes(city.value)
    const okCat = !cat.value || j.category === cat.value
    return okQ && okCity && okCat
  })
})
</script>

<template>
  <div class="container mx-auto px-6 py-10">
    <h1 class="text-3xl font-semibold tracking-tight">招聘岗位</h1>

    <div class="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
      <input
        class="h-10 rounded-xl border border-neutral-200 px-3 text-sm"
        :value="q"
        placeholder="搜索岗位名称"
        @input="
          $router.replace({
            query: { ...route.query, q: ($event.target as HTMLInputElement).value || undefined },
          })
        "
      />
      <input
        class="h-10 rounded-xl border border-neutral-200 px-3 text-sm"
        :value="city"
        placeholder="城市（如：深圳）"
        @input="
          $router.replace({
            query: { ...route.query, city: ($event.target as HTMLInputElement).value || undefined },
          })
        "
      />
      <input
        class="h-10 rounded-xl border border-neutral-200 px-3 text-sm"
        :value="cat"
        placeholder="类别（如：algorithm/backend）"
        @input="
          $router.replace({
            query: { ...route.query, cat: ($event.target as HTMLInputElement).value || undefined },
          })
        "
      />
    </div>

    <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
      <NuxtLink
        v-for="job in filtered"
        :key="job.path"
        :to="`/jobs/${job.slug}`"
        class="group rounded-2xl border border-neutral-200 p-5 transition hover:-translate-y-0.5 hover:border-neutral-300"
      >
        <div class="text-lg font-medium">{{ job.title }}</div>
        <div class="mt-2 text-sm text-neutral-500">
          {{ (job.base || []).join(' / ') }}
          <span v-if="job.category">· {{ job.category }}</span>
        </div>
        <div v-if="job.description" class="mt-3 line-clamp-2 text-sm text-neutral-500">
          {{ job.description }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
