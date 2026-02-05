<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  onNavigate: { type: Function as PropType<(target: string) => void>, required: true },
})

const links = [
  {
    title: '校园招聘',
    desc: '实习生与校园招聘专区',
    iconName: 'lucide:graduation-cap',
    color: 'bg-primary',
  },
  {
    title: '招聘流程',
    desc: '了解我们的面试与流程',
    iconName: 'lucide:briefcase',
    color: 'bg-neutral-text1',
  },
  {
    title: '常见问题',
    desc: '求职者的常见问题解答',
    iconName: 'lucide:help-circle',
    color: 'bg-primary-hover',
  },
] as const

function go(title: string) {
  props.onNavigate(title)
}
</script>

<template>
  <section class="bg-neutral-bg py-24">
    <div class="container mx-auto px-6">
      <h2 class="text-h3 text-neutral-text1 mb-12 text-center font-bold">准备好加入了吗？</h2>

      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        <div
          v-for="link in links"
          :key="link.title"
          class="group hover:bg-neutral-divider border-neutral-divider relative h-full cursor-pointer rounded-[2rem] border bg-white p-8 transition-all"
          role="button"
          tabindex="0"
          @click="go(link.title)"
          @keydown.enter.prevent="go(link.title)"
          @keydown.space.prevent="go(link.title)"
        >
          <div
            class="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110"
            :class="link.color"
          >
            <Icon :name="link.iconName" class="h-8 w-8" />
          </div>

          <h3 class="text-h2 text-neutral-text1 mb-2 font-bold tracking-tight uppercase">
            {{ link.title }}
          </h3>
          <p class="text-body text-neutral-text2 font-normal">
            {{ link.desc }}
          </p>

          <div class="absolute top-8 right-8 opacity-0 transition-opacity group-hover:opacity-100">
            <Icon name="lucide:zap" class="text-primary h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
