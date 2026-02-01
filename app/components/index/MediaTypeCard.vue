<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'image' | 'video' | 'audio' | 'text' | 'file' | 'structured'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant: Variant
    size?: Size
    class?: string
    // 可选：音频柱状条（不传则用默认）
    audioBars?: number[]
    // 可选：视频时长/进度
    videoDuration?: string
    videoProgress?: number // 0~1
    // 可选：文件标签
    fileTag?: string
  }>(),
  {
    size: 'md',
    audioBars: () => [4, 7, 3, 9, 5, 8, 4, 6, 3, 7],
    videoDuration: '00:42',
    videoProgress: 0.66,
    fileTag: 'X-ENCRYPTED',
  },
)

const theme = computed(() => {
  const map: Record<Variant, { wrap: string; ambient: string; panel: string }> = {
    image: {
      wrap: 'bg-blue-500/10 border-blue-400/50',
      ambient: 'bg-gradient-to-tr from-blue-500/20 to-transparent',
      panel: 'border-blue-400/30 bg-blue-900/40',
    },
    video: {
      wrap: 'bg-rose-500/10 border-rose-400/50',
      ambient: 'bg-gradient-to-tr from-rose-500/20 to-transparent',
      panel: 'border-rose-400/30 bg-rose-900/40',
    },
    audio: {
      wrap: 'bg-emerald-500/10 border-emerald-400/50',
      ambient: 'bg-gradient-to-tr from-emerald-500/20 to-transparent',
      panel: 'border-emerald-400/30 bg-emerald-900/40',
    },
    text: {
      wrap: 'bg-slate-500/10 border-slate-400/50',
      ambient: 'bg-gradient-to-tr from-slate-500/20 to-transparent',
      panel: 'border-slate-400/30 bg-slate-900/40',
    },
    file: {
      wrap: 'bg-amber-500/10 border-amber-400/50',
      ambient: 'bg-gradient-to-tr from-amber-500/20 to-transparent',
      panel: 'border-amber-400/30 bg-amber-900/40',
    },
    structured: {
      wrap: 'bg-cyan-950/40 border-cyan-400/60',
      ambient: 'bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent)]',
      panel: 'border-cyan-400/20 bg-black/40',
    },
  }

  return map[props.variant]
})

const sizeCls = computed(() => {
  // 仅控制内部节奏/字体，不强制外部高度（外部用 h-* 控制更灵活）
  if (props.size === 'sm') return { pad: 'p-2', txt: 'text-[6px]' }
  if (props.size === 'lg') return { pad: 'p-3', txt: 'text-[8px]' }
  return { pad: 'p-2', txt: 'text-[7px]' }
})

const videoProgressWidth = computed(() => {
  const p = Math.max(0, Math.min(1, props.videoProgress))
  return `${Math.round(p * 100)}%`
})
</script>

<template>
  <div
    class="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border"
    :class="[theme.wrap, sizeCls.pad, props.class]"
  >
    <!-- Ambient -->
    <div class="absolute inset-0 opacity-50" :class="theme.ambient" />

    <!-- Preview Panel -->
    <div
      class="relative flex flex-1 items-center justify-center overflow-hidden rounded-lg border"
      :class="theme.panel"
    >
      <!-- 可覆盖：预览内容 -->
      <slot name="preview">
        <!-- IMAGE -->
        <template v-if="variant === 'image'">
          <div
            class="absolute top-1 left-1 h-1 w-6 rounded-[2px] bg-blue-400/80 shadow-[0_0_8px_#60a5fa]"
          />
          <svg
            class="h-8 w-8 text-blue-300/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div
            class="absolute inset-0 scale-90 animate-pulse rounded border-[1px] border-dashed border-blue-400/20"
          />
        </template>

        <!-- VIDEO -->
        <template v-else-if="variant === 'video'">
          <div class="absolute top-1 right-1 flex flex-col gap-0.5">
            <div v-for="i in 3" :key="i" class="h-1 w-1 rounded-full bg-rose-400/50" />
          </div>
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full border border-rose-400/50 bg-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
          >
            <div
              class="ml-1 border-t-[6px] border-b-[6px] border-l-[10px] border-t-transparent border-b-transparent border-l-rose-200"
            />
          </div>
        </template>

        <!-- AUDIO -->
        <template v-else-if="variant === 'audio'">
          <div
            class="flex h-full w-full flex-col items-center justify-center gap-1 overflow-hidden"
          >
            <div class="flex h-10 items-end gap-0.5 px-2">
              <div
                v-for="(h, i) in audioBars"
                :key="i"
                class="animate-wave w-1 rounded-full bg-emerald-400/80"
                :style="{ height: `${h * 10}%`, animationDelay: `${i * 0.1}s` }"
              />
            </div>
          </div>
        </template>

        <!-- TEXT -->
        <template v-else-if="variant === 'text'">
          <div class="h-full w-full space-y-1 overflow-hidden p-1.5">
            <div class="h-1 w-full rounded bg-slate-300/40" />
            <div class="h-1 w-full rounded bg-slate-300/20" />
            <div class="h-1 w-4/5 rounded bg-amber-400/40 shadow-[0_0_5px_rgba(251,191,36,0.3)]" />
            <div class="h-1 w-full rounded bg-slate-300/20" />
            <div class="h-1 w-2/3 rounded bg-slate-300/10" />
          </div>
          <Icon name="my-icon:scales" class="h-8 w-8 text-slate-300/40" />
        </template>

        <!-- STRUCTURED -->
        <template v-else-if="variant === 'structured'">
          <div class="relative flex h-full w-full flex-col gap-1.5 p-1.5">
            <!-- rows -->
            <div class="flex items-center justify-between">
              <div class="h-1 w-1/3 rounded bg-cyan-400/40" />
              <div class="h-1 w-1/2 rounded bg-cyan-400/10" />
            </div>
            <div class="flex items-center justify-between">
              <div class="h-1 w-1/4 rounded bg-cyan-400/40" />
              <div class="h-1 w-2/3 rounded bg-cyan-400/10" />
            </div>
            <div class="my-1 h-px w-full bg-cyan-400/20" />
            <!-- grid -->
            <div class="grid grid-cols-2 gap-1">
              <div class="flex h-4 items-center justify-center rounded bg-cyan-400/5">
                <div class="mx-1 h-0.5 w-full bg-cyan-400/20" />
              </div>
              <div class="flex h-4 items-center justify-center rounded bg-cyan-400/5">
                <div class="mx-1 h-0.5 w-full bg-cyan-400/20" />
              </div>
            </div>
            <!-- 左侧结构指示 -->
            <div class="absolute top-0 bottom-0 left-0 w-0.5 bg-cyan-400/40" />
            <!-- 扫描线 -->
            <div
              class="pointer-events-none absolute inset-0 animate-[scan_2s_linear_infinite] bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent"
            />
          </div>
        </template>
        <!-- FILE -->
        <template v-else>
          <div class="relative">
            <div class="h-10 w-8 rounded border-2 border-amber-400/40 bg-amber-500/5" />
            <div
              class="absolute top-0 right-0 h-3 w-3 rounded-bl border-b-2 border-l-2 border-amber-400/40 bg-amber-900/90"
            />
            <div class="absolute inset-0 flex flex-col justify-center gap-1 p-2">
              <div class="h-0.5 w-full bg-amber-400/30" />
              <div class="h-0.5 w-full bg-amber-400/30" />
            </div>
          </div>
        </template>
      </slot>
    </div>

    <!-- Footer -->
    <div class="mt-2">
      <!-- 可覆盖：底部状态 -->
      <slot name="footer">
        <template v-if="variant === 'image'">
          <div class="space-y-1">
            <div class="h-1 w-full rounded bg-blue-400/20" />
            <div class="h-1 w-2/3 rounded bg-blue-400/10" />
          </div>
        </template>

        <template v-else-if="variant === 'video'">
          <div class="flex items-center gap-1">
            <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-black/40">
              <div
                class="h-full bg-rose-500 shadow-[0_0_8px_#f43f5e]"
                :style="{ width: videoProgressWidth }"
              />
            </div>
            <span class="font-mono text-rose-300" :class="sizeCls.txt">{{ videoDuration }}</span>
          </div>
        </template>

        <template v-else-if="variant === 'audio'">
          <div class="flex items-center justify-between">
            <div class="flex gap-0.5">
              <div class="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399]" />
              <div class="mt-0.5 h-1 w-3 rounded bg-emerald-400/20" />
            </div>
            <span class="font-mono text-emerald-300" :class="sizeCls.txt">BIT_48KHZ</span>
          </div>
        </template>

        <template v-else-if="variant === 'text'">
          <div class="flex items-center gap-1.5">
            <div class="h-2 w-2 rounded-sm bg-slate-400/30" />
            <div class="h-0.5 flex-1 bg-slate-400/20" />
          </div>
        </template>

        <template v-else-if="variant === 'structured'">
          <div class="flex items-center gap-1">
            <div class="h-1 flex-1 bg-cyan-500 shadow-[0_0_5px_#06b6d4]" />
            <div class="h-1 w-4 bg-cyan-500/20" />
            <div class="h-1 w-2 bg-cyan-500/20" />
          </div>
        </template>
      </slot>
    </div>

    <!-- Gloss Sweep -->
    <div
      class="group-hover:animate-gloss-sweep pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
    />
  </div>
</template>

<style scoped>
@keyframes glossSweep {
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(120%);
  }
}
.animate-gloss-sweep {
  animation: glossSweep 900ms ease-in-out 1;
}

@keyframes wave {
  0%,
  100% {
    transform: scaleY(0.55);
    opacity: 0.75;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}
.animate-wave {
  transform-origin: bottom;
  animation: wave 1.2s ease-in-out infinite;
}
</style>
