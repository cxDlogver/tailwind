<!-- components/CapabilityMatrix.vue -->
<script setup lang="ts">
type Segment = { text: string; emphasize?: boolean }

type Capability = {
  title: string
  shortSegments: Segment[]
  fullDesc: string
  metric: string
  iconPathD: string
}

const capabilities: Capability[] = [
  {
    title: '安全专家模型',
    shortSegments: [
      { text: '定向增强训练多种规格 LLM，用于' },
      { text: '意图识别', emphasize: true },
      { text: '、' },
      { text: '场景重建', emphasize: true },
      { text: '、' },
      { text: '安全对抗', emphasize: true },
      { text: '等组件。' },
    ],
    fullDesc:
      '通过原子级能力解构，实现对极高难度对抗性内容的精准研判。深度结合安全知识图谱，构建坚实的语义防御边界。',
    metric: 'Expert LLM',
    iconPathD:
      'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    title: '全域覆盖',
    shortSegments: [
      { text: '识别范围覆盖' },
      { text: '全风险域', emphasize: true },
      { text: '，一次调用即可完成涉政、违法、未成年保护等' },
      { text: '全量识别', emphasize: true },
      { text: '。' },
    ],
    fullDesc:
      '覆盖 350+ 细分维度，包括涉政、宗教、违法犯罪、未成年保护、色情低俗、公序良俗等全球合规红线。',
    metric: 'All-in-One',
    iconPathD:
      'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  },
  {
    title: '多标签审查',
    shortSegments: [
      { text: '支持在 ' },
      { text: '350+', emphasize: true },
      { text: ' 细分标签中多选，支持' },
      { text: '【假设-结果】', emphasize: true },
      { text: '多情况讨论输出。' },
    ],
    fullDesc:
      '灵活的策略对齐能力，允许开发者根据业务场景自定义判定逻辑，实现更高程度的合规灵活性与响应精度。',
    metric: '350+ Labels',
    iconPathD:
      'M7 7h.01M7 11h.01M7 15h.01M13 7h.01M13 11h.01M13 15h.01M17 7h.01M17 11h.01M17 15h.01',
  },
  {
    title: '降本提效',
    shortSegments: [
      { text: '综合成本下降 ' },
      { text: '60%', emphasize: true },
      { text: '，时效提升 ' },
      { text: '70倍', emphasize: true },
      { text: '，支持 ' },
      { text: '10倍', emphasize: true },
      { text: ' QPS 快速弹性扩展。' },
    ],
    fullDesc:
      '告别繁琐的人工初审，LawGenesis 通过 Agentic AI 显著降低人力依赖，轻松应对突发业务峰值流量。',
    metric: '-60% Cost',
    iconPathD: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
]
</script>

<template>
  <section id="features" class="relative overflow-hidden bg-[#F4F4F4] py-24">
    <!-- Decorative vertical lines -->
    <div class="absolute top-0 bottom-0 left-[8%] w-px bg-gray-200 opacity-20"></div>
    <div class="absolute top-0 right-[8%] bottom-0 w-px bg-gray-200 opacity-20"></div>

    <div class="relative z-10 mx-auto max-w-[1440px] px-8 md:px-16">
      <div class="mb-20 flex flex-col justify-between md:flex-row md:items-end">
        <div class="max-w-xl">
          <div class="mb-5 text-[10px] font-bold tracking-[0.6em] text-[#3B7073] uppercase">
            Functional Superiority
          </div>
          <h2 class="text-6xl leading-none font-black tracking-tighter text-black uppercase">
            产品核心<span class="ml-4 font-light text-[#3B7073] italic">功能</span>
          </h2>
          <div class="mt-8 h-2 w-20 rounded-full bg-black"></div>
        </div>

        <div class="hidden md:block">
          <div
            class="flex items-center space-x-4 font-mono text-[10px] tracking-widest text-gray-300 uppercase"
          >
            <span class="animate-pulse">Agentic_Safety_Network</span>
            <div class="h-px w-12 bg-gray-200"></div>
            <span class="font-bold text-black">SECURE_PERIMETER</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(item, idx) in capabilities"
          :key="idx"
          class="group perspective-1000 h-[280px]"
        >
          <div
            class="preserve-3d relative h-full w-full cursor-default transition-all duration-700 group-hover:scale-[1.02] group-hover:rotate-y-180"
          >
            <!-- Front Side -->
            <div
              class="absolute inset-0 flex flex-col justify-between rounded-2xl border border-gray-100 bg-[#FFFFFF] p-8 shadow-sm transition-all backface-hidden group-hover:shadow-none"
            >
              <div>
                <div
                  class="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-100 bg-[#F9F9F9] text-black shadow-sm transition-all group-hover:bg-[#3B7073]/5 group-hover:text-[#3B7073]"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      :d="item.iconPathD"
                    />
                  </svg>
                </div>

                <h4
                  class="mb-4 text-2xl leading-none font-black tracking-tight text-black uppercase"
                >
                  {{ item.title }}
                </h4>

                <div class="line-clamp-4 text-[12px] leading-relaxed font-light text-gray-500">
                  <template v-for="(seg, i) in item.shortSegments" :key="i">
                    <span v-if="seg.emphasize" class="font-bold text-[#3B7073]">{{
                      seg.text
                    }}</span>
                    <span v-else>{{ seg.text }}</span>
                  </template>
                </div>
              </div>

              <div class="flex items-center justify-between border-t border-gray-50 pt-6">
                <div
                  class="rounded-full border border-gray-100 bg-[#F9F9F9] px-3.5 py-1 font-mono text-[9px] font-bold tracking-wider text-[#3B7073] uppercase"
                >
                  {{ item.metric }}
                </div>
                <div
                  class="h-2 w-2 rounded-full bg-gray-200 transition-all group-hover:bg-[#3B7073]"
                ></div>
              </div>
            </div>

            <!-- Back Side -->
            <div
              class="absolute inset-0 flex rotate-y-180 flex-col justify-between rounded-2xl border border-black bg-[#111111] p-8 shadow-2xl backface-hidden"
            >
              <div class="space-y-5">
                <div class="flex items-center space-x-3">
                  <div
                    class="h-1.5 w-1.5 rounded-full bg-[#3B7073] shadow-[0_0_12px_#3B7073]"
                  ></div>
                  <span class="text-[8px] font-bold tracking-[0.5em] text-gray-500 uppercase">
                    System Intelligence
                  </span>
                </div>

                <h4 class="text-lg font-bold tracking-tight text-white uppercase">
                  {{ item.title }}
                </h4>

                <p class="text-[11px] leading-relaxed font-light text-gray-400">
                  {{ item.fullDesc }}
                </p>
              </div>

              <div class="flex items-center justify-between border-t border-white/10 pt-6">
                <div>
                  <div class="mb-1 text-[8px] font-bold tracking-widest text-[#3B7073] uppercase">
                    Performance Bench
                  </div>
                  <div class="text-xl font-black tracking-tighter text-white">
                    {{ item.metric }}
                  </div>
                </div>
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full border border-white/5"
                >
                  <div class="h-1.5 w-1.5 rounded-full bg-white/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 3D 翻转兜底（避免 Tailwind 未配置 3D transform utilities 时失效） */
.perspective-1000 {
  perspective: 1000px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
.group-hover\:rotate-y-180:hover {
  transform: rotateY(180deg);
}
</style>
