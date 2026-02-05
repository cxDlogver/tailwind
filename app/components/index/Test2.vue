<script setup lang="ts">
import { computed } from 'vue'

export type Variant = 'normal' | 'sensitive' | 'porn' | 'special'

const props = withDefaults(
  defineProps<{
    variant: Variant
    /** 品牌主色（默认 #3B7073） */
    brandColor?: string
    className?: string
  }>(),
  {
    brandColor: '#3B7073',
    className: '',
  },
)

const config = computed(() => {
  const map = {
    normal: {
      label: '正常',
      icon: 'lucide:shield-check',
      desc: '经智能分析，当前内容合规，未发现违规风险因子。',
      status: 'COMPLIANT',
      ghostIcon: 'lucide:shield',
    },
    sensitive: {
      label: '涉政',
      icon: 'lucide:landmark',
      desc: '检测到高度敏感政治关键词或关联人物，建议人工复核。',
      status: 'WARNING',
      ghostIcon: 'lucide:file-search',
    },
    porn: {
      label: '色情',
      icon: 'lucide:user-x',
      desc: '识别到疑似低俗或违规图像特征，已触发深度内容拦截。',
      status: 'BLOCKED',
      ghostIcon: 'lucide:eye-off',
    },
    special: {
      label: '专项',
      icon: 'lucide:target',
      desc: '正在对特定业务链路进行全量审计，执行高精度识别算法。',
      status: 'SCANNING',
      ghostIcon: 'lucide:zap',
    },
  } as const

  return map[props.variant]
})

const gridStyle = computed(() => ({
  backgroundImage: `linear-gradient(${props.brandColor} 1px, transparent 1px), linear-gradient(90deg, ${props.brandColor} 1px, transparent 1px)`,
  backgroundSize: '30px 30px',
}))
</script>

<template>
  <div
    class="group border-slate-300/60, duration-500, relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] border-2 border-slate-300/60 bg-slate-100 shadow-lg transition-all hover:shadow-2xl"
    :class="props.className"
    :style="{ '--brand': props.brandColor }"
  >
    <!-- Top Header Section -->
    <div class="flex items-center justify-between p-6 pt-3 pb-0">
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <span
            class="group-hover:text-primary text-sm font-bold tracking-wider text-slate-900 transition-colors"
          >
            {{ config.label }}
          </span>
          <div class="bg-brand h-1.5 w-1.5 animate-pulse rounded-full" />
        </div>
        <span class="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
          {{ config.status }}
        </span>
      </div>

      <div
        class="text-brand group-hover:bg-primary flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:text-white"
      >
        <Icon :name="config.icon" size="20" />
      </div>
    </div>

    <!-- Center Decorative Scan Visual -->
    <div
      class="relative m-1 flex flex-1 items-center justify-center overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/50 shadow-inner"
    >
      <div class="absolute inset-0 opacity-[0.02]" :style="gridStyle" />

      <div class="text-brand relative z-10 opacity-10">
        <Icon :name="config.ghostIcon" size="48" />
      </div>

      <!-- Animated scanning elements -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="border-primary/50 absolute h-20 w-20 animate-pulse rounded-full border-2" />
      </div>

      <div class="bg-primary/10 animate-scan absolute inset-x-0 h-0.5 shadow-[0_0_10px_#3B7073]" />
    </div>

    <!-- Bottom Description Section -->
    <div class="p-6 pt-2">
      <div class="mb-4 h-px w-full bg-slate-100" />
      <p class="text-[11px] leading-relaxed font-medium text-slate-500">
        {{ config.desc }}
      </p>

      <div
        class="mt-4 flex items-center gap-2 opacity-30 transition-opacity group-hover:opacity-100"
      >
        <Icon name="lucide:activity" size="10" class="text-brand" />
        <div class="h-0.5 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div class="bg-primary animate-line-grow h-full w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 6s linear infinite;
}

@keyframes scan {
  0% {
    transform: translateY(-120%);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  100% {
    transform: translateY(220%);
    opacity: 0.8;
  }
}
.animate-scan {
  animation: scan 1.8s ease-in-out infinite;
}

@keyframes line-grow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
.animate-line-grow {
  animation: line-grow 2s linear infinite;
}
</style>
