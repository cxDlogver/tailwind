<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** 光柱宽度(px) */
    width?: number
    /** 强度(0~1)：整体亮度与发光强度 */
    intensity?: number
    /** 是否启用动画 */
    active?: boolean
    /** 叠加方式：screen 更像发光 */
    blend?: 'screen' | 'plus-lighter' | 'normal'
    /** 位置：center/left/right */
    position?: 'center' | 'left' | 'right'
    /** X 偏移(px)：用于微调位置 */
    offsetX?: number
  }>(),
  {
    width: 96,
    intensity: 0.95,
    active: true,
    blend: 'screen',
    position: 'center',
    offsetX: 0,
  },
)

const styleVars = computed(() => ({
  '--w': `${props.width}px`,
  '--a': String(Math.max(0, Math.min(1, props.intensity))),
  '--ox': `${props.offsetX}px`,

  /* 参考图的冷色主调（可按需微调） */
  '--bg': '#020617', // 深黑蓝
  '--b1': '#061a47', // 深蓝（柱体暗部）
  '--b2': '#0b4fe8', // 电蓝（主体高亮）
  '--b3': '#22d3ee', // 青蓝（芯层更亮）
  '--b4': '#e6fbff', // 青白（粒子/尖峰）
}))

const blendClass = computed(() => {
  if (props.blend === 'plus-lighter') return 'mix-blend-plus-lighter'
  if (props.blend === 'screen') return 'mix-blend-screen'
  return 'mix-blend-normal'
})

const posClass = computed(() => {
  if (props.position === 'left') return 'left-[12%]'
  if (props.position === 'right') return 'left-[88%]'
  return 'left-1/2'
})
</script>

<template>
  <!-- 父容器必须 relative 且有高度（h-* 或 aspect-*），否则看不到 -->
  <div class="pointer-events-none absolute inset-0" :style="styleVars">
    <!-- 光柱本体 -->
    <div
      class="absolute inset-y-0 -translate-x-1/2"
      :class="[posClass, blendClass]"
      :style="{ width: 'var(--w)', transform: `translateX(calc(-50% + var(--ox)))` }"
    >
      <!-- 0) 背景轻微染色（让光柱区域更“有空间感”） -->
      <div
        class="absolute inset-0 opacity-[calc(var(--a)*0.10)] blur-2xl"
        style="background: radial-gradient(closest-side at 50% 50%, var(--b1), transparent 70%)"
      />

      <!-- 1) 外扩柔光（大范围） -->
      <div
        class="absolute inset-0 opacity-[calc(var(--a)*0.52)] blur-3xl"
        :class="active ? 'animate-pillar-breathe' : ''"
        style="
          background: radial-gradient(
            closest-side at 50% 50%,
            color-mix(in srgb, var(--b2) 70%, white 0%) 0%,
            transparent 70%
          );
        "
      />

      <!-- 2) 主体光柱（纵向冷色渐变） -->
      <div
        class="absolute inset-0 rounded-full opacity-[calc(var(--a)*0.92)]"
        style="
          background: linear-gradient(
            to bottom,
            color-mix(in srgb, var(--b1) 35%, transparent) 0%,
            color-mix(in srgb, var(--b2) 55%, transparent) 28%,
            color-mix(in srgb, var(--b2) 85%, transparent) 55%,
            color-mix(in srgb, var(--b2) 55%, transparent) 78%,
            color-mix(in srgb, var(--b1) 35%, transparent) 100%
          );
        "
      />

      <!-- 3) 核心芯层（更窄更亮，接近图里的“白蓝能量柱”） -->
      <div
        class="absolute inset-y-0 left-1/2 w-[22%] -translate-x-1/2 opacity-[calc(var(--a)*0.95)]"
        style="
          background: linear-gradient(
            to bottom,
            transparent 0%,
            color-mix(in srgb, var(--b4) 55%, transparent) 25%,
            color-mix(in srgb, var(--b3) 80%, white 10%) 50%,
            color-mix(in srgb, var(--b4) 55%, transparent) 75%,
            transparent 100%
          );
          filter: blur(0.35px);
        "
      />

      <!-- 4) 细微纵向纹理（避免单调） -->
      <div
        class="absolute inset-0 opacity-[calc(var(--a)*0.18)]"
        style="
          background: repeating-linear-gradient(
            to bottom,
            color-mix(in srgb, var(--b4) 18%, transparent) 0px,
            color-mix(in srgb, var(--b4) 18%, transparent) 1px,
            transparent 7px,
            transparent 12px
          );
        "
      />

      <!-- 5) 点阵粒子（参考图中柱体内部的“星点”） -->
      <div v-if="active" class="absolute inset-0 overflow-hidden">
        <div
          class="animate-pillar-dots-a absolute -inset-x-8 -inset-y-12 opacity-[calc(var(--a)*0.40)]"
          style="
            background: radial-gradient(
                circle,
                color-mix(in srgb, var(--b4) 70%, transparent) 1px,
                transparent 2px
              )
              0 0 / 18px 26px;
            filter: drop-shadow(0 0 8px color-mix(in srgb, var(--b3) 35%, transparent));
          "
        />
        <div
          class="animate-pillar-dots-b absolute -inset-x-8 -inset-y-12 opacity-[calc(var(--a)*0.28)]"
          style="
            background: radial-gradient(
                circle,
                color-mix(in srgb, var(--b4) 45%, transparent) 0.8px,
                transparent 2px
              )
              0 0 / 12px 18px;
          "
        />
      </div>

      <!-- 6) 扫描亮带（从上到下，模拟图里的“能量扰动”） -->
      <div v-if="active" class="absolute inset-0 overflow-hidden">
        <div
          class="animate-pillar-scan absolute left-1/2 h-14 w-[78%] -translate-x-1/2 opacity-[calc(var(--a)*0.85)]"
          style="
            background: linear-gradient(
              to bottom,
              transparent,
              color-mix(in srgb, var(--b4) 55%, transparent),
              transparent
            );
            filter: blur(0.8px);
          "
        />
      </div>

      <!-- 7) 外缘高光（让边界更“硬”一点，符合你要的过滤层质感） -->
      <div
        class="absolute inset-0 rounded-full opacity-[calc(var(--a)*0.55)]"
        style="
          box-shadow:
            0 0 22px color-mix(in srgb, var(--b3) 25%, transparent),
            0 0 70px color-mix(in srgb, var(--b2) 18%, transparent);
        "
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes pillarBreathe {
  0% {
    transform: scaleX(0.985);
    opacity: calc(var(--a) * 0.46);
  }
  50% {
    transform: scaleX(1.03);
    opacity: calc(var(--a) * 0.68);
  }
  100% {
    transform: scaleX(0.985);
    opacity: calc(var(--a) * 0.46);
  }
}
.animate-pillar-breathe {
  animation: pillarBreathe 2.6s ease-in-out infinite;
}

/* 点阵上下漂移制造“流动” */
@keyframes pillarDotsA {
  0% {
    transform: translateY(-10%);
  }
  100% {
    transform: translateY(10%);
  }
}
@keyframes pillarDotsB {
  0% {
    transform: translateY(12%);
  }
  100% {
    transform: translateY(-12%);
  }
}
.animate-pillar-dots-a {
  animation: pillarDotsA 2.9s linear infinite;
}
.animate-pillar-dots-b {
  animation: pillarDotsB 3.7s linear infinite;
}

/* 扫描亮带：上->下 */
@keyframes pillarScan {
  0% {
    top: -25%;
    opacity: 0;
  }
  12% {
    opacity: calc(var(--a) * 0.9);
  }
  88% {
    opacity: calc(var(--a) * 0.9);
  }
  100% {
    top: 125%;
    opacity: 0;
  }
}
.animate-pillar-scan {
  animation: pillarScan 1.85s linear infinite;
}
</style>
