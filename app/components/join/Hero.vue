<script setup lang="ts">
import type { JobsCollectionItem } from '@nuxt/content'
import { computed, ref } from 'vue'

type Job = Pick<JobsCollectionItem, 'slug' | 'title' | 'base'>

/** 数据都放在 Hero 内（符合你之前要求） */
const { data } = useAllJobsWithFields(['slug', 'title', 'base'] as const)
const RECENT_JOBS = computed<Job[]>(() => (data.value ?? []) as Job[])

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
  const list = [...RECENT_JOBS.value, ...RECENT_JOBS.value]
  return list.map((job, i) => ({
    job,
    image: SKETCH_IMAGES[i % SKETCH_IMAGES.length] as string,
    index: i,
  }))
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    handleSearchClick()
  }
}

// 搜索按钮点击
function handleSearchClick() {
  const query = searchQuery.value.trim()
  if (query) {
    const router = useRouter()
    router.push({ path: '/jobs', query: { search: query } })
  }
}
</script>

<template>
  <div class="pb-32">
    <section class="bg-neutral-bg main-card relative flex flex-col justify-center overflow-hidden">
      <div class="relative z-20 container mb-16 px-6 text-center md:text-left">
        <div class="max-w-3xl">
          <h2
            class="text-h3 md:text-h1 text-neutral-text1 mb-4 leading-none font-black tracking-tight uppercase"
          >
            不仅仅是工作，这是一场<span class="text-primary italic">合奏</span>
          </h2>
          <p class="text-body md:text-h3 text-neutral-text2 max-w-xl font-bold opacity-80">
            在缔零科技，我们相信最好的创新源于团队的默契。寻找你的角色，加入我们的乐章。
          </p>
        </div>
      </div>
    </section>
    <div class="marquee-container relative z-30 w-full overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      >
        <h1
          class="text-neutral-text1/5 translate-y-[-10%] text-[120px] leading-none font-black tracking-tighter whitespace-nowrap uppercase italic md:text-[16em]"
        >
          JOIN THE BAND
        </h1>
      </div>
      <div class="animate-marquee-slow flex w-max hover:[animation-play-state:paused]">
        <div v-for="item in jobList" :key="`${item.job.slug}-${item.index}`" class="contents">
          <JoinStackedCard :job="item.job" :image="item.image" :index="item.index" />
        </div>
      </div>
    </div>
    <section class="main-card relative z-40 container mx-auto mt-12 px-6">
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
            class="bg-primary text-h2 hover:bg-primary-dark cursor-pointer rounded-2xl px-12 py-5 font-black tracking-wider text-white uppercase shadow-xl transition-all hover:-translate-y-1 active:scale-95 md:rounded-full"
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
    </section>
  </div>
</template>

<style scoped></style>
