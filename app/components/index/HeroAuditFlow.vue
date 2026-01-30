<template>
  <section
    ref="root"
    class="relative overflow-hidden rounded-3xl border border-white/10 bg-[#070A12] text-white"
    aria-label="缔零法则 多模态审核进化链路"
  >
    <!-- 背景：点阵 + 渐变光晕 -->
    <div class="pointer-events-none absolute inset-0 opacity-60">
      <div class="dot-grid absolute inset-0"></div>
      <div
        class="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-3xl"
      ></div>
      <div
        class="absolute -right-40 -bottom-40 h-[520px] w-[520px] rounded-full bg-fuchsia-500/15 blur-3xl"
      ></div>
    </div>

    <div class="relative z-10 px-6 py-12 md:px-10 md:py-16">
      <!-- SEO 友好标题区（SSR 静态可见） -->
      <div class="max-w-3xl">
        <p
          class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] tracking-[0.2em] text-white/70"
        >
          ZER0-RULE · MULTIMODAL RISK GOVERNANCE
        </p>

        <h1 class="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
          缔零法则：多模态内容审核的
          <span class="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            证据闭环
          </span>
        </h1>

        <p class="mt-4 leading-relaxed text-white/70">
          从图片/视频/音频/文本/文件统一入流，经解析、召回、推理、决策四层进化，输出可审计的处置结果与主体分层，覆盖全风险域系统治理。
        </p>

        <div class="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
          <span class="tag">全风险域系统治理</span>
          <span class="tag">安全防护精准定制</span>
          <span class="tag">存量定向回查</span>
          <span class="tag">增量实时审核</span>
          <span class="tag">交付成果兜底</span>
        </div>
      </div>

      <!-- 主视觉：三列布局 -->
      <div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr_320px] lg:items-center">
        <!-- 左：多模态输入卡片 -->
        <div class="space-y-4">
          <div class="text-xs tracking-[0.2em] text-white/50">INPUT · MULTIMODAL</div>

          <div class="stack">
            <CardItem
              v-for="(c, i) in inputCards"
              :key="c.label"
              :label="c.label"
              :icon="c.icon"
              :delay="i * 120"
              :active="active"
            />
          </div>

          <div class="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div class="text-xs text-white/50">统一审核事件对象</div>
            <div class="mt-2 font-mono text-xs leading-relaxed text-white/70">
              Event = content + metadata + account + behavior + context
            </div>
          </div>
        </div>

        <!-- 中：进化过滤栈 + 连线 -->
        <div class="relative">
          <!-- SVG 连线：从左输入汇聚到每层 -->
          <svg
            class="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 900 420"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="rgba(34,211,238,0.10)" />
                <stop offset="0.5" stop-color="rgba(34,211,238,0.75)" />
                <stop offset="1" stop-color="rgba(16,185,129,0.65)" />
              </linearGradient>
            </defs>

            <!-- 主干流线 -->
            <path
              class="flow-path"
              :class="{ 'is-active': active }"
              d="M120,90 C260,90 260,120 380,120 C520,120 520,110 640,110"
              stroke="url(#flow)"
              stroke-width="2"
              fill="none"
              filter="url(#glow)"
            />
            <path
              class="flow-path"
              :class="{ 'is-active': active }"
              d="M120,160 C260,160 260,180 380,180 C520,180 520,180 640,180"
              stroke="url(#flow)"
              stroke-width="2"
              fill="none"
              filter="url(#glow)"
              style="animation-delay: 120ms"
            />
            <path
              class="flow-path"
              :class="{ 'is-active': active }"
              d="M120,230 C260,230 260,240 380,240 C520,240 520,250 640,250"
              stroke="url(#flow)"
              stroke-width="2"
              fill="none"
              filter="url(#glow)"
              style="animation-delay: 240ms"
            />
            <path
              class="flow-path"
              :class="{ 'is-active': active }"
              d="M120,300 C260,300 260,300 380,300 C520,300 520,320 640,320"
              stroke="url(#flow)"
              stroke-width="2"
              fill="none"
              filter="url(#glow)"
              style="animation-delay: 360ms"
            />
          </svg>

          <!-- 进化栈 -->
          <div class="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs tracking-[0.2em] text-white/50">EVOLUTION · FILTERING</div>
                <div class="mt-2 text-lg font-semibold">四层进化栈</div>
              </div>
              <div
                class="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70"
              >
                Evidence Closed-Loop
              </div>
            </div>

            <div class="mt-5 grid gap-4 md:grid-cols-2">
              <StageCard
                v-for="(s, i) in stages"
                :key="s.title"
                :title="s.title"
                :subtitle="s.subtitle"
                :bullets="s.bullets"
                :active="active"
                :delay="600 + i * 160"
              />
            </div>

            <!-- “净化/收敛”条：用来视觉表达过滤越来越确定 -->
            <div class="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div class="flex items-center justify-between text-xs text-white/60">
                <span>Noise</span><span>Certainty</span>
              </div>
              <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div class="purify-bar" :class="{ 'is-active': active }"></div>
              </div>
              <div class="mt-2 font-mono text-[11px] text-white/55">
                payload → parse → recall → reason → decide → audit-package
              </div>
            </div>
          </div>
        </div>

        <!-- 右：输出结果 -->
        <div class="space-y-4">
          <div class="text-xs tracking-[0.2em] text-white/50">OUTPUT · GOVERNANCE</div>

          <ResultCard
            v-for="(r, i) in outputs"
            :key="r.title"
            :title="r.title"
            :level="r.level"
            :tags="r.tags"
            :active="active"
            :delay="1200 + i * 160"
          />

          <div class="mt-4 grid grid-cols-3 gap-3">
            <Metric :label="'精确率'" :value="'97.1%'" :active="active" :delay="1600" />
            <Metric :label="'误伤率'" :value="'2.69%'" :active="active" :delay="1720" />
            <Metric :label="'漏放率'" :value="'2.13%'" :active="active" :delay="1840" />
          </div>
        </div>
      </div>
    </div>

    <!-- 可访问性：减少动效 -->
    <div class="sr-only">
      动画展示：多模态输入经过解析、召回、推理、决策四层过滤，输出风险类别、处置等级与主体分层，并形成可审计证据链。
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * 子组件放同文件仅为示例，实际建议拆到 components/hero/
 * 这里用 defineComponent 可保持简单；也可直接抽出为单独 .vue 文件。
 */
import type { PropType } from 'vue'
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

const root = ref<HTMLElement | null>(null)
const active = ref(false)

const inputCards = [
  { label: '图片', icon: 'IMG' },
  { label: '视频', icon: 'VID' },
  { label: '音频', icon: 'AUD' },
  { label: '文本', icon: 'TXT' },
  { label: '文件', icon: 'FILE' },
]

const stages = [
  {
    title: 'Parse',
    subtitle: '多模态解析',
    bullets: ['OCR / ASR / 抽帧', '结构化与去噪', '证据片段化'],
  },
  {
    title: 'Recall',
    subtitle: '召回与命中',
    bullets: ['黑样本相似检索', '规则触发组合', '高精度拦截'],
  },
  {
    title: 'Reason',
    subtitle: '图谱推理',
    bullets: ['主体关联扩展', '团伙/投毒识别', '跨源一致性校验'],
  },
  {
    title: 'Decide',
    subtitle: '处置策略',
    bullets: ['P0/P1/限流/复核', '证据包生成', '可申诉可审计'],
  },
]

const outputs = [
  { title: '常规用户', level: 'PASS', tags: ['低风险', '抽检'] },
  { title: '违法团伙', level: 'P1', tags: ['处罚', '团伙关联', '证据链'] },
  { title: '商业投毒', level: 'P0', tags: ['关停', '投放链路', '黑样本命中'] },
]

let io: IntersectionObserver | null = null

onMounted(() => {
  if (!root.value) return

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  if (reduce) {
    active.value = true
    return
  }

  io = new IntersectionObserver(
    (entries) => {
      const e = entries[0]
      if (e?.isIntersecting) active.value = true
    },
    { threshold: 0.35 },
  )

  io.observe(root.value)
})

onBeforeUnmount(() => {
  if (io && root.value) io.unobserve(root.value)
  io = null
})

const CardItem = defineComponent({
  name: 'CardItem',
  props: {
    label: { type: String, required: true },
    icon: { type: String, required: true },
    delay: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
  },
  template: `
    <div class="card" :class="{ 'is-active': active }" :style="{ '--d': delay + 'ms' }">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-xs text-white/70">
            {{ icon }}
          </div>
          <div class="text-sm font-medium">{{ label }}</div>
        </div>
        <div class="h-2 w-2 rounded-full bg-emerald-400/70 shadow-[0_0_18px_rgba(16,185,129,0.45)]"></div>
      </div>
      <div class="mt-3 font-mono text-[11px] text-white/50 leading-relaxed">
        55 77 00 00  ·  payload  ·  mix/noise
      </div>
      <div class="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div class="card-scan"></div>
      </div>
    </div>
  `,
})

const StageCard = defineComponent({
  name: 'StageCard',
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    bullets: { type: Array as PropType<string[]>, required: true },
    active: { type: Boolean, default: false },
    delay: { type: Number, default: 0 },
  },
  template: `
    <div class="stage" :class="{ 'is-active': active }" :style="{ '--d': delay + 'ms' }">
      <div class="flex items-start justify-between">
        <div>
          <div class="text-[13px] font-semibold">{{ title }}</div>
          <div class="mt-1 text-xs text-white/60">{{ subtitle }}</div>
        </div>
        <div class="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/65">
          layer
        </div>
      </div>
      <ul class="mt-3 space-y-1 text-xs text-white/65 leading-relaxed">
        <li v-for="b in bullets" :key="b">· {{ b }}</li>
      </ul>
      <div class="mt-3 font-mono text-[11px] text-white/45">
        evidence → compress → confidence+
      </div>
    </div>
  `,
})

const ResultCard = defineComponent({
  name: 'ResultCard',
  props: {
    title: { type: String, required: true },
    level: { type: String, required: true },
    tags: { type: Array as PropType<string[]>, required: true },
    active: { type: Boolean, default: false },
    delay: { type: Number, default: 0 },
  },
  computed: {
    badgeClass(): string {
      if (this.level === 'P0') return 'badge badge-p0'
      if (this.level === 'P1') return 'badge badge-p1'
      return 'badge badge-pass'
    },
  },
  template: `
    <div class="result" :class="{ 'is-active': active }" :style="{ '--d': delay + 'ms' }">
      <div class="flex items-center justify-between">
        <div class="text-sm font-medium">{{ title }}</div>
        <div :class="badgeClass">{{ level }}</div>
      </div>
      <div class="mt-3 flex flex-wrap gap-2">
        <span v-for="t in tags" :key="t" class="pill">{{ t }}</span>
      </div>
      <div class="mt-3 text-[11px] text-white/55 font-mono">
        audit: rule-hit · sample-match · graph-link
      </div>
    </div>
  `,
})

const Metric = defineComponent({
  name: 'Metric',
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    active: { type: Boolean, default: false },
    delay: { type: Number, default: 0 },
  },
  template: `
    <div class="metric" :class="{ 'is-active': active }" :style="{ '--d': delay + 'ms' }">
      <div class="text-[11px] text-white/55">{{ label }}</div>
      <div class="mt-1 text-lg font-semibold">{{ value }}</div>
    </div>
  `,
})
</script>

<style scoped>
.dot-grid {
  background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0;
  mask-image: radial-gradient(
    circle at 50% 40%,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.25) 55%,
    rgba(0, 0, 0, 0) 78%
  );
}

.tag {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 10px;
  border-radius: 999px;
}

.stack {
  position: relative;
}
.card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  padding: 14px;
  transform: translateY(10px);
  opacity: 0;
  transition:
    transform 800ms cubic-bezier(0.2, 0.9, 0.2, 1),
    opacity 800ms ease,
    border-color 600ms ease;
  transition-delay: var(--d, 0ms);
  position: relative;
  overflow: hidden;
}
.card::before {
  content: '';
  position: absolute;
  inset: -40%;
  background:
    radial-gradient(circle at 30% 20%, rgba(34, 211, 238, 0.2), transparent 45%),
    radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.18), transparent 55%);
  opacity: 0.6;
  transform: rotate(8deg);
}
.card > * {
  position: relative;
  z-index: 1;
}
.card.is-active {
  transform: translateY(0);
  opacity: 1;
}
.card:hover {
  border-color: rgba(34, 211, 238, 0.35);
}

.card-scan {
  height: 100%;
  width: 40%;
  background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.45), transparent);
  transform: translateX(-120%);
  animation: scan 2.6s ease-in-out infinite;
  opacity: 0.7;
}
@keyframes scan {
  0% {
    transform: translateX(-120%);
  }
  45% {
    transform: translateX(260%);
  }
  100% {
    transform: translateX(260%);
  }
}

.flow-path {
  stroke-dasharray: 900;
  stroke-dashoffset: 900;
  opacity: 0;
}
.flow-path.is-active {
  opacity: 1;
  animation: dash 1.1s ease forwards;
}
@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

.stage {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.18);
  border-radius: 18px;
  padding: 14px;
  transform: translateY(10px);
  opacity: 0;
  transition:
    transform 800ms cubic-bezier(0.2, 0.9, 0.2, 1),
    opacity 800ms ease,
    border-color 600ms ease;
  transition-delay: var(--d, 0ms);
  position: relative;
  overflow: hidden;
}
.stage::after {
  content: '';
  position: absolute;
  left: -30%;
  top: -60%;
  width: 60%;
  height: 220%;
  background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.15), transparent);
  transform: rotate(18deg);
  opacity: 0;
}
.stage.is-active {
  transform: translateY(0);
  opacity: 1;
}
.stage.is-active::after {
  animation: sheen 2.8s ease-in-out infinite;
  opacity: 1;
}
.stage:hover {
  border-color: rgba(16, 185, 129, 0.35);
}

@keyframes sheen {
  0% {
    transform: translateX(-40%) rotate(18deg);
    opacity: 0;
  }
  30% {
    opacity: 0.9;
  }
  55% {
    transform: translateX(240%) rotate(18deg);
    opacity: 0;
  }
  100% {
    transform: translateX(240%) rotate(18deg);
    opacity: 0;
  }
}

.purify-bar {
  height: 100%;
  width: 35%;
  background: linear-gradient(
    90deg,
    rgba(168, 85, 247, 0.35),
    rgba(34, 211, 238, 0.75),
    rgba(16, 185, 129, 0.65)
  );
  transform: translateX(-120%);
  opacity: 0.9;
}
.purify-bar.is-active {
  animation: purify 2.2s cubic-bezier(0.2, 0.9, 0.2, 1) infinite;
}
@keyframes purify {
  0% {
    transform: translateX(-120%);
    width: 45%;
    opacity: 0.55;
  }
  45% {
    transform: translateX(120%);
    width: 30%;
    opacity: 0.95;
  }
  100% {
    transform: translateX(120%);
    width: 30%;
    opacity: 0.95;
  }
}

.result {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  padding: 14px;
  transform: translateY(10px);
  opacity: 0;
  transition:
    transform 800ms cubic-bezier(0.2, 0.9, 0.2, 1),
    opacity 800ms ease,
    border-color 600ms ease;
  transition-delay: var(--d, 0ms);
}
.result.is-active {
  transform: translateY(0);
  opacity: 1;
}
.result:hover {
  border-color: rgba(168, 85, 247, 0.35);
}

.badge {
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.25);
}
.badge-p0 {
  border-color: rgba(244, 63, 94, 0.35);
  color: rgba(251, 113, 133, 0.95);
}
.badge-p1 {
  border-color: rgba(168, 85, 247, 0.35);
  color: rgba(196, 181, 253, 0.95);
}
.badge-pass {
  border-color: rgba(16, 185, 129, 0.35);
  color: rgba(110, 231, 183, 0.95);
}

.pill {
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.18);
  color: rgba(255, 255, 255, 0.7);
}

.metric {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.18);
  border-radius: 16px;
  padding: 10px 12px;
  transform: translateY(10px);
  opacity: 0;
  transition:
    transform 700ms cubic-bezier(0.2, 0.9, 0.2, 1),
    opacity 700ms ease;
  transition-delay: var(--d, 0ms);
}
.metric.is-active {
  transform: translateY(0);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .flow-path,
  .card-scan,
  .purify-bar,
  .stage::after {
    animation: none !important;
  }
  .flow-path {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}
</style>
