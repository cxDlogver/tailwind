<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: job } = await useAsyncData(`jobs:${slug}`, async () => {
  // 用 where 语义按字段过滤（集合内查询）
  return await queryCollection('jobs').where('slug', '=', slug).first()
})

if (!job.value) {
  throw createError({ statusCode: 404, statusMessage: 'Job Not Found' })
}

useSeoMeta({
  title: () => `${job.value.title} - 招聘`,
  description: () => job.value.description || `招聘岗位：${job.value.title}`,
})
</script>

<template>
  <div class="container mx-auto px-6 py-10">
    <NuxtLink to="/jobs" class="text-sm text-neutral-500 hover:text-neutral-700">返回列表</NuxtLink>

    <header class="mt-4 rounded-2xl border border-neutral-200 p-6">
      <h1 class="text-3xl font-semibold tracking-tight">{{ job.title }}</h1>
      <div class="mt-3 text-sm text-neutral-500">
        {{ (job.base || []).join(' / ') }}
        <span v-if="job.category">· {{ job.category }}</span>
      </div>
    </header>

    <article class="prose mt-8 max-w-none">
      <ContentRenderer :value="job" />
    </article>
  </div>
</template>
