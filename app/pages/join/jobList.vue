<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

type Job = {
  id: string
  title: string
  location: string
  category: string
  type: string
}

/** 组件内数据（可直接跑）；你有真实 constants 时替换为 import */
// import { RECENT_JOBS } from '~/constants/join'
const RECENT_JOBS: Job[] = [
  {
    id: '1',
    title: '全栈工程师',
    category: 'Engineering',
    location: '北京',
    type: '远程 / 混合办公',
  },
  { id: '2', title: '资深产品经理', category: 'Product', location: '上海', type: '实地办公' },
  { id: '3', title: 'UI/UX 设计师', category: 'Design', location: '杭州', type: '实地办公' },
  { id: '4', title: '营销经理', category: 'Marketing', location: '深圳', type: '远程办公' },
  { id: '5', title: 'DevOps 架构师', category: 'Engineering', location: '广州', type: '混合办公' },
  { id: '6', title: '内容策略师', category: 'Content', location: '成都', type: '远程办公' },
  // 实习生与校园招聘职位
  { id: '7', title: '前端开发实习生', category: 'Engineering', location: '北京', type: '实习' },
  { id: '8', title: '产品助理实习生', category: 'Product', location: '上海', type: '实习' },
  { id: '9', title: '用户研究实习研究生', category: 'Design', location: '深圳', type: '实习' },
  { id: '10', title: '新媒体运营实习生', category: 'Content', location: '广州', type: '实习' },
  {
    id: '11',
    title: '2025届校园招聘 - 技术管培生',
    category: 'Engineering',
    location: '北京',
    type: '全职',
  },
]

const router = useRouter()

const CATEGORIES = [
  '全部',
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Content',
  'Campus',
] as const

const categoryMap: Record<string, string> = {
  全部: '全部职位',
  Engineering: '技术研发',
  Product: '产品管理',
  Design: '体验设计',
  Marketing: '市场营销',
  Content: '内容运营',
  Campus: '实习生/校园招聘',
}

const props = withDefaults(
  defineProps<{
    onSelectJob?: (id: string) => void
    onBack?: () => void
    defaultCategory?: string
    initialSearch?: string
  }>(),
  {
    defaultCategory: '全部',
    initialSearch: '',
  },
)

const search = ref(props.initialSearch)
const activeCategory = ref(props.defaultCategory)

watch(
  () => [props.defaultCategory, props.initialSearch],
  ([c, s]) => {
    activeCategory.value = c || '全部'
    search.value = s || ''
  },
)

function fallbackSelectJob(id: string) {
  router.push(`/join/jobs/${id}`)
  if (import.meta.client) window.scrollTo(0, 0)
}

function fallbackBack() {
  if (import.meta.client && window.history.length > 1) router.back()
  else router.push('/join')
  if (import.meta.client) window.scrollTo(0, 0)
}

function selectJob(id: string) {
  ;(props.onSelectJob ?? fallbackSelectJob)(id)
}

function back() {
  ;(props.onBack ?? fallbackBack)()
}

const filteredJobs = computed(() => {
  const s = search.value.trim().toLowerCase()
  const cat = activeCategory.value

  return RECENT_JOBS.filter((job) => {
    const matchesSearch =
      !s || job.title.toLowerCase().includes(s) || job.location.toLowerCase().includes(s)

    let matchesCategory = false
    if (cat === '全部') {
      matchesCategory = true
    } else if (cat === 'Campus') {
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
  activeCategory.value = '全部'
}
</script>

<template>
  <div class="p-top min-h-screen pt-32 pb-24">
    <div class="container mx-auto px-6">
      <button
        type="button"
        class="text-neutral-text2 hover:text-primary mb-8 flex items-center gap-2 font-bold transition-colors"
        @click="back"
      >
        <Icon name="lucide:chevron-left" class="h-5 w-5" />
        返回首页
      </button>

      <div class="mb-16">
        <h1
          class="text-h4 text-neutral-text1 mb-6 font-bold tracking-tighter uppercase italic md:text-[56px]"
        >
          <template v-if="activeCategory === 'Campus'">
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
                class="text-neutral-text4 absolute top-1/2 left-4 h-[18px] w-[18px] -translate-y-1/2"
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
                <span>{{ categoryMap[cat] }}</span>
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
                v-if="activeCategory === 'Campus'"
                name="lucide:graduation-cap"
                class="text-primary h-[18px] w-[18px]"
              />
              找到 {{ filteredJobs.length }} 个{{
                activeCategory === 'Campus' ? '校招/实习' : ''
              }}匹配职位
            </span>
          </div>

          <div class="space-y-4">
            <template v-if="filteredJobs.length > 0">
              <div
                v-for="job in filteredJobs"
                :key="job.id"
                class="group border-neutral-divider hover:border-primary flex cursor-pointer flex-col justify-between gap-6 rounded-3xl border bg-white p-8 transition-all hover:shadow-xl md:flex-row md:items-center"
                @click="selectJob(job.id)"
              >
                <div>
                  <div class="mb-3 flex items-center gap-2">
                    <span
                      class="bg-brand-4 text-primary inline-block rounded-full px-3 py-1 text-[12px] font-bold tracking-wider uppercase"
                    >
                      {{ categoryMap[job.category] || job.category }}
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
                      <Icon name="lucide:map-pin" class="h-[14px] w-[14px]" />
                      {{ job.location }}
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
                <p class="text-neutral-text3 text-h3">未找到相关职位</p>
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
