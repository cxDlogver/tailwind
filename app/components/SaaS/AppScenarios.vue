<!-- components/AppScenarios.vue -->
<script setup lang="ts">
type Scenario = {
  id: string
  title: string
  description: string
  tags: string[]
  iconPathD: string
}

const scenarios: Scenario[] = [
  {
    id: '01',
    title: '风险识别',
    description:
      '对文本模态的内容进行风险识别。能够用于内容社区安全审核，包括文章、语聊、评论、弹幕、用户名等文字体裁。',
    tags: ['社区审核', '实时弹幕', '文章合规'],
    iconPathD: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  },
  {
    id: '02',
    title: '文本过滤',
    description: '对离线文本进行安全过滤。可以用于对大量的存量内容、模型训练数据集进行安全性过滤。',
    tags: ['存量清理', '数据集清洗', '离线归档'],
    iconPathD: 'M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25',
  },
  {
    id: '03',
    title: '大模型安全',
    description:
      '可以用于构建大模型对外服务时的实时安全护栏，对用户输入的内容、模型输出的内容进行安全识别。',
    tags: ['LLM 护栏', '输入审计', '输出对齐'],
    iconPathD:
      'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
]
</script>

<template>
  <section id="scenarios" class="relative overflow-hidden bg-[#FFFFFF] py-24">
    <!-- Structural Decor -->
    <div class="absolute top-0 bottom-0 left-[8%] w-px bg-gray-50"></div>

    <div class="relative z-10 mx-auto max-w-[1440px] px-8 md:px-16">
      <div class="mb-20">
        <div class="mb-4 text-[10px] font-bold tracking-[0.5em] text-[#3B7073] uppercase">
          Deployment Contexts
        </div>
        <h2 class="mb-6 text-6xl leading-none font-black tracking-tighter text-black uppercase">
          应用<span class="ml-3 font-light text-[#3B7073] italic">场景</span>
        </h2>
        <p class="max-w-2xl text-xl leading-relaxed font-light text-gray-400">
          足以应对所有文本内容安全风险，无需再为安全合规问题苦恼。
        </p>
      </div>

      <div
        class="grid grid-cols-1 gap-px overflow-hidden rounded-[2.5rem] border border-gray-100 bg-gray-100 shadow-xl shadow-black/5 md:grid-cols-3"
      >
        <div
          v-for="item in scenarios"
          :key="item.id"
          class="group relative flex min-h-[340px] cursor-default flex-col justify-between overflow-hidden bg-white p-10 transition-all duration-700 hover:bg-[#FAFAFA]"
        >
          <!-- Animated Background Number -->
          <div
            class="pointer-events-none absolute -top-4 -right-2 text-[12rem] leading-none font-black text-gray-50 transition-all duration-700 group-hover:-translate-y-2 group-hover:text-[#3B7073]/5"
          >
            {{ item.id }}
          </div>

          <div class="relative z-10">
            <div
              class="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white transition-all duration-500 group-hover:scale-105 group-hover:bg-[#3B7073] group-hover:shadow-xl group-hover:shadow-[#3B7073]/20"
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

            <h3 class="mb-4 text-2xl font-black tracking-tight text-black uppercase">
              {{ item.title }}
            </h3>

            <p
              class="mb-6 pr-8 text-sm leading-relaxed font-light text-gray-500 transition-colors group-hover:text-gray-800"
            >
              {{ item.description }}
            </p>
          </div>

          <div class="relative z-10 mt-auto flex flex-wrap gap-1.5">
            <span
              v-for="(tag, idx) in item.tags"
              :key="idx"
              class="rounded-md border border-gray-100 bg-gray-50 px-2.5 py-0.5 text-[8px] font-bold tracking-widest text-gray-400 uppercase transition-colors group-hover:border-[#3B7073]/20 group-hover:text-[#3B7073]"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Hover Line Decor -->
          <div
            class="absolute bottom-0 left-0 h-1 w-0 bg-[#3B7073] transition-all duration-700 ease-in-out group-hover:w-full"
          ></div>
        </div>
      </div>

      <!-- Closing CTA Card -->
      <div
        class="group relative mt-24 flex flex-col items-center justify-between overflow-hidden rounded-[3.5rem] bg-[#3B7073] p-12 text-white shadow-[0_40px_80px_rgba(59,112,115,0.25)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_60px_120px_rgba(59,112,115,0.35)] md:flex-row"
      >
        <div
          class="grid-pattern pointer-events-none absolute inset-0 opacity-10 brightness-0 invert"
        ></div>
        <div
          class="pointer-events-none absolute -right-1/4 -bottom-1/4 h-1/2 w-1/2 rounded-full bg-white/10 blur-[120px] transition-transform duration-1000 group-hover:scale-150"
        ></div>

        <div class="relative z-10 mb-10 md:mb-0">
          <h4
            class="mb-2 text-3xl font-light tracking-tight italic transition-transform duration-500 group-hover:translate-x-2"
          >
            准备好升级您的内容安全架构了吗？
          </h4>
          <div class="flex items-center space-x-3">
            <div class="h-px w-8 bg-white/40"></div>
            <p class="text-[10px] font-bold tracking-[0.4em] text-white/70 uppercase">
              READY FOR NEXT-GEN DEPLOYMENT
            </p>
          </div>
        </div>

        <button
          class="group/btn relative z-10 overflow-hidden rounded-full bg-white px-12 py-5 text-xs font-bold tracking-[0.2em] text-[#3B7073] uppercase shadow-2xl shadow-black/20 transition-all group-hover:scale-105 active:scale-95"
        >
          <div
            class="absolute inset-0 h-full w-full translate-x-[-101%] bg-black transition-transform duration-500 ease-in-out group-hover/btn:translate-x-0"
          ></div>
          <span
            class="relative z-20 transition-colors delay-100 duration-300 group-hover/btn:text-white"
          >
            预约演示
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
