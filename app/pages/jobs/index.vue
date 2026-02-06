<script setup lang="ts">
import type { JobsCollectionItem } from '@nuxt/content'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const { data } = useAllJobsWithFileds(['slug', 'title', 'category', 'type', 'base'] as const)
const RECENT_JOBS = computed<JobsCollectionItem[]>(() => (data.value ?? []) as JobsCollectionItem[])
console.log(RECENT_JOBS.value)

const CATEGORIES = computed(() => {
  const cats = Array.from(
    new Set(RECENT_JOBS.value.map((job) => job.category).filter((cat): cat is string => !!cat)),
  )
  cats.sort()
  return ['全部职位', '实习生/校园招聘', ...cats]
})

const activeCategory = ref('全部职位')
const search = ref((useRoute().query.search as string) || '')

watch(
  () => [activeCategory.value, search.value],
  ([c, s]) => {
    activeCategory.value = c || '全部职位'
    search.value = s || ''
  },
)

const filteredJobs = computed(() => {
  const s = search.value.trim().toLowerCase()
  const cat = activeCategory.value

  return RECENT_JOBS.value.filter((job) => {
    const matchesSearch =
      !s || job.title.toLowerCase().includes(s) || job.base?.join(' / ').toLowerCase().includes(s)

    let matchesCategory = false
    if (cat === '全部职位') {
      matchesCategory = true
    } else if (cat === '实习生/校园招聘') {
      matchesCategory =
        job.title.includes('实习') || job.title.includes('校园招聘') || job.type === '实习'
    } else {
      matchesCategory = job.category === cat
    }

    return matchesSearch && matchesCategory
  })
})

function clearFilters() {
  search.value = ''
  activeCategory.value = '全部职位'
}
</script>

<template>
  <div class="p-top main-card pb-24">
    <div class="container mx-auto px-6">
      <button
        type="button"
        class="text-neutral-text2 hover:text-primary mb-8 flex items-center gap-2 font-bold transition-colors"
        @click="navigateTo('/join')"
      >
        <Icon name="lucide:chevron-left" class="h-5 w-5" />
        返回首页
      </button>

      <div class="mb-16">
        <h1
          class="text-h1 text-neutral-text1 mb-6 font-bold tracking-tighter uppercase italic md:text-[56px]"
        >
          <template v-if="activeCategory === '实习生/校园招聘'">
            探索 <span class="text-primary">校招与实习</span>
          </template>
          <template v-else> 探索所有 <span class="text-primary">开放职位</span> </template>
        </h1>

        <p class="text-h2 text-neutral-text2 max-w-2xl font-normal">
          在这里找到属于你的节奏。我们正在寻找能够挑战现状、重构规则的先行者。
        </p>
      </div>

      <!-- Filters -->
      <div class="lg:bg-re grid grid-cols-1 gap-12 lg:grid-cols-4">
        <!-- 左栏 -->
        <div class="space-y-10 lg:col-span-1">
          <div>
            <h3 class="text-support text-neutral-text3 mb-6 font-bold tracking-widest uppercase">
              职位搜索
            </h3>
            <div class="relative">
              <Icon
                name="lucide:search"
                class="text-neutral-text4 absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2"
              />
              <input
                v-model="search"
                type="text"
                placeholder="搜索职位或地点..."
                class="border-neutral-divider focus:border-primary text-body w-full rounded-2xl border bg-white py-4 pr-4 pl-12 shadow-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <h3 class="text-support text-neutral-text3 mb-6 font-bold tracking-widest uppercase">
              职能部门
            </h3>
            <div class="flex flex-col gap-2">
              <button
                v-for="cat in CATEGORIES"
                :key="cat"
                type="button"
                class="flex items-center justify-between rounded-xl px-4 py-3 text-left font-bold transition-all"
                :class="
                  activeCategory === cat
                    ? 'bg-primary translate-x-2 text-white shadow-lg'
                    : 'text-neutral-text2 hover:bg-neutral-divider'
                "
                @click="activeCategory = cat"
              >
                <span>{{ cat }}</span>
                <Icon
                  v-if="cat === 'Campus'"
                  name="lucide:graduation-cap"
                  class="h-4 w-4"
                  :class="activeCategory === cat ? 'text-white' : 'text-primary'"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- 右栏 -->
        <div class="lg:col-span-3">
          <div class="mb-8 flex items-center justify-between">
            <span class="text-support text-neutral-text3 flex items-center gap-2 font-bold">
              <Icon
                v-if="activeCategory === '实习生/校园招聘'"
                name="lucide:graduation-cap"
                class="text-primary h-4.5 w-4.5"
              />
              <Icon v-else name="lucide:briefcase-business" class="text-primary h-4.5 w-4.5" />
              找到 {{ filteredJobs.length }} 个{{
                activeCategory === '实习生/校园招聘' ? '校招/实习' : ''
              }}匹配职位
            </span>
          </div>

          <div class="space-y-4">
            <template v-if="filteredJobs.length > 0">
              <div
                v-for="job in filteredJobs"
                :key="job.id"
                class="group border-neutral-divider hover:border-primary flex cursor-pointer flex-col justify-between gap-6 rounded-3xl border bg-white p-8 transition-all hover:shadow-xl md:flex-row md:items-center"
                @click="navigateTo(`/jobs/${job.slug}`)"
              >
                <div>
                  <div class="mb-3 flex items-center gap-2">
                    <span
                      class="bg-brand-4 text-primary inline-block rounded-full px-3 py-1 text-[12px] font-bold tracking-wider uppercase"
                    >
                      {{ job.category }}
                    </span>

                    <span
                      v-if="job.title.includes('实习') || job.type === '实习'"
                      class="inline-block rounded-full bg-orange-100 px-3 py-1 text-[12px] font-bold tracking-wider text-orange-600 uppercase"
                    >
                      实习生
                    </span>
                  </div>

                  <h3
                    class="text-h2 text-neutral-text1 group-hover:text-primary font-bold transition-colors"
                  >
                    {{ job.title }}
                  </h3>

                  <div class="text-neutral-text2 text-support mt-2 flex items-center gap-4">
                    <span class="flex items-center gap-1">
                      <Icon name="lucide:map-pin" class="h-3.5 w-3.5" />
                      {{ job.base?.join(' / ') || '面议' }}
                    </span>
                    <span>•</span>
                    <span>{{ job.type }}</span>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <span
                    class="text-primary translate-x-4 font-bold opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    了解详情
                  </span>

                  <div
                    class="bg-neutral-bg group-hover:bg-primary flex h-12 w-12 items-center justify-center rounded-full transition-colors"
                  >
                    <Icon
                      name="lucide:arrow-right"
                      class="h-5 w-5 transition-colors group-hover:text-white"
                    />
                  </div>
                </div>
              </div>
            </template>

            <template v-else>
              <div
                class="border-neutral-divider rounded-3xl border border-dashed bg-white py-20 text-center"
              >
                <p class="text-neutral-text3 text-h2">未找到相关职位</p>
                <button
                  type="button"
                  class="text-primary mt-4 font-bold hover:underline"
                  @click="clearFilters"
                >
                  清除所有筛选
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
