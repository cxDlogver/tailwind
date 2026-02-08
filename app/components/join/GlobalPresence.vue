<!-- components/join/GlobalPresence.vue -->
<script setup lang="ts">
import { computed } from 'vue'

type Hub = { name: string; en: string; image: string }

const HUBS: Hub[] = [
  {
    name: '武汉',
    en: 'WUHAN',
    image: '/images/global-presence/wuhan.jpg',
  },
  {
    name: '北京',
    en: 'BEIJING',
    image: '/images/global-presence/beijing.jpg',
  },
  {
    name: '深圳',
    en: 'SHENZHEN',
    image: '/images/global-presence/shenzhen.jpg',
  },
  {
    name: '上海',
    en: 'SHANGHAI',
    image: '/images/global-presence/shanghai.jpg',
  },
  {
    name: '咸宁',
    en: 'XIANNING',
    image: '/images/global-presence/xianning.jpg',
  },
]

// 重复数据以确保滚动无缝
const row1 = computed(() => [...HUBS, ...HUBS, ...HUBS, ...HUBS])
const row2 = computed(() => [...row1.value].reverse())
</script>

<template>
  <section id="locations" class="relative overflow-hidden py-16">
    <!-- 头部 -->
    <div class="main-card mb-10">
      <div
        class="flex flex-col justify-between gap-6 border-b-2 border-black pb-8 md:flex-row md:items-end"
      >
        <div class="w-full">
          <div
            class="bg-primary mb-4 inline-block rounded-full px-3 py-1 text-[9px] font-black tracking-widest text-white uppercase"
          >
            Workspaces &amp; Studios
          </div>
          <h3
            class="text-h4 md:text-h1 overflow-hidden leading-none font-black tracking-tighter text-ellipsis whitespace-nowrap text-black uppercase italic"
          >
            多城联动 · <span class="text-primary">办公环境</span>
          </h3>
        </div>
      </div>
    </div>

    <!-- 滚动区 -->
    <div class="marquee-container relative space-y-6 md:space-y-8">
      <!-- 第一行：向左 -->
      <div class="animate-marquee-fast flex">
        <JoinHubBrick
          v-for="(hub, idx) in row1"
          :key="`row1-${idx}`"
          :name="hub.name"
          :en="hub.en"
          :image="hub.image"
        />
      </div>

      <!-- 第二行：向右 -->
      <div class="animate-marquee-fast-reverse flex">
        <JoinHubBrick
          v-for="(hub, idx) in row2"
          :key="`row2-${idx}`"
          :name="hub.name"
          :en="hub.en"
          :image="hub.image"
        />
      </div>
    </div>
  </section>
</template>
