<!-- components/AuditCard.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'

import type { AuditItem, AuditStage, AuditStatus, Modality } from '~/types/indexHeroType'

const props = withDefaults(
  defineProps<{
    item: AuditItem
    stage: AuditStage
    offset: number // 卡片相对屏幕中心的水平偏移
    portals?: { input: number; output: number } // 两个“传送门”的 x 坐标位置
  }>(),
  { portals: undefined },
)

const proximity = computed(() => Math.abs(props.offset))
const opacity = computed(() => {
  // React: Math.max(0, 1 - Math.max(0, proximity - 600) / 400)
  const p = proximity.value
  return Math.max(0, 1 - Math.max(0, p - 800) / 400)
})

const innerOpacity = computed(() => 1 - shimmerIntensity.value * 0.9)
const smoothScale = computed(() => {
  // React: 1 - Math.min(0.08, Math.abs(offset) * 0.00015)
  return 1 - Math.min(0.08, Math.abs(props.offset) * 0.00015)
})

// 当卡片经过 portal 区域时，制造“被传送/被扫描”的高光、模糊、亮条效果
const portalThreshold = 150

const currentPortal = computed<'input' | 'output' | null>(() => {
  if (!props.portals) return null
  const distIn = Math.abs(props.offset - props.portals.input)
  const distOut = Math.abs(props.offset - props.portals.output)

  if (distIn < distOut && distIn < portalThreshold) return 'input'
  if (distOut < distIn && distOut < portalThreshold) return 'output'
  return null
})

const shimmerIntensity = computed(() => {
  if (!props.portals) return 0
  const distIn = Math.abs(props.offset - props.portals.input)
  const distOut = Math.abs(props.offset - props.portals.output)
  const currentDist = Math.min(distIn, distOut) // 离最近的 portal 的距离, 距离越近，强度越大
  return Math.max(0, 1 - currentDist / portalThreshold)
})

function IsShimmerOverlay() {
  const a = shimmerIntensity.value > 0
  const b =
    props.stage === 'INPUT' || (props.stage === 'AUDITING' && currentPortal.value === 'output')
  return a && b
}

/** 动态样式 */
const containerStyle = computed(() => {
  // 这里用 px 最稳；你也可以把这些基准值按三种 stage 拆分
  const baseW = 75
  const baseH = 105
  const maxW = 85
  const maxH = 115
  let w = maxW
  let h = maxH
  if (props.stage === 'INPUT') {
    w = baseW + (maxW - baseW) * shimmerIntensity.value
    h = baseH + (maxH - baseH) * shimmerIntensity.value
  } else if (props.stage === 'AUDITING' && currentPortal.value === 'output') {
    w = maxW - (maxW - baseW) * shimmerIntensity.value
    h = maxH - (maxH - baseH) * shimmerIntensity.value
  } else if (props.stage === 'OUTPUT') {
    w = baseW
    h = baseH
  }

  return {
    transform: `translate3d(calc(-50% + ${props.offset}px), 0, 0) scale(${smoothScale.value}) rotateY(${props.offset * 0.02}deg) rotateX(${Math.abs(props.offset) * 0.005}deg)`,
    opacity: opacity.value,
    width: `${w / 4}rem`,
    height: `${h / 4}rem`,

    // 关键：没有 transition 就不会“缓慢改变”
    transformStyle: 'preserve-3d',
  } as const
})

const auditPlayer = ref<number[]>() // 每张卡一个随机数，制造不同的动画节奏
onBeforeMount(() => {
  auditPlayer.value = Array.from({ length: 20 }, () => Math.random())
})

function statusIconName(status: AuditStatus) {
  switch (status) {
    case /* AuditStatus.NORMAL */ 'NORMAL':
      return 'lucide:shield-check'
    case /* AuditStatus.POLITICAL */ 'POLITICAL':
      return 'lucide:shield-alert'
    case /* AuditStatus.SENSITIVE */ 'SENSITIVE':
      return 'lucide:shield-x'
    default:
      return 'lucide:activity'
  }
}

function modalityIconName(modality: Modality) {
  switch (modality) {
    case /* Modality.VIDEO */ 'VIDEO':
      return 'lucide:video'
    case /* Modality.AUDIO */ 'AUDIO':
      return 'lucide:mic'
    case /* Modality.TEXT */ 'TEXT':
      return 'lucide:file-text'
    case /* Modality.FILE */ 'FILE':
      return 'lucide:file-digit'
    default:
      return 'lucide:file'
  }
}

const statusIconClass = computed(() => {
  switch (props.item.status) {
    case 'NORMAL':
      return 'h-8 w-8 text-emerald-600'
    case 'POLITICAL':
      return 'h-8 w-8 text-amber-600'
    case 'SENSITIVE':
      return 'h-8 w-8 text-rose-600'
    default:
      return 'h-8 w-8 text-slate-600'
  }
})

// 是否审核通过——输出卡片样式
const isPass = computed(() => props.item.status === 'NORMAL')

// 统一的卡片阴影样式
const depthClass =
  'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),inset_0_1px_2px_rgba(0,0,0,0.05),inset_0_-4px_12px_rgba(0,0,0,0.02),0_15px_35px_-12px_rgba(0,0,0,0.08)]'
</script>

<template>
  <div
    class="absolute top-1/2 left-1/2 z-20 flex -translate-y-1/2 items-center justify-center will-change-[transform,opacity]"
    :style="containerStyle"
  >
    <!-- ================= ShimmerOverlay ================= -->
    <template v-if="IsShimmerOverlay()">
      <div
        class="pointer-events-none absolute inset-0 z-60 overflow-hidden rounded-[inherit]"
        :style="{
          background: `rgba(255,255,255,${shimmerIntensity * 0.2})`,
          backdropFilter: `blur(${shimmerIntensity * 10}px)`,
        }"
      />
      <div
        class="pointer-events-none absolute inset-y-0 z-70 w-2"
        :style="{
          left: `calc(${(1 - shimmerIntensity) * 100}%)`,
          background: 'linear-gradient(to right, transparent, white, transparent)',
          opacity: shimmerIntensity,
          boxShadow: `0 0 40px rgba(255,255,255,${shimmerIntensity}), 0 0 20px #3B7073`,
          transform: 'translateX(-50%)',
        }"
      />
    </template>

    <!-- ================= stage: INPUT ================= -->
    <div
      v-if="stage === 'INPUT'"
      :class="[
        'relative h-full w-full overflow-hidden rounded-4xl border border-slate-200 bg-white/60 p-6 text-left backdrop-blur-xl',
        depthClass,
      ]"
    >
      <div
        class="mb-6"
        :style="{ filter: `blur(${shimmerIntensity * 10}px)`, opacity: innerOpacity }"
      >
        <div class="mb-4 flex items-center gap-2">
          <div class="rounded-lg bg-slate-100 p-2">
            <Icon :name="modalityIconName(item.modality)" class="h-4 w-4 text-slate-500" />
          </div>
          <div>
            <p class="mono text-[10px] leading-none font-black text-slate-400">RAW PAYLOAD</p>
            <p class="text-xs font-bold tracking-tight text-slate-800">
              {{ item.modality }} STREAM 01
            </p>
          </div>
        </div>

        <!-- ModalityVisualization -->
        <div
          v-if="item.modality === 'VIDEO'"
          class="relative flex h-32 w-full flex-col gap-1 overflow-hidden rounded-xl border border-slate-200/50 bg-slate-900/5 p-2"
        >
          <div class="flex items-center justify-between px-1">
            <div class="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
            <span class="mono text-[8px] font-bold tracking-widest text-slate-400 uppercase"
              >Live Buffer 04</span
            >
          </div>
          <div class="grid flex-1 grid-cols-4 gap-1">
            <div
              v-for="i in 8"
              :key="i"
              class="animate-pulse rounded-sm bg-slate-200/50"
              :style="{ animationDelay: `${(i - 1) * 0.1}s` }"
            />
          </div>
          <div class="h-1 w-full overflow-hidden rounded-full bg-emerald-500/20">
            <div class="audit-scan-x h-full bg-emerald-500" />
          </div>
        </div>

        <div
          v-else-if="item.modality === 'AUDIO'"
          class="flex h-32 w-full items-center justify-center rounded-xl border border-emerald-900/10 bg-emerald-950/5 p-4"
        >
          <IndexHeroWaveForm :active="true" color="#3B7073" :player="auditPlayer" />
        </div>

        <div
          v-else-if="item.modality === 'TEXT'"
          class="h-32 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3"
        >
          <div class="space-y-2">
            <div
              v-for="(w, i) in [60, 90, 40, 70, 50, 80]"
              :key="i"
              class="audit-opacity-pulse h-1.5 rounded-full bg-slate-200"
              :style="{ width: `${w}%`, animationDelay: `${i * 0.2}s` }"
            />
          </div>
        </div>

        <div
          v-else
          class="relative flex h-32 w-full flex-col items-center justify-center rounded-xl border border-slate-200/50 bg-slate-900/5 p-4"
        >
          <div class="grid w-full grid-cols-6 gap-1 opacity-30">
            <div v-for="i in 24" :key="i" class="h-3 rounded-sm bg-slate-400" />
          </div>
          <Icon name="lucide:database" class="absolute h-8 w-8 text-slate-400" />
        </div>

        <div class="space-y-4">
          <div class="flex items-end justify-between border-b border-slate-200 pb-2">
            <span class="mono text-[10px] font-bold text-slate-400">METADATA EXTRACTED</span>
            <span class="mono text-primary text-[10px] font-bold">SUCCESS</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="rounded-lg border border-slate-100 bg-slate-50 p-2">
              <span class="mb-0.5 block text-[8px] font-bold text-slate-400 uppercase"
                >Packet Size</span
              >
              <span class="mono text-xs font-black text-slate-700">4.2 MB</span>
            </div>
            <div class="rounded-lg border border-slate-100 bg-slate-50 p-2">
              <span class="mb-0.5 block text-[8px] font-bold text-slate-400 uppercase"
                >Encryption</span
              >
              <span class="mono text-xs font-black text-slate-700">AES-256</span>
            </div>
          </div>
        </div>
        <div
          class="mono mt-auto flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-300 uppercase"
        >
          <Icon name="lucide:layers" class="h-3 w-3" />
          Queue position: #12
        </div>
      </div>
    </div>

    <!-- ================= stage: AUDITING ================= -->
    <div
      v-else-if="stage === 'AUDITING'"
      :class="[
        'relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white bg-white/60 p-8 text-left backdrop-blur-3xl',
        depthClass,
      ]"
    >
      <div
        class="audit-scan-y via-primary pointer-events-none absolute right-0 left-0 z-10 h-px bg-linear-to-r from-transparent to-transparent"
      />
      <div :style="{ filter: `blur(${shimmerIntensity * 10}px)`, opacity: innerOpacity }">
        <div class="mb-6 flex items-center gap-2">
          <div class="rounded-lg bg-slate-100 p-2">
            <Icon :name="modalityIconName(item.modality)" class="h-4 w-4 text-slate-500" />
          </div>
          <div>
            <p class="mono text-[10px] leading-none font-black text-slate-400">AUDIT ANALYSIS</p>
            <p class="text-xs font-bold tracking-tight text-slate-800">
              {{ item.modality }} STREAM 01
            </p>
          </div>
        </div>
        <div class="mb-8 flex items-start justify-between">
          <div>
            <h2 class="mb-1 text-3xl leading-none font-extrabold tracking-tighter text-slate-900">
              {{ item.title }}
            </h2>
            <span
              class="mono text-primary rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase"
            >
              {{ item.statusEn }}
            </span>
          </div>

          <div
            class="shadow-primary/10 rounded-2xl border border-emerald-50 bg-white p-3 shadow-xl"
          >
            <Icon :name="statusIconName(item.status)" :class="statusIconClass" />
          </div>
        </div>
        <div class="flex-1 space-y-6">
          <div class="flex gap-2">
            <div class="bg-primary h-full w-1 rounded-full" />
            <p class="text-xs leading-relaxed font-medium text-slate-500">
              {{ item.description }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
              <span class="mb-0.5 block text-[8px] font-bold text-slate-400 uppercase"
                >Confidence</span
              >
              <span class="mono text-xl font-black text-slate-800">{{ item.score }}%</span>
            </div>
            <div class="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
              <span class="mb-0.5 block text-[8px] font-bold text-slate-400 uppercase"
                >Sensor ID</span
              >
              <span class="mono text-xl font-black text-slate-800">VX-9</span>
            </div>
          </div>

          <div
            class="relative overflow-hidden rounded-2xl border border-emerald-900/10 bg-emerald-950/5 p-4"
          >
            <div class="absolute top-0 right-0 p-2 opacity-10">
              <Icon name="lucide:cpu" class="h-12 w-12" />
            </div>
            <IndexHeroWaveForm
              :active="true"
              :color="item.status === 'NORMAL' ? '#3B7073' : '#b91c1c'"
              :player="auditPlayer"
            />
          </div>
        </div>

        <div
          class="mono mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-[9px] font-bold text-slate-400"
        >
          <span>{{ item.timestamp }}</span>
          <span class="text-primary flex items-center gap-1">
            <span class="bg-primary h-1 w-1 animate-ping rounded-full" />
            LIVE_ANALYSIS
          </span>
        </div>
      </div>
    </div>

    <!-- ================= stage: OUTPUT ================= -->
    <div
      v-else
      :class="[
        'relative flex h-full w-full overflow-hidden rounded-4xl border border-white/60 bg-white/60',
        depthClass,
      ]"
    >
      <div
        class="relative h-full w-full p-8 text-center backdrop-blur-2xl"
        :style="{ filter: `blur(${shimmerIntensity * 10}px)`, opacity: innerOpacity }"
      >
        <div
          class="absolute top-0 left-0 h-2 w-full"
          :class="isPass ? 'bg-primary' : 'bg-rose-500'"
        />
        <div
          class="mb-6 rounded-full p-6 shadow-inner"
          :class="
            isPass ? 'border border-emerald-100 bg-emerald-50' : 'border border-rose-100 bg-rose-50'
          "
        >
          <Icon
            v-if="isPass"
            name="lucide:check-circle-2"
            class="text-primary h-12 w-12 drop-shadow-sm"
          />
          <Icon
            v-else
            name="lucide:alert-triangle"
            class="h-12 w-12 text-rose-600 drop-shadow-sm"
          />
        </div>

        <h3
          class="mb-1 text-2xl font-black tracking-tight"
          :class="isPass ? 'text-primary' : 'text-rose-900'"
        >
          {{ isPass ? 'REPORT CLEAN' : 'REPORT BLOCK' }}
        </h3>

        <div class="my-4 h-px w-full bg-slate-100" />

        <p class="mono text-[10px] leading-relaxed tracking-widest text-slate-400 uppercase">
          TRANSACTION HASH:<br />
          <span class="font-bold text-slate-600">{{ item.id.slice(0, 12) }}</span>
        </p>

        <div class="mt-8 rounded-full border border-slate-100 bg-slate-50 px-4 py-2">
          <span class="mono text-[10px] font-black text-slate-400">EXPORTED TO CLOUD</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@layer utilities {
  .audit-scan-x {
    animation: audit-scan-x 2s linear infinite;
  }
  @keyframes audit-scan-x {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .audit-scan-y {
    animation: audit-scan-y 2.5s linear infinite;
  }
  @keyframes audit-scan-y {
    0% {
      top: -10%;
    }
    100% {
      top: 110%;
    }
  }

  .audit-opacity-pulse {
    animation: audit-opacity-pulse 2s ease-in-out infinite;
  }
  @keyframes audit-opacity-pulse {
    0% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.3;
    }
  }
}
</style>
