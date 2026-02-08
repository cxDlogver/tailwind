<!-- components/QuickClicks.vue -->
<script setup lang="ts">
type LinkItem = {
  title: string
  icon: string // nuxt-icon name
  color: string
  tag: string
  to: string
}

const links: LinkItem[] = [
  {
    title: '校园招聘',
    icon: 'lucide:graduation-cap',
    color: 'bg-primary',
    tag: 'Campus',
    to: '/jobs?category=实习生/校园招聘',
  },
  {
    title: '招聘流程',
    icon: 'lucide:briefcase',
    color: 'bg-neutral-text1',
    tag: 'Process',
    to: '/join/process',
  },
]
</script>

<template>
  <section class="bg-neutral-bg border-neutral-divider border-t py-20 md:py-28">
    <div class="container mx-auto px-6">
      <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 lg:flex-row">
        <!-- 左侧：精炼标题 -->
        <div class="text-center lg:w-1/2 lg:text-left">
          <div class="mb-4 flex items-center justify-center gap-3 lg:justify-start">
            <span class="text-primary text-support font-black tracking-[0.4em] uppercase italic">
              Join the Band
            </span>
            <div class="bg-primary/20 h-px w-12"></div>
          </div>

          <h2
            class="text-h1 text-neutral-text1 leading-[1.1] font-black tracking-tighter uppercase italic md:text-[56px]"
          >
            准备好 <br class="hidden md:block" />
            <span class="text-primary">加入了吗？</span>
          </h2>
        </div>

        <!-- 右侧：紧凑入口卡片 -->
        <div class="flex w-full flex-col gap-6 sm:w-auto sm:flex-row lg:w-1/2">
          <div
            v-for="link in links"
            :key="link.title"
            class="group border-neutral-divider hover:border-primary relative flex min-w-60 flex-1 cursor-pointer flex-col items-start overflow-hidden rounded-4xl border-2 bg-white p-8 transition-all duration-500 hover:shadow-[8px_8px_0px_0px_rgba(59,112,115,1)]"
            @click="navigateTo(link.to)"
          >
            <!-- 悬浮背景装饰 -->
            <div
              class="text-primary absolute -top-4 -right-4 p-4 opacity-[0.05] transition-opacity group-hover:opacity-[0.15]"
            >
              <Icon name="lucide:zap" size="80" class="rotate-12" />
            </div>

            <div
              class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
              :class="link.color"
            >
              <Icon :name="link.icon" size="28" />
            </div>

            <div>
              <span
                class="text-primary mb-1 block text-[10px] font-black tracking-[0.2em] uppercase"
              >
                {{ link.tag }}
              </span>

              <h3
                class="text-h2 text-neutral-text1 flex items-center gap-3 font-black tracking-tighter uppercase italic"
              >
                {{ link.title }}
                <Icon
                  name="lucide:arrow-right"
                  size="20"
                  class="text-primary transition-transform group-hover:translate-x-1"
                />
              </h3>
            </div>

            <!-- 底部指示线 -->
            <div
              class="bg-primary/10 mt-6 h-1 w-8 rounded-full transition-all duration-700 group-hover:w-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
