<script setup lang="ts">
type JobListItem = {
  _path: string
  id: string
  title: string
  base: string[]
  order: number
  updatedAt?: string
  tags?: string[]
}

const baseOpt = ['全部', '北京', '上海', '深圳', '武汉'] as const

const selectedBase = ref<(typeof baseOpt)[number]>('全部')
const keyword = ref('')

const queryKey = computed(() => `jobs-list:${selectedBase.value}:${keyword.value}`)

const {
  data: jobs,
  pending,
  error,
} = await useAsyncData<JobListItem[]>(
  queryKey.value,
  () => {
    console.log('Fetching jobs with base:', selectedBase.value)

    const q = queryContent('/jobs')
      .only(['_path', 'id', 'title', 'base', 'order', 'updatedAt', 'tags'])
      .sort({ order: 1 })

    if (selectedBase.value !== '全部') {
      q.where({ base: { $contains: selectedBase.value } })
    }

    const k = keyword.value.trim()
    if (k) {
      q.search(k)
    }
    console.log('Fetching jobs with base:', selectedBase.value, 'and keyword:', k)
    return q.find()
  },
  { watch: [selectedBase, keyword] },
)

useSeoMeta({
  title: '招聘职位',
  description: '查看当前开放岗位与任职要求。',
})
</script>

<template>
  <main class="p-top mx-auto max-w-5xl px-6">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">招聘职位</h1>
        <p class="mt-2 text-sm text-zinc-600">职位内容为静态内容源，支持 SSR 与 SEO。</p>
      </div>

      <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <div class="w-full sm:w-44">
          <label class="mb-1 block text-xs text-zinc-600">base</label>
          <select
            v-model="selectedBase"
            class="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
          >
            <option v-for="b in baseOpt" :key="b" :value="b">{{ b }}</option>
          </select>
        </div>

        <div class="w-full sm:w-64">
          <label class="mb-1 block text-xs text-zinc-600">关键词</label>
          <input
            v-model="keyword"
            type="text"
            placeholder="岗位名称 / 内容关键词"
            class="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
          />
        </div>
      </div>
    </header>

    <section class="mt-8">
      <div v-if="pending" class="text-sm text-zinc-600">加载中…</div>
      <div v-else-if="error" class="text-sm text-red-600">加载失败：{{ error.message }}</div>

      <ul v-else class="grid gap-4 sm:grid-cols-2">
        <li
          v-for="j in jobs || []"
          :key="j._path"
          class="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <NuxtLink
                :to="j._path"
                class="text-base font-semibold tracking-tight hover:underline"
              >
                {{ j.title }}
              </NuxtLink>
              <div class="mt-2 text-sm text-zinc-600">
                {{ (j.base || []).join(' / ') }}
              </div>
            </div>
            <div class="text-xs text-zinc-500">#{{ j.order }}</div>
          </div>

          <div v-if="j.tags?.length" class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="t in j.tags"
              :key="t"
              class="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700"
            >
              {{ t }}
            </span>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
