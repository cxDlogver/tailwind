<script setup lang="ts">
import { computed, ref } from 'vue'

type PartnerItem = {
  company: string
  provider: string
  role: string
  type: number
  quote: string
  verifiedId: string
}

const partnerData = ref<PartnerItem[]>([
  {
    company: 'Nvidia Ops',
    provider: 'Alex Rivera',
    role: 'Infrastructure Lead',
    type: 0,
    quote: '缔零科技的分布式审计协议，为我们的算力节点提供了前所未有的合规透明度。',
    verifiedId: 'NODE-X8801',
  },
  {
    company: 'DeepScale AI',
    provider: 'Sarah Chen',
    role: 'Chief Technology Officer',
    type: 1,
    quote: '在处理海量 UGC 内容时，其识别引擎的精度与低延迟令我们印象深刻。',
    verifiedId: 'NODE-L4092',
  },
  {
    company: 'Quantum Dynamics',
    provider: 'Dr. Marcus Vane',
    role: 'Senior Scientist',
    type: 2,
    quote: '思维屏障不仅是安全工具，更是我们保护模型知识产权的最后一道防线。',
    verifiedId: 'NODE-Q1105',
  },
  {
    company: 'Sentinel Cyber',
    provider: 'Jordan Smith',
    role: 'SecOps Director',
    type: 3,
    quote: '面对日益复杂的认知病毒攻击，缔零提供的动态加密技术是唯一的解法。',
    verifiedId: 'NODE-S9921',
  },
  {
    company: 'CoreFlow Labs',
    provider: 'Lina Zhang',
    role: 'Lead Architect',
    type: 4,
    quote: '极其丝滑的接入体验，我们仅用一周就完成了全栈安全协议的部署与适配。',
    verifiedId: 'NODE-C3304',
  },
])

const rowAItems = computed(() => [...partnerData.value, ...partnerData.value])
const rowBItems = computed(() => [...partnerData.value, ...partnerData.value])
</script>

<template>
  <div class="mb-20 lg:mb-40">
    <div
      class="justify-centerbg-red-500 relative flex min-h-50 flex-col items-center justify-center"
    >
      <div class="pointer-events-none absolute inset-10 z-0 flex items-center justify-center">
        <span
          class="text-primary/5 text-center text-5xl leading-none font-semibold tracking-[0.30em] uppercase select-none md:text-[9rem]"
        >
          CUSTOMER
        </span>
      </div>
      <h2
        class="text-primary relative z-10 text-center text-4xl font-bold tracking-tight md:text-6xl"
      >
        合作伙伴
      </h2>
      <div class="bg-primary relative z-10 mt-8 h-1 w-20 rounded-full" />
    </div>

    <div class="relative z-10 scale-105 -rotate-1 lg:-rotate-1">
      <div
        class="from-surface-muted via-surface-muted/90 pointer-events-none absolute inset-y-0 left-0 z-20 w-[15vw] bg-linear-to-r to-transparent"
      ></div>
      <div
        class="from-surface-muted via-surface-muted/90 pointer-events-none absolute inset-y-0 right-0 z-20 w-[15vw] bg-linear-to-l to-transparent"
      ></div>

      <div class="space-y-6">
        <div class="w-full overflow-hidden py-2 select-none">
          <div class="marquee-track" style="--marquee-duration: 50s">
            <IndexPartnersCard v-for="(item, i) in rowAItems" :key="`a-${i}`" :item="item" />
          </div>
        </div>

        <div class="w-full overflow-hidden py-2 select-none">
          <div class="marquee-track marquee-reverse" style="--marquee-duration: 50s">
            <IndexPartnersCard v-for="(item, i) in rowBItems" :key="`b-${i}`" :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-track {
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 2rem;
  min-width: 200%;
  animation: marquee var(--marquee-duration, 50s) linear infinite;
  will-change: transform;
}
.marquee-reverse {
  animation-direction: reverse;
}
@keyframes marquee {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-80%);
  }
}
</style>
