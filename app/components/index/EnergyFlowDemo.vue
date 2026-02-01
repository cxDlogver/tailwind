<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    durationMs?: number
    /**
     * 窄缝中心位置（0~100，越小越靠左）
     * 默认 35 表示“中间偏左”
     */
    centerPct?: number
    /**
     * 窄缝宽度（百分比，越小越细）
     */
    slitWidthPct?: number
    /**
     * 图片填充模式：contain / cover
     */
    fit?: 'contain' | 'cover'
  }>(),
  {
    durationMs: 900,
    centerPct: 35,
    slitWidthPct: 1,
    fit: 'contain',
  },
)

// 把 center + slitWidth 转成 inset(left/right)
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
const half = () => props.slitWidthPct / 2

const leftInset = () => {
  const left = props.centerPct - half()
  return clamp(left, 0, 100)
}
const rightInset = () => {
  // 可见区域 = 100 - left - right = slitWidth
  // right = 100 - left - slitWidth
  const r = 100 - leftInset() - props.slitWidthPct
  return clamp(r, 0, 100)
}

const fitClass = computed(() => (props.fit === 'cover' ? 'object-cover' : 'object-contain'))
</script>

<template>
  <div
    class="relative h-full w-full overflow-hidden"
    :style="{
      '--dur': `${props.durationMs}ms`,
      '--l': `${leftInset()}%`,
      '--r': `${rightInset()}%`,
    }"
  >
    <!-- 过渡只负责“内容揭示层”，容器尺寸由外部决定（SSR/布局更稳定） -->
    <div class="reveal h-full w-full">
      <img
        :src="props.src"
        :alt="props.alt ?? ''"
        draggable="false"
        class="h-full w-full select-none"
        :class="fitClass"
      />
    </div>
  </div>
</template>

<style scoped>
/* 初始/结束的“中间偏左窄缝”由 --l / --r 控制 */
.reveal {
  clip-path: inset(0 var(--r) 0 var(--l));
  opacity: 0;
}

/* 交给 Transition 的 class 控制 enter/leave */
:global(.reveal-in-out-appear-active),
:global(.reveal-in-out-enter-active),
:global(.reveal-in-out-leave-active) {
  transition:
    clip-path var(--dur) cubic-bezier(0.22, 1, 0.36, 1),
    opacity calc(var(--dur) * 0.45) ease;
  will-change: clip-path, opacity;
}

:global(.reveal-in-out-appear-from),
:global(.reveal-in-out-enter-from) {
  clip-path: inset(0 var(--r) 0 var(--l));
  opacity: 0;
}

:global(.reveal-in-out-appear-to),
:global(.reveal-in-out-enter-to) {
  clip-path: inset(0 0 0 0);
  opacity: 1;
}

:global(.reveal-in-out-leave-from) {
  clip-path: inset(0 0 0 0);
  opacity: 1;
}

:global(.reveal-in-out-leave-to) {
  clip-path: inset(0 var(--r) 0 var(--l));
  opacity: 0;
}

/* 降低动画偏好 */
@media (prefers-reduced-motion: reduce) {
  :global(.reveal-in-out-appear-active),
  :global(.reveal-in-out-enter-active),
  :global(.reveal-in-out-leave-active) {
    transition: none;
  }
}
</style>
