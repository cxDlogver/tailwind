<!-- components/Pipeline.vue -->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { AUDIT_DATA } from '~/data/indexHeroData'
import type { AuditStage } from '~/types/indexHeroType'

const scrollX = ref(0)
const rafId = ref<number | null>(null)

const PORTAL_INPUT_X = -280
const PORTAL_OUTPUT_X = 280
const cardWidth = 550
const totalWidth = computed(() => AUDIT_DATA.length * cardWidth)

function tick() {
  scrollX.value += 2.2
  rafId.value = requestAnimationFrame(tick)
}

onMounted(() => {
  rafId.value = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (rafId.value != null) cancelAnimationFrame(rafId.value)
})

// 将任意 offset 规范化到 [-totalWidth/2, totalWidth/2] 区间，等价于 React 中的 offset = (index * cardWidth + scrollX) % totalWidth;
function normalizeOffset(index: number) {
  const tw = totalWidth.value
  if (tw <= 0) return 0
  // offset = (index * cardWidth + scrollX) % totalWidth;
  let offset = (index * cardWidth + scrollX.value) % tw

  if (offset > tw / 2) offset -= tw
  if (offset < -tw / 2) offset += tw

  return offset
}

// 三个阶段：输入 -> 审核中 -> 输出
function getStage(offset: number): AuditStage {
  let stage: AuditStage = 'AUDITING'
  if (offset < PORTAL_INPUT_X) stage = 'INPUT'
  else if (offset > PORTAL_OUTPUT_X) stage = 'OUTPUT'
  return stage
}
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <IndexHeroParticleEngine />
    <div class="relative mt-40 h-120 w-full">
      <!-- 左 portal 光晕 -->
      <div
        class="pointer-events-none absolute top-1/2 z-10 h-125 w-40 -translate-y-1/2 bg-[radial-gradient(ellipse,#3B7073,transparent_70%)] opacity-40 blur-2xl"
        :style="{
          left: `calc(50% + ${PORTAL_INPUT_X}px)`,
        }"
      />

      <!-- 右 portal 光晕 -->
      <div
        class="pointer-events-none absolute top-1/2 z-10 h-125 w-40 -translate-y-1/2 bg-[radial-gradient(ellipse,#3B7073,transparent_70%)] opacity-40 blur-2xl"
        :style="{
          left: `calc(50% + ${PORTAL_OUTPUT_X}px)`,
        }"
      />

      <div class="absolute inset-0 flex items-center">
        <IndexHeroAuditCard
          v-for="(item, index) in AUDIT_DATA"
          :key="item.id"
          :item="item"
          :stage="getStage(normalizeOffset(index))"
          :offset="normalizeOffset(index)"
          :portals="{ input: PORTAL_INPUT_X, output: PORTAL_OUTPUT_X }"
        />
      </div>
    </div>
  </div>
</template>
