<script setup lang="ts">
type VisionItem = {
  iconName: string
  text: string
}

const visions: VisionItem[] = [
  { iconName: 'lucide:shield', text: '我们提供更好用的安全治理能力，帮助用户对抗有害信息的侵扰。' },
  {
    iconName: 'lucide:cpu',
    text: '我们使用最前沿的技术用于识别、控制的来自不法分子或LLM的风险内容，防止有害内容渗透到UGC内容平台 and AIGC场景。',
  },
  {
    iconName: 'lucide:activity',
    text: '我们采用人机一体化的内容安全治理架构，发挥人类内容安全专家和AI模型的最大潜力，兼顾内容治理精度和成本。',
  },
  {
    iconName: 'lucide:database',
    text: '我们把大量数据资源投入到安全业务研究、识别技术研究上，保持70%以上的研发投入占比。',
  },
  {
    iconName: 'lucide:trending-down',
    text: '我们的工作将会极大地提高不法分子的犯罪成本，以至于无利可图，这是持续压制风险内容的最有效办法。',
  },
]
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- 使命板块 -->
    <div class="bg-primary main-card relative py-20 md:py-28">
      <div
        class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-10 select-none"
      >
        <span
          class="border-t border-b border-white text-[15vw] leading-none font-black whitespace-nowrap text-transparent italic"
        >
          MISSION ANTHEM
        </span>
      </div>

      <div class="relative z-10 container mx-auto px-6">
        <div class="mx-auto max-w-4xl text-center">
          <div
            class="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-1.5 backdrop-blur-md"
          >
            <Icon name="lucide:target" class="text-primary-hover h-4 w-4" />
            <span class="text-[12px] font-black tracking-[0.4em] text-white uppercase"
              >Corporate Mission</span
            >
          </div>

          <h2
            class="text-h3 mb-8 leading-[1.2] font-black tracking-tighter text-white italic md:text-[48px]"
          >
            “我们是一家专注于拦截内容风险的企业，致力于解决内容安全识别难题，降低网络空间安全治理成本。”
          </h2>

          <div class="flex justify-center">
            <div
              class="via-primary-hover h-1 w-16 bg-linear-to-r from-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 愿景板块 -->
    <div class="bg-neutral-bg relative py-20 md:py-28">
      <div class="container mx-auto px-6">
        <!-- 头部 -->
        <div
          class="border-primary/20 mb-16 flex flex-col items-end gap-8 border-b pb-10 lg:flex-row"
        >
          <div class="lg:w-1/2">
            <div class="mb-4 flex items-center gap-2">
              <div
                class="bg-primary flex h-10 w-10 rotate-3 items-center justify-center rounded-xl shadow-md"
              >
                <Icon name="lucide:zap" class="h-5 w-5 text-white" />
              </div>
              <span class="text-primary text-support font-black tracking-[0.4em] uppercase italic">
                Future Vision
              </span>
            </div>
            <h3
              class="text-h4 text-neutral-text1 md:text-h1 leading-none font-black tracking-tighter uppercase"
            >
              企业愿景
            </h3>
          </div>

          <div class="lg:w-1/2">
            <p
              class="text-h3 md:text-h3 text-neutral-text2 leading-tight font-bold italic opacity-60"
            >
              “正如乐队中的贝斯手稳住节拍，我们为互联网生态夯实安全的根基。”
            </p>
          </div>
        </div>

        <!-- 内容：左图右列表 -->
        <div class="flex flex-col items-start gap-16 lg:flex-row">
          <!-- 左侧图 -->
          <div class="sticky top-32 w-full lg:w-[35%]">
            <div class="group relative">
              <div
                class="bg-primary/5 absolute -inset-4 -rotate-2 rounded-4xl transition-transform duration-500 group-hover:rotate-0"
              />
              <div class="relative aspect-4/5 overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
                  alt="Cyber Security Vision"
                  class="h-full w-full scale-105 object-cover grayscale transition-all duration-700 group-hover:scale-100 hover:grayscale-0"
                />
                <div
                  class="from-primary/60 absolute inset-0 bg-linear-to-t to-transparent mix-blend-multiply"
                />
                <div class="absolute right-6 bottom-6 left-6">
                  <p
                    class="text-support border-primary-hover border-l-2 pl-3 font-black tracking-widest text-white uppercase italic"
                  >
                    Defending Digital Purity
                  </p>
                </div>
              </div>

              <div
                class="absolute -right-10 -bottom-10 hidden h-32 w-32 overflow-hidden rounded-2xl border-4 border-white shadow-xl xl:block"
              >
                <img
                  src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=400"
                  alt="Audio Tech"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- 右侧列表 -->
          <div class="w-full space-y-0 lg:w-[65%]">
            <div
              v-for="(item, index) in visions"
              :key="index"
              class="group border-neutral-divider relative flex cursor-default items-start gap-8 border-b py-8 transition-all duration-300 hover:bg-white/50 hover:px-6"
            >
              <!-- 编号与图标 -->
              <div class="flex shrink-0 items-center gap-6 pt-1">
                <span
                  class="text-primary/10 group-hover:text-primary/30 md:text-h3 w-12 text-center text-[32px] leading-none font-black italic transition-colors"
                >
                  0{{ index + 1 }}
                </span>

                <div
                  class="to-primary-light border-primary/10 text-primary group-hover:from-primary group-hover:to-primary-hover flex h-16 w-16 items-center justify-center rounded-2xl border bg-linear-to-br from-white shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:text-white"
                >
                  <Icon :name="item.iconName" class="h-7 w-7" />
                </div>
              </div>

              <!-- 文本 -->
              <div class="relative flex-1">
                <div
                  class="mb-2 flex items-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Icon name="lucide:play" class="text-primary h-2.5 w-2.5" />
                  <span class="text-primary text-[9px] font-black tracking-[0.3em] uppercase">
                    Stream_CH.0{{ index + 1 }}
                  </span>
                </div>

                <p
                  class="text-body md:text-h4 text-neutral-text1 group-hover:text-primary leading-snug font-medium tracking-tight transition-colors duration-300"
                >
                  {{ item.text }}
                </p>

                <div
                  class="bg-primary absolute -bottom-8 left-0 h-0.5 w-0 origin-left transition-all duration-700 group-hover:w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 统计区 -->
        <div
          class="border-primary/10 mt-20 flex flex-col items-center justify-between gap-12 border-t pt-16 md:mt-28 md:flex-row"
        >
          <div class="md:w-2/3">
            <div
              class="bg-primary/5 text-primary mb-4 inline-block rounded-md px-3 py-1 text-[10px] font-black tracking-widest uppercase italic"
            >
              Core Strength
            </div>
            <h4
              class="text-h2 md:text-h3 text-neutral-text1 mb-3 font-black tracking-tighter uppercase italic"
            >
              卓越的研发驱动力
            </h4>
            <p class="text-body md:text-h2 text-neutral-text2 leading-tight font-bold opacity-70">
              只有保持对技术最纯粹的投入，才能在风险对抗中立于不败之地。
            </p>
          </div>

          <div class="flex items-center justify-center gap-6 md:w-1/3 md:justify-end">
            <div class="flex flex-col items-end">
              <span class="text-primary mb-1 text-[11px] font-black tracking-[0.3em] uppercase"
                >R&amp;D Investment</span
              >

              <div class="flex items-start">
                <span
                  class="text-primary cursor-default text-[80px] leading-none font-black tracking-tighter italic transition-transform duration-500 hover:scale-105 md:text-[100px]"
                >
                  70
                </span>

                <div class="flex flex-col pt-4">
                  <span class="text-primary-hover text-[32px] leading-none font-black">%</span>
                  <span class="text-primary-hover mt-[-4px] text-[32px] leading-none font-black"
                    >+</span
                  >
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
@keyframes bounce {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(2);
  }
}
</style>
