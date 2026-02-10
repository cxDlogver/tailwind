<!-- components/Waveform.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    active: boolean
    color?: string
    player?: number[] // 传入一个随机数数组，制造不同的动画节奏
  }>(),
  {
    color: '#1a3a3a',
    player: () => [], // 默认随机数数组
  },
)

const bars = computed(() =>
  props.player.map((p, i) => {
    const height = props.active ? `${30 + p * 70}%` : '30%'
    const transitionDelay = `${i * 50}ms`
    return { height, transitionDelay }
  }),
)
</script>

<template>
  <div class="flex h-8 items-end gap-0.5 px-1 opacity-40">
    <div
      v-for="(b, i) in bars"
      :key="i"
      class="w-1 rounded-full transition-all duration-500"
      :class="props.active ? 'bar-active' : ''"
      :style="{
        height: b.height,
        backgroundColor: props.color,
        transitionDelay: b.transitionDelay,
        animationDelay: `${i * 0.1}s`,
      }"
    />
  </div>
</template>

<style scoped>
@layer utilities {
  .bar-active {
    animation-name: pulse-soft;
    animation-duration: 1.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
  @keyframes pulse-soft {
    0% {
      transform: scaleY(0.7);
      opacity: 0.55;
    }
    50% {
      transform: scaleY(1.3);
      opacity: 1;
    }
    100% {
      transform: scaleY(0.7);
      opacity: 0.55;
    }
  }
}
</style>
