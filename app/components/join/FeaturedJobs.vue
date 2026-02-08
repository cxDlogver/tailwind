<script setup lang="ts">
import type { JobsCollectionItem } from '@nuxt/content'
import { computed } from 'vue'

const MAX_FEATURED_JOBS = 5
const { data } = useAllJobsWithFields(
  ['id', 'slug', 'title', 'category', 'type', 'base'] as const,
  {
    limit: MAX_FEATURED_JOBS,
  },
)
const featured = computed<JobsCollectionItem[]>(() => (data.value ?? []) as JobsCollectionItem[])
</script>

<template>
  <section
    class="bg-neutral-bg border-neutral-divider main-card relative overflow-hidden border-b pb-24"
  >
    <div class="relative z-10 container">
      <div class="mb-12 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <div class="max-w-2xl">
          <div class="mb-4 flex items-center gap-2">
            <div
              class="bg-primary flex h-10 w-10 rotate-3 items-center justify-center rounded-xl shadow-md"
            >
              <Icon name="lucide:zap" class="h-5 w-5 text-white" />
            </div>
            <span class="text-primary text-support font-black tracking-[0.4em] uppercase italic">
              Featured Openings
            </span>
          </div>

          <h2
            class="text-h4 text-neutral-text1 md:text-h1 leading-none font-black tracking-tighter uppercase italic"
          >
            精选 <span class="text-primary">开放职位</span>
          </h2>
        </div>
      </div>

      <!-- 职位列表 -->
      <div class="space-y-4">
        <div
          v-for="(job, idx) in featured"
          :key="job.id"
          class="group border-neutral-text1 hover:bg-neutral-bg relative cursor-pointer rounded-4xl border-2 bg-white p-6 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(59,112,115,1)] md:p-8"
          @click="navigateTo(`/jobs/${job.slug}`)"
        >
          <div class="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-12">
            <!-- 轨道编号 -->
            <div class="flex shrink-0 items-center gap-5">
              <span
                class="text-h3 text-primary/10 group-hover:text-primary md:text-h1 w-10 text-center leading-none font-black italic transition-colors"
              >
                0{{ idx + 1 }}
              </span>

              <div
                class="bg-primary-light text-primary group-hover:bg-primary flex h-12 w-12 items-center justify-center rounded-xl transition-all group-hover:text-white"
              >
                <Icon name="lucide:play" class="h-4.5 w-4.5" />
              </div>
            </div>

            <!-- 标题与分类 -->
            <div class="min-w-0 flex-1">
              <div class="mb-1.5 flex items-center gap-3">
                <span
                  class="text-primary bg-primary-light rounded px-2 py-0.5 text-[10px] font-black tracking-widest uppercase"
                >
                  <!-- {{ pickCategoryLabel(job.category) }} -->
                </span>
                <span class="text-neutral-text3 text-[10px] font-bold uppercase opacity-60"
                  >/ {{ job.type }}</span
                >
              </div>

              <h3
                class="text-h3 md:text-h2 text-neutral-text1 group-hover:text-primary truncate leading-tight font-black transition-colors"
              >
                {{ job.title }}
              </h3>
            </div>

            <!-- 地点与操作 -->
            <div class="flex w-full items-center justify-between md:w-auto md:gap-12">
              <div class="flex items-center gap-2">
                <div class="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
                <span class="text-body text-neutral-text1 font-black uppercase italic">
                  {{ job.base ? job.base.join(' / ') : '面议' }}
                </span>
              </div>

              <div
                class="border-neutral-text1 group-hover:bg-neutral-text1 relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 transition-all group-hover:text-white"
              >
                <Icon
                  name="lucide:arrow-right"
                  class="h-5.5 w-5.5 transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 背景圆 -->
    <div
      class="bg-primary/5 pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full blur-[80px]"
    />
  </section>
</template>
