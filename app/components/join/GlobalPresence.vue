<!-- components/join/GlobalPresence.vue -->
<script setup lang="ts">
import { computed } from 'vue'

type Hub = { name: string; en: string; image: string }

const HUBS: Hub[] = [
  {
    name: '武汉',
    en: 'WUHAN',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: '北京',
    en: 'BEIJING',
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: '深圳',
    en: 'SHENZHEN',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: '上海',
    en: 'SHANGHAI',
    image:
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=800',
  },
]

// 重复数据以确保滚动无缝
const row1 = computed(() => [...HUBS, ...HUBS, ...HUBS, ...HUBS])
const row2 = computed(() => [...row1.value].reverse())
</script>

<template>
  <section id="locations" class="overflow-hidden py-16">
    <!-- 头部 -->
    <div class="container mx-auto mb-10 px-6">
      <div
        class="flex flex-col justify-between gap-6 border-b-[2px] border-black pb-8 md:flex-row md:items-end"
      >
        <div class="w-full">
          <div
            class="bg-primary mb-4 inline-block rounded-full px-3 py-1 text-[9px] font-black tracking-widest text-white uppercase"
          >
            Workspaces &amp; Studios
          </div>
          <h2
            class="text-h3 overflow-hidden leading-none font-black tracking-tighter text-ellipsis whitespace-nowrap text-black uppercase italic md:text-[56px]"
          >
            多城联动 · <span class="text-primary">办公环境</span>
          </h2>
        </div>
      </div>
    </div>

    <!-- 滚动区 -->
    <div class="marquee-container relative space-y-6 md:space-y-8">
      <!-- 第一行：向左 -->
      <div class="animate-marquee-slow flex">
        <JoinHubBrick
          v-for="(hub, idx) in row1"
          :key="`row1-${idx}`"
          :name="hub.name"
          :en="hub.en"
          :image="hub.image"
        />
      </div>

      <!-- 第二行：向右 -->
      <div class="animate-marquee-slow-reverse flex">
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
