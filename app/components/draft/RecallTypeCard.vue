<script setup lang="ts">
import { computed } from 'vue'

type DataType = 'POLITICAL' | 'ILLEGAL' | 'PORN' | 'SPECIAL' | 'NORMAL'
type CategoriesType = {
  name: DataType
  label: string
  color: 'rose' | 'red' | 'purple' | 'amber' | 'emerald'
  score: number
  iconName: string
}

const props = withDefaults(
  defineProps<{
    type?: DataType
    cardIndex: number
  }>(),
  {
    type: undefined,
  },
)

const categories = [
  { name: 'POLITICAL', label: '涉政', color: 'rose', score: 98, iconName: 'my-icon:auto-scales' },
  { name: 'ILLEGAL', label: '违法', color: 'red', score: 92, iconName: 'my-icon:auto-ban' },
  { name: 'PORN', label: '色情', color: 'purple', score: 85, iconName: 'my-icon:auto-forbidden' },
  { name: 'SPECIAL', label: '专项', color: 'amber', score: 64, iconName: 'my-icon:auto-alert' },
  { name: 'NORMAL', label: '正常', color: 'emerald', score: 4, iconName: 'my-icon:auto-normal' },
] as const

type ColorKey = (typeof categories)[number]['color']

const themeMap: Record<
  ColorKey,
  { border: string; glow: string; text: string; ring: string; bg: string }
> = {
  rose: {
    border: 'border-rose-500',
    glow: 'bg-rose-500',
    text: 'text-rose-400',
    ring: 'text-rose-500',
    bg: 'from-rose-600/70 via-[#070b16] to-black',
  },
  red: {
    border: 'border-red-500',
    glow: 'bg-red-500',
    text: 'text-red-400',
    ring: 'text-red-500',
    bg: 'from-red-600/70 via-[#070b16] to-black',
  },
  purple: {
    border: 'border-purple-500',
    glow: 'bg-purple-500',
    text: 'text-purple-400',
    ring: 'text-purple-500',
    bg: 'from-purple-600/70 via-[#070b16] to-black',
  },
  amber: {
    border: 'border-amber-500',
    glow: 'bg-amber-500',
    text: 'text-amber-400',
    ring: 'text-amber-500',
    bg: 'from-amber-600/70 via-[#070b16] to-black',
  },
  emerald: {
    border: 'border-emerald-500',
    glow: 'bg-emerald-500',
    text: 'text-emerald-400',
    ring: 'text-emerald-500',
    bg: 'from-emerald-600/70 via-[#070b16] to-black',
  },
}

const cat = computed(() => {
  if (props.type)
    return (
      categories.find((c) => c.name === props.type) ??
      (categories[props.cardIndex % categories.length] as CategoriesType)
    )
  return categories[props.cardIndex % categories.length] as CategoriesType
})

const style = computed(() => themeMap[cat.value.color])

const radius = 32
const circumference = 2 * Math.PI * radius
const dashOffset = computed(() => circumference - (circumference * cat.value.score) / 100)
</script>

<template>
  <div
    class="relative flex h-full w-full justify-between overflow-hidden rounded-xl border bg-[#070b16] p-5 shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-all duration-500"
    :class="style.border"
  >
    <div class="absolute inset-0 bg-linear-to-br opacity-60" :class="style.bg" />
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[14px_14px] opacity-100"
    />

    <!--  仅布局调整 -->
    <div class="relative z-10 flex flex-col items-center gap-2">
      <div
        class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-white/20 bg-white/5 shadow-2xl backdrop-blur-md"
      >
        <Icon :name="cat.iconName" class="h-9 w-9 text-white/90" />
      </div>
      <!-- 主视觉：中文 label 优先，英文 name 次之（保持原字号/颜色体系） -->
      <div class="flex min-w-0 flex-col items-center gap-1">
        <div class="truncate text-[1.25em] font-black tracking-tighter text-white">
          {{ cat.label }}
        </div>
        <div
          class="min-w-0 shrink-0 text-[0.5em] font-black tracking-widest uppercase"
          :class="style.text"
        >
          {{ cat.name }}
        </div>
      </div>
    </div>

    <div class="relative z-10 mx-1 mt-auto rounded-xl border border-white/5 bg-black/40">
      <!-- 两段式：左说明 / 右环 -->
      <div class="flex flex-col items-center gap-3">
        <!-- Left: copy -->
        <div class="min-w-0 flex-1">
          <div class="text-center font-mono text-[0.5em] tracking-widest text-slate-500 uppercase">
            Risk Indicator
          </div>
        </div>

        <!-- Right: ring -->
        <div class="relative flex h-20 w-20 shrink-0 items-center justify-center">
          <!-- Breathing Glow Light (保持不变) -->
          <div
            class="animate-breathing-light absolute inset-1 rounded-full opacity-30 blur-xl"
            :class="style.glow"
          />
          <svg class="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx="40"
              cy="40"
              :r="radius"
              stroke="currentColor"
              stroke-width="4"
              fill="transparent"
              class="text-slate-800"
            />
            <circle
              cx="40"
              cy="40"
              :r="radius"
              stroke="currentColor"
              stroke-width="6"
              fill="transparent"
              :class="style.ring"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dashOffset"
              stroke-linecap="round"
            />
          </svg>
          <div class="font-mono text-[1.25em] font-black text-white/80">{{ cat.score }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes breathing-light {
  0%,
  100% {
    transform: scale(0.9);
    opacity: 0.2;
    filter: blur(15px);
  }
  50% {
    transform: scale(1.15);
    opacity: 0.6;
    filter: blur(25px);
  }
}
.animate-breathing-light {
  animation: breathing-light 2.5s ease-in-out infinite;
}
</style>
