<template>
  <div class="fixed inset-0 z-100 flex overflow-hidden">
    <div class="relative flex h-full w-full flex-col bg-white/95 backdrop-blur-3xl md:flex-row">
      <!-- Left: News Section (Example Content) -->
      <div
        class="hidden flex-[1.4] flex-col justify-start overflow-y-auto border-r border-[#EEEEEE] bg-[#F4F7F7]/50 p-16 lg:flex xl:p-24"
      >
        <div class="mb-12 flex items-center justify-between">
          <div>
            <div
              class="mb-3 flex items-center gap-3 font-mono text-[9px] font-bold tracking-[0.6em] text-[#3B7073] uppercase"
            >
              <span>Intelligence Center</span>
            </div>

            <h2 class="text-3xl font-bold tracking-tight text-[#333333]">重点资讯中心</h2>
          </div>
          <button
            class="border-b border-[#3B7073]/30 pb-1 font-mono text-[10px] font-black tracking-widest text-[#3B7073] uppercase"
            @click="navigateTo('#news')"
          >
            View All Reports
          </button>
        </div>
      </div>

      <!-- Right: Navigation Links -->
      <div class="relative flex flex-1 flex-col bg-white p-12 lg:p-24">
        <button
          class="text-muted absolute top-12 right-12 z-20 p-3 transition-all hover:rotate-90 hover:text-[#3B7073]"
          @click="emit('switch-menu-open', false)"
        >
          <span>✖</span>
          <!-- Close button icon -->
        </button>
        <div class="mt-16 flex h-full flex-col justify-center lg:mt-0">
          <nav class="mx-auto flex max-w-xl flex-col gap-4 md:mx-0 lg:gap-6">
            <div
              class="mb-6 font-mono text-[11px] font-bold tracking-[0.6em] text-[#BBBBBB] uppercase opacity-60"
            >
              Navigator Matrix / 导航矩阵
            </div>

            <div v-for="(link, index) in navLinks" :key="link.label" class="relative">
              <NuxtLink
                :to="link.to"
                class="group relative z-10 flex items-center gap-8 py-2"
                @click="$emit('switch-menu-open', false)"
              >
                <span
                  class="text-primary font-mono text-[10px] font-bold opacity-40 transition-opacity group-hover:opacity-100"
                >
                  {{ index + 1 }}
                </span>

                <div class="relative overflow-visible">
                  <div
                    class="relative text-4xl font-bold tracking-tighter transition-all duration-500 group-hover:text-[#333333] lg:text-6xl"
                  >
                    {{ link.label }}
                    <div class="absolute -bottom-2 left-0 h-0.75 bg-[#3B7073]" />
                  </div>
                </div>
                <div v-if="isHovered" class="text-[#3B7073]">→</div>
              </NuxtLink>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'switch-menu-open', value: boolean): void
}>()

const isHovered = ref(false)

const navLinks = ref([
  { label: '产品矩阵', to: '#products' },
  { label: '解决方案', to: '#solutions' },
  { label: '关于我们', to: '#about' },
  { label: '加入我们', to: '#join' },
  { label: '资讯中心', to: '/news' },
  { label: '联系我们', to: '#contact' },
])
</script>
