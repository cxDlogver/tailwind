<template>
  <div class="relative w-full overflow-hidden">
    <div class="relative container mx-auto h-70 w-full overflow-hidden"></div>

    <!-- A：输入卡片（只在左 1/3 可见） -->
    <div class="lane lane-a absolute inset-0 flex h-full w-full items-center">
      <div ref="trackA" class="track flex h-full items-center will-change-transform">
        <div ref="groupA" class="flex h-full items-center gap-120">
          <div ref="cardA0" class="card-a box-content h-60 w-60 md:w-60">
            <IndexMediaTypeCard variant="image" />
          </div>
          <div class="card-a box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="video" />
          </div>
          <div class="card-a box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="audio" />
          </div>
          <div class="card-a box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="text" />
          </div>
          <div class="card-a box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="file" />
          </div>
          <div class="h-60 w-0"></div>
        </div>

        <div class="flex h-full items-center gap-120" aria-hidden="true">
          <div class="card-a box-content h-60 w-60 md:w-60">
            <IndexMediaTypeCard variant="image" />
          </div>
          <div class="card-a box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="video" />
          </div>
          <div class="card-a box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="audio" />
          </div>
          <div class="card-a box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="text" />
          </div>
          <div class="card-a box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="file" />
          </div>
          <div class="h-60 w-0"></div>
        </div>
      </div>
    </div>

    <!-- B：标签卡片（只在中间 1/3 可见） -->
    <div class="lane lane-b absolute inset-0 flex h-full w-full items-center">
      <div ref="trackB" class="track flex h-full items-center will-change-transform">
        <div ref="groupB" class="flex h-full items-center gap-120">
          <div ref="cardB0" class="card-b box-content h-60 w-20 md:w-60">
            <IndexTest2 variant="sensitive" />
          </div>
          <div class="card-b box-content h-60 w-20 md:w-60"><IndexTest2 variant="porn" /></div>
          <div class="card-b box-content h-60 w-20 md:w-60"><IndexTest2 variant="normal" /></div>
          <div class="card-b box-content h-60 w-20 md:w-60"><IndexTest2 variant="special" /></div>
          <div class="h-60 w-0"></div>
        </div>

        <div class="flex h-full items-center gap-120" aria-hidden="true">
          <div class="card-b box-content h-60 w-20 md:w-60"><IndexTest2 variant="sensitive" /></div>
          <div class="card-b box-content h-60 w-20 md:w-60"><IndexTest2 variant="porn" /></div>
          <div class="card-b box-content h-60 w-20 md:w-60"><IndexTest2 variant="normal" /></div>
          <div class="card-b box-content h-60 w-20 md:w-60"><IndexTest2 variant="special" /></div>
          <div class="h-60 w-0"></div>
        </div>
      </div>
    </div>

    <!-- C：决策卡片（只在右 1/3 可见） -->
    <div class="lane lane-c absolute inset-0 flex h-full w-full items-center">
      <div ref="trackC" class="track flex h-full items-center will-change-transform">
        <div ref="groupC" class="flex h-full items-center gap-120">
          <div ref="cardC0" class="box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="prohibit" />
          </div>
          <div class="box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="prohibit" />
          </div>
          <div class="box-content h-60 w-20 md:w-60"><IndexMediaTypeCard variant="allow" /></div>
          <div class="box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="prohibit" />
          </div>
          <div class="h-60 w-0"></div>
        </div>

        <div class="flex h-full items-center gap-120" aria-hidden="true">
          <div class="box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="prohibit" />
          </div>
          <div class="box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="prohibit" />
          </div>
          <div class="box-content h-60 w-20 md:w-60"><IndexMediaTypeCard variant="allow" /></div>
          <div class="box-content h-60 w-20 md:w-60">
            <IndexMediaTypeCard variant="prohibit" />
          </div>
          <div class="h-60 w-0"></div>
        </div>
      </div>
    </div>

    <!-- 第一个过滤层 -->
    <div
      ref="filter1"
      class="z-index-10000 pointer-events-none absolute top-1/2 left-[calc(100%/3)] h-65 w-60 -translate-y-1/2"
    >
      <IndexNeuralBrain :start-file="startFile1" />
    </div>
    <!-- 第二个过滤层 -->
    <div
      ref="filter2"
      class="z-index-10000 pointer-none: absolute top-1/2 left-[calc(100%*2/3)] h-65 w-60 -translate-y-1/2"
    >
      <IndexNeuralBrain :start-file="startFile2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const trackA = ref<HTMLElement | null>(null)
const groupA = ref<HTMLElement | null>(null)
const trackB = ref<HTMLElement | null>(null)
const groupB = ref<HTMLElement | null>(null)
const trackC = ref<HTMLElement | null>(null)
const groupC = ref<HTMLElement | null>(null)

// 新增：用于测量偏移量的“参考卡片”
const cardA0 = ref<HTMLElement | null>(null) // w-60
const cardB0 = ref<HTMLElement | null>(null) // w-60(在 md 及以上)
const cardC0 = ref<HTMLElement | null>(null) // w-60

const SPEED = 90
let ro: ResizeObserver | null = null

function apply(elTrack: HTMLElement, elGroup: HTMLElement, offsetPx: number) {
  const shift = Math.round(elGroup.getBoundingClientRect().width)
  const dur = Math.max(1, shift / SPEED)

  elTrack.style.setProperty('--shift', `${shift}px`)
  elTrack.style.setProperty('--dur', `${dur}s`)
  elTrack.style.setProperty('--offset', `${Math.round(offsetPx)}px`)
}

async function sync() {
  await nextTick()

  // 计算偏移：B 相对 A 偏移一个 w-60；C 相对 B 再偏移一个 w-84
  const wA = cardA0.value ? cardA0.value.getBoundingClientRect().width : 0
  const wB = cardB0.value ? cardB0.value.getBoundingClientRect().width : 0
  const wC = cardC0.value ? cardC0.value.getBoundingClientRect().width : 0

  const offsetA = 0
  const offsetB = wA - wB
  const offsetC = wC - wB + offsetB
  if (trackA.value && groupA.value) apply(trackA.value, groupA.value, offsetA)
  if (trackB.value && groupB.value) apply(trackB.value, groupB.value, offsetB)
  if (trackC.value && groupC.value) apply(trackC.value, groupC.value, offsetC)
}

/** 卡片经过过滤层 */

let rafId = 0
const filter1 = ref<HTMLElement | null>(null)
const filter2 = ref<HTMLElement | null>(null)
const startFile1 = ref(false)
const startFile2 = ref(false)

// 缓存卡片节点，避免每帧 query
let cardsA: HTMLElement[] = []
let cardsB: HTMLElement[] = []

// 刷新卡片缓存
function refreshCardsCache() {
  cardsA = Array.from(document.querySelectorAll<HTMLElement>('.card-a'))
  cardsB = Array.from(document.querySelectorAll<HTMLElement>('.card-b'))
}

// “经过”判定： 过滤层左边界在卡片矩形内，且右边界也在卡片矩形内
function centerInRect(r: DOMRect, zone: DOMRect) {
  return zone.left >= r.left && zone.left <= r.right
}

function anyCardPassing(cards: HTMLElement[], zone: DOMRect) {
  for (const el of cards) {
    const r = el.getBoundingClientRect()
    if (centerInRect(r, zone)) return true
  }
  return false
}

function tick() {
  const f1 = filter1.value?.getBoundingClientRect()
  const f2 = filter2.value?.getBoundingClientRect()

  // 实时态：有卡片经过就是 true；没有就是 false
  if (f1) startFile1.value = anyCardPassing(cardsA, f1)
  else startFile1.value = false

  if (f2) startFile2.value = anyCardPassing(cardsB, f2)
  else startFile2.value = false

  rafId = requestAnimationFrame(tick)
}

onMounted(async () => {
  sync()
  ro = new ResizeObserver(sync)

  if (trackA.value) ro.observe(trackA.value)
  if (trackB.value) ro.observe(trackB.value)
  if (trackC.value) ro.observe(trackC.value)

  // 建议也观察“参考卡片”，断点变化时能立刻刷新 offset
  if (cardA0.value) ro.observe(cardA0.value)
  if (cardB0.value) ro.observe(cardB0.value)

  window.addEventListener('resize', sync)

  await nextTick()
  refreshCardsCache()
  rafId = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', sync)
  ro?.disconnect()
  ro = null

  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.lane-a {
  clip-path: inset(0 calc(100% - calc(100% / 3)) 0 0);
}
.lane-b {
  clip-path: inset(0 calc(100% / 3) 0 calc(100% / 3));
}
.lane-c {
  clip-path: inset(0 0 0 calc(100% - calc(100% / 3)));
}

/* 保留你原来的动画逻辑 */
.track {
  animation: scroll-right var(--dur, 18s) linear infinite;
  transform: translate3d(calc(-1 * var(--shift, 0px) + var(--offset, 0px)), 0, 0);
}

@keyframes scroll-right {
  from {
    transform: translate3d(calc(-1 * var(--shift, 0px) + var(--offset, 0px)), 0, 0);
  }
  to {
    transform: translate3d(var(--offset, 0px), 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .track {
    animation: none;
    transform: translate3d(0, 0, 0);
  }
}
</style>
