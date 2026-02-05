<script setup lang="ts">
import { computed, ref } from 'vue'

type Job = {
  id: string
  title: string
  location: string
}

const props = defineProps<{
  onSearch: (query: string) => void
  onSelectJob: (id: string) => void
}>()

/** 数据都放在 Hero 内（符合你之前要求） */
const RECENT_JOBS: Job[] = [
  { id: 'job-001', title: '前端开发工程师（Nuxt）', location: '深圳 · 南山' },
  { id: 'job-002', title: '后端开发工程师（Node/Nitro）', location: '武汉 · 光谷' },
  { id: 'job-003', title: '安全研究员（AI 安全）', location: '深圳 · 南山' },
  { id: 'job-004', title: '产品经理（合规方向）', location: '远程 / 混合' },
  { id: 'job-005', title: '测试开发工程师（自动化）', location: '武汉 · 光谷' },
]

const SKETCH_IMAGES = [
  'https://illustrations.popsy.co/gray/musician.svg',
  'https://illustrations.popsy.co/gray/graphic-design.svg',
  'https://illustrations.popsy.co/gray/web-design.svg',
  'https://illustrations.popsy.co/gray/creative-work.svg',
  'https://illustrations.popsy.co/gray/work-from-home.svg',
  'https://illustrations.popsy.co/gray/developer.svg',
  'https://illustrations.popsy.co/gray/data-analysis.svg',
] as const

const searchQuery = ref('')

const jobList = computed(() => {
  const list = [...RECENT_JOBS, ...RECENT_JOBS, ...RECENT_JOBS]
  return list.map((job, i) => ({
    job,
    image: SKETCH_IMAGES[i % SKETCH_IMAGES.length] as string,
    index: i,
  }))
})

function handleSearchClick() {
  props.onSearch(searchQuery.value)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') handleSearchClick()
}

function applyJob(id: string) {
  props.onSelectJob(id)
}
</script>

<template>
  <section
    class="bg-neutral-bg relative flex min-h-[90vh] flex-col justify-center overflow-hidden pb-20"
  >
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
    >
      <h1
        class="text-neutral-text1/5 translate-y-[-10%] text-[120px] leading-none font-black tracking-tighter whitespace-nowrap uppercase italic md:text-[16em]"
      >
        JOIN THE BAND
      </h1>
    </div>

    <div class="relative z-20 container mx-auto mb-16 px-6 text-center md:text-left">
      <div class="max-w-3xl">
        <h2
          class="text-h2 md:text-h4 text-neutral-text1 mb-4 leading-none font-black tracking-tight uppercase"
        >
          不仅仅是工作，这是一场<span class="text-primary italic">合奏</span>
        </h2>
        <p class="text-body md:text-h2 text-neutral-text2 max-w-xl font-bold opacity-80">
          在缔零科技，我们相信最好的创新源于团队的默契。寻找你的角色，加入我们的乐章。
        </p>
      </div>
    </div>

    <div class="marquee-container relative z-30 w-full overflow-hidden">
      <div class="animate-marquee-slow flex w-max px-[10vw] hover:[animation-play-state:paused]">
        <div v-for="item in jobList" :key="`${item.job.id}-${item.index}`" class="contents">
          <JoinStackedCard
            :job="item.job"
            :image="item.image"
            :index="item.index"
            :on-apply="applyJob"
          />
        </div>
      </div>
    </div>

    <div class="relative z-40 container mx-auto mt-12 px-6">
      <div class="mx-auto max-w-4xl">
        <div
          class="flex flex-col gap-3 rounded-3xl border border-white/50 bg-white/80 p-3 shadow-[0_50px_100px_rgba(0,0,0,0.15)] backdrop-blur-2xl md:flex-row md:rounded-full"
        >
          <div
            class="border-neutral-divider/50 flex flex-1 items-center border-b px-8 md:border-r md:border-b-0"
          >
            <Icon name="lucide:search" class="text-primary mr-4 h-6 w-6 shrink-0" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="你想扮演什么角色? (如: 前端开发)"
              class="text-h3 text-neutral-text1 placeholder-neutral-text3 w-full bg-transparent py-5 font-bold focus:outline-none"
              @keydown="onKeydown"
            />
          </div>
          <button
            type="button"
            class="bg-primary text-h1 hover:bg-primary-dark rounded-2xl px-12 py-5 font-black tracking-wider text-white uppercase shadow-xl transition-all hover:-translate-y-1 active:scale-95 md:rounded-full"
            @click="handleSearchClick"
          >
            开始探索
          </button>
        </div>

        <div
          class="text-neutral-text2 mt-8 flex flex-wrap justify-center gap-10 text-[12px] font-black tracking-[0.3em] uppercase opacity-60 md:justify-start"
        >
          <div class="flex items-center gap-3">
            <span class="text-primary mr-2 flex items-center justify-center">●</span>
            <span>150+ Open Parts</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-primary mr-2 flex items-center justify-center">●</span>
            <span>12 Global Hubs</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
