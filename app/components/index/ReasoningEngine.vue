<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

type DataType = 'image' | 'video' | 'audio' | 'text' | 'file'
type DecisionType = '放行' | '复核' | '限流' | '禁止' | '罚款' | '通报'
type AssociationType = '常规用户' | '违法团伙' | '商业投毒' | '异常账号'

type AuditItem = {
  id: string
  type: DataType
  label: string
  category: string
  association: AssociationType
  decision: DecisionType
  color: string
  icon: string
  score: number
}

const props = defineProps<{ item: AuditItem }>()

const THEMES: Record<string, { text: string; border: string; glow: string; shadow: string }> = {
  rose: {
    text: 'text-rose-400',
    border: 'border-rose-500/50',
    glow: 'bg-rose-500',
    shadow: 'shadow-rose-500/30',
  },
  red: {
    text: 'text-red-400',
    border: 'border-red-500/50',
    glow: 'bg-red-500',
    shadow: 'shadow-red-500/30',
  },
  purple: {
    text: 'text-purple-400',
    border: 'border-purple-500/50',
    glow: 'bg-purple-500',
    shadow: 'shadow-purple-500/30',
  },
  amber: {
    text: 'text-amber-400',
    border: 'border-amber-500/50',
    glow: 'bg-amber-500',
    shadow: 'shadow-amber-500/30',
  },
  emerald: {
    text: 'text-emerald-400',
    border: 'border-emerald-500/50',
    glow: 'bg-emerald-500',
    shadow: 'shadow-emerald-500/30',
  },
  blue: {
    text: 'text-blue-400',
    border: 'border-blue-500/50',
    glow: 'bg-blue-500',
    shadow: 'shadow-blue-500/30',
  },
}

const theme = computed(() => THEMES[props.item.color] ?? THEMES.blue)

const phase = ref<'START' | 'THINKING' | 'RESULT'>('START')
const thinkingLabel = ref<string>('')
const thinkingIcon = ref<string>('🔎')
const progress = ref<number>(0)

let t1: any = null
let t2: any = null
let interval: any = null

const clearAll = () => {
  if (t1) clearTimeout(t1)
  if (t2) clearTimeout(t2)
  if (interval) clearInterval(interval)
  t1 = null
  t2 = null
  interval = null
}

const start = () => {
  clearAll()
  phase.value = 'START'
  progress.value = 0

  t1 = setTimeout(() => {
    phase.value = 'THINKING'
    const associations: AssociationType[] = ['常规用户', '违法团伙', '商业投毒', '异常账号']
    const icons = ['🛡️', '⚠️', '🚨', '👤', '🌐', '🔑']
    let count = 0

    interval = setInterval(() => {
      thinkingLabel.value = associations[count % associations.length]
      thinkingIcon.value = icons[count % icons.length]
      progress.value = Math.min(100, progress.value + 3)
      count++
      if (progress.value >= 100 && interval) clearInterval(interval)
      t2 = setTimeout(() => {
        phase.value = 'RESULT'
        progress.value = 100
        if (interval) clearInterval(interval)
      }, 2000)
    }, 50)
  }, 600)
}

const nodes = [
  { x: 50, y: 5 },
  { x: 20, y: 20 },
  { x: 80, y: 20 },
  { x: 5, y: 50 },
  { x: 50, y: 60 },
  { x: 95, y: 50 },
  { x: 30, y: 90 },
  { x: 70, y: 90 },
]

const connections = computed<[number, number][]>(() => [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 4],
  [2, 5],
  [3, 6],
  [4, 6],
  [4, 7],
  [5, 7],
])

/** 为 pulse 的 dur 做一次性“随机”分配，避免每次渲染都变导致闪烁/不稳定 */
const pulseDur = ref<number[]>([])
pulseDur.value = connections.value.map(() => 1.5 + Math.random())

watch(
  () => props.item.id,
  () => start(),
  { immediate: true },
)

onBeforeUnmount(() => clearAll())

const radius = 27 // 进度圈半径
const circ = computed(() => 2 * Math.PI * radius) // 周长
const dashOffset = computed(() => circ.value - (circ.value * progress.value) / 100) // 偏移量
</script>

<template>
  <div class="relative flex flex-1 flex-col items-center justify-center">
    <div
      class="absolute inset-0 opacity-10 blur-[120px] transition-colors duration-1000"
      :class="theme.glow"
    />

    <div class="relative flex h-80 w-80 items-center justify-center">
      <!-- rings -->
      <div
        class="animate-spin-slow absolute inset-10 rounded-full border border-dashed border-slate-400/80"
      />
      <div class="animate-spin-reverse absolute inset-10 rounded-full border-2 border-white/10" />

      <!-- 星网图 -->
      <div class="absolute flex h-80 w-80 items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          class="h-full w-full drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
        >
          <!-- lines -->
          <line
            v-for="([a, b], i) in connections"
            :key="`l-${i}`"
            :x1="nodes[a].x"
            :y1="nodes[a].y"
            :x2="nodes[b].x"
            :y2="nodes[b].y"
            stroke="currentColor"
            stroke-width="0.5"
            :class="'text-blue-400/30'"
            class="transition-colors duration-500"
          />

          <!-- pulses on lines -->
          <circle
            v-for="([a, b], i) in connections"
            :key="`p-${i}`"
            r="1"
            fill="#60a5fa"
            class="animate-pulse-flow"
          >
            <animateMotion
              :dur="`${pulseDur[i] ?? 1.8}s`"
              repeatCount="indefinite"
              :path="`M ${nodes[a].x} ${nodes[a].y} L ${nodes[b].x} ${nodes[b].y}`"
            />
          </circle>

          <!-- nodes -->
          <circle
            v-for="(n, i) in nodes"
            :key="`n-${i}`"
            :cx="n.x"
            :cy="n.y"
            r="2.5"
            :class="'animate-pulse fill-blue-400'"
            class="transition-colors duration-500"
            :style="{ animationDelay: `${i * 0.1}s` }"
          />
        </svg>
      </div>

      <!-- hub -->
      <div
        class="relative flex h-55 w-55 flex-col items-center justify-center overflow-hidden rounded-full border-[6px] transition-all duration-700"
        :class="
          phase === 'RESULT'
            ? `${theme.border} bg-slate-900 shadow-[0_0_80px_rgba(0,0,0,0.9)]`
            : 'border-blue-500/30 bg-slate-950/80 shadow-[0_0_40px_rgba(59,130,246,0.1)]'
        "
      >
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[10px_10px]"
        />

        <template v-if="phase !== 'RESULT'">
          <div class="zoom-in relative flex flex-col items-center gap-2">
            <div
              v-if="phase === 'THINKING'"
              class="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-blue-400/20 bg-slate-950/80 p-4 backdrop-blur-md"
            >
              <span class="mb-1 animate-bounce text-2xl">{{ thinkingIcon }}</span>
              <span
                class="w-24 text-center font-mono text-[10px] leading-tight font-black tracking-widest text-blue-400 uppercase"
              >
                {{ thinkingLabel }}
              </span>
            </div>
          </div>
        </template>

        <Transition name="result-pop" appear>
          <div v-if="phase == 'RESULT'" class="relative z-10 flex flex-col items-center">
            <div
              class="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-5xl shadow-2xl transition-transform hover:scale-110"
            >
              {{ item.icon }}
            </div>

            <span
              class="text-2xl font-black tracking-tighter drop-shadow-[0_0_15px_currentColor]"
              :class="theme.text"
            >
              {{ item.decision }}
            </span>
          </div>
        </Transition>

        <div
          class="animate-breathing-orb absolute inset-0 rounded-full opacity-10 blur-2xl"
          :class="theme.glow"
        />
      </div>

      <div
        v-if="phase === 'RESULT'"
        class="animate-radar-ping pointer-events-none absolute inset-12 rounded-full border-8"
        :class="theme.text"
      />

      <!-- 进度条 -->
      <svg class="z-index-100 absolute inset-0 h-80 w-80 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          :r="radius"
          stroke="rgba(255,255,255,0.02)"
          stroke-width="2"
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          :r="radius"
          stroke="currentColor"
          stroke-width="3"
          fill="transparent"
          :class="`${phase === 'RESULT' ? theme.text : 'text-blue-500'} drop-shadow-[0_0_12px_currentColor] transition-all duration-300`"
          :stroke-dasharray="circ"
          :stroke-dashoffset="dashOffset"
          stroke-linecap="round"
        />
      </svg>
      <div class="absolute inset-x-0 bottom-2 flex items-center justify-center gap-2">
        <div class="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        <span class="font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase"
          >Policy Committed</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes spin-slower {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
@keyframes breathing-orb {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.3;
  }
}
@keyframes radar-ping {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

.animate-spin-slow {
  animation: spin-slow 25s linear infinite;
}
.animate-spin-slower {
  animation: spin-slower 40s linear infinite;
}
.animate-spin-reverse {
  animation: spin-reverse 15s linear infinite;
}
.animate-breathing-orb {
  animation: breathing-orb 5s ease-in-out infinite;
}
.animate-radar-ping {
  animation: radar-ping 2s cubic-bezier(0, 0, 0.2, 1) 1 forwards;
}

@keyframes pulse-flow {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.6);
  }
}
.animate-pulse-flow {
  animation: pulse-flow 1.6s ease-in-out infinite;
}

@layer utilities {
  .result-pop-enter-active,
  .result-pop-leave-active {
    transition:
      opacity 700ms cubic-bezier(0.16, 1, 0.3, 1),
      transform 700ms cubic-bezier(0.16, 1, 0.3, 1),
      filter 700ms cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform, filter;
  }
  .result-pop-leave-active {
    position: absolute;
  }

  .result-pop-enter-from,
  .result-pop-leave-to {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
    filter: blur(6px);
  }

  .result-pop-enter-to,
  .result-pop-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}
</style>
