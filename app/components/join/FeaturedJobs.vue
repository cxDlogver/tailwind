<script setup lang="ts">
import type { PropType } from 'vue'

type Job = {
  id: string
  title: string
  location: string
  category: string
  type: string
}

/** 方式 A：组件内数据（你要接入真实数据时删掉这段，换成 import） */
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

/** 方式 B：外部常量（如果你已存在） */
// import { RECENT_JOBS } from '~/constants/join'

const props = defineProps({
  onSelectJob: { type: Function as PropType<(id: string) => void>, required: true },
  onSeeAll: { type: Function as PropType<() => void>, required: true },
})

const featured = computed(() => RECENT_JOBS.slice(0, 4))

const categoryMap: Record<string, string> = {
  Engineering: '技术研发',
  Product: '产品管理',
  Design: '体验设计',
  Marketing: '市场营销',
  Content: '内容运营',
}

function pickCategoryLabel(cat: string) {
  return categoryMap[cat] || cat
}

function handleSelect(id: string) {
  props.onSelectJob(id)
}
</script>

<template>
  <section
    class="bg-neutral-bg border-neutral-divider relative overflow-hidden border-b pt-8 pb-24"
  >
    <div class="relative z-10 container mx-auto px-6">
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
            class="text-h4 text-neutral-text1 leading-none font-black tracking-tighter uppercase italic md:text-[48px]"
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
          class="group border-neutral-text1 hover:bg-neutral-bg relative cursor-pointer rounded-[2rem] border-[2px] bg-white p-6 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(59,112,115,1)] md:p-8"
          @click="handleSelect(job.id)"
        >
          <div class="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-12">
            <!-- 轨道编号 -->
            <div class="flex shrink-0 items-center gap-5">
              <span
                class="text-h3 text-primary/10 group-hover:text-primary w-10 text-center leading-none font-black italic transition-colors md:text-[42px]"
              >
                0{{ idx + 1 }}
              </span>

              <div
                class="bg-primary-light text-primary group-hover:bg-primary flex h-12 w-12 items-center justify-center rounded-xl transition-all group-hover:text-white"
              >
                <Icon name="lucide:play" class="h-[18px] w-[18px]" />
              </div>
            </div>

            <!-- 标题与分类 -->
            <div class="min-w-0 flex-1">
              <div class="mb-1.5 flex items-center gap-3">
                <span
                  class="text-primary bg-primary-light rounded px-2 py-0.5 text-[10px] font-black tracking-widest uppercase"
                >
                  {{ pickCategoryLabel(job.category) }}
                </span>
                <span class="text-neutral-text3 text-[10px] font-bold uppercase opacity-60"
                  >/ {{ job.type }}</span
                >
              </div>

              <h3
                class="text-h2 md:text-h1 text-neutral-text1 group-hover:text-primary truncate leading-tight font-black transition-colors"
              >
                {{ job.title }}
              </h3>
            </div>

            <!-- 地点与操作 -->
            <div class="flex w-full items-center justify-between md:w-auto md:gap-12">
              <div class="flex items-center gap-2">
                <div class="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
                <span class="text-body text-neutral-text1 font-black uppercase italic">
                  {{ job.location }}
                </span>
              </div>

              <div
                class="border-neutral-text1 group-hover:bg-neutral-text1 relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-[2px] transition-all group-hover:text-white"
              >
                <Icon
                  name="lucide:arrow-right"
                  class="h-[22px] w-[22px] transition-transform group-hover:translate-x-1"
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
