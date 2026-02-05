<script setup lang="ts">
import { computed } from 'vue'

const router = useRouter()

const props = defineProps<{
  onBack?: () => void
}>()

type HireStep = {
  number: string
  title: string
  subtitle: string
  description: string
  icon: string // nuxt-icon name
  tag: string
  details: string
}

const steps = computed<HireStep[]>(() => [
  {
    number: '01',
    title: '发起连接',
    subtitle: '简历初筛',
    description:
      '将你的简历投递至 xushuangshuang@yjsafe.cn。我们寻找的不仅仅是履历，更是你对解决复杂“安全难题”的热情，以及在每一行代码中追求极致确定的态度。',
    icon: 'lucide:send',
    tag: 'Establish Connection',
    details:
      '初筛通常在 3 个工作日内完成。我们会认真审视你在技术深度、逻辑架构以及内容安全领域的独到见解。',
  },
  {
    number: '02',
    title: '逻辑共鸣',
    subtitle: '专业导师面',
    description:
      '你的直属导师将与你开启一场深度对话。我们避开那些枯燥的教条，直接切入核心：探讨技术边界、系统美学，以及在不确定的环境中如何构建最稳固的防线。',
    icon: 'lucide:terminal',
    tag: 'Technical Alignment',
    details:
      '我们更倾向于实战案例的拆解，通过探讨真实的业务痛点，寻找那个能在复杂逻辑中游刃有余的你。',
  },
  {
    number: '03',
    title: '愿景对标',
    subtitle: '部门负责人面',
    description:
      '这一阶段，我们将探讨更宏观的职业路径与团队愿景。我们寻找的是能为缔零科技注入新变量、并认可“极致协作、高度透明”价值观的长期战略伙伴。',
    icon: 'lucide:users',
    tag: 'Vision & Culture',
    details: '在这里，你可以畅谈你对行业未来的预判，以及你希望在这里实现什么样的职业突破。',
  },
  {
    number: '04',
    title: '正式入伙',
    subtitle: '发放 Offer',
    description:
      '当所有逻辑达成闭环，那份承载着我们共同期待的 Offer 将正式发出。欢迎加入，准备好与我们一起重塑数字空间的底层安全标准了吗？',
    icon: 'lucide:shield-check',
    tag: 'Official Onboarding',
    details: '我们将为你配备全方位的入职指引与“导师陪伴计划”，助你快速融入，开启职业生涯的新乐章。',
  },
])

function back() {
  if (props.onBack) return props.onBack()
  if (import.meta.client && window.history.length > 1) router.back()
  else router.push('/join')
  if (import.meta.client) window.scrollTo(0, 0)
}
</script>

<template>
  <div class="bg-neutral-bg p-top main-card p-bottom">
    <div class="container mx-auto px-6">
      <!-- 返回按钮 -->
      <button
        type="button"
        class="text-neutral-text2 hover:text-primary group text-body mb-8 flex items-center gap-2 font-black tracking-widest uppercase transition-colors"
        @click="back"
      >
        <Icon
          name="lucide:chevron-left"
          class="h-[22px] w-[22px] transition-transform group-hover:-translate-x-1"
        />
        Back to Home
      </button>

      <!-- 头部标题区域 -->
      <div class="relative mb-10 max-w-5xl">
        <div class="mb-4 flex items-center gap-3">
          <div
            class="bg-primary text-body rounded px-3 py-1 font-black tracking-[0.2em] text-white uppercase"
          >
            Recruitment Process
          </div>
          <Icon name="lucide:layers" class="text-primary-hover h-6 w-6" />
        </div>

        <h1
          class="text-h4 text-primary mb-6 leading-none font-black tracking-tighter uppercase italic md:text-[64px]"
        >
          构建确定的 <span class="text-neutral-text1">未来</span>
        </h1>

        <p class="text-h2 md:text-h3 text-neutral-text2 leading-tight font-bold">
          在缔零科技，每一位成员都是逻辑的架构师。我们致力于在纷繁的网络噪音中，寻找最清脆的“确定性”回响。
        </p>
      </div>

      <!-- 流程时间线 -->
      <div class="relative">
        <!-- 中间基准线（仅 md+ 显示） -->
        <div
          class="bg-primary/10 absolute top-0 bottom-0 left-[27px] hidden w-px md:left-1/2 md:block"
        />

        <div class="relative space-y-1">
          <div
            v-for="(step, index) in steps"
            :key="step.number"
            class="flex flex-col items-center justify-between gap-4 md:flex-row"
            :class="index % 2 === 0 ? 'md:flex-row-reverse' : ''"
          >
            <!-- 文字卡片区域 -->
            <div class="w-full md:w-[46%]">
              <div
                class="group border-neutral-divider hover:border-primary relative rounded-[2rem] border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl md:p-10"
              >
                <!-- 品牌装饰条 -->
                <div class="bg-primary absolute top-10 bottom-10 left-0 w-2 rounded-r-full" />

                <div
                  class="mb-4 flex items-center gap-4"
                  :class="index % 2 === 0 ? 'justify-start' : 'md:justify-end'"
                >
                  <span class="text-primary text-[42px] leading-none font-black italic">{{
                    step.number
                  }}</span>
                  <div class="bg-primary/20 h-px w-12" />
                  <span
                    class="text-primary-hover text-body font-black tracking-[0.2em] uppercase"
                    >{{ step.tag }}</span
                  >
                </div>

                <div class="mb-4">
                  <h4
                    class="text-primary text-body mb-1 font-black tracking-widest uppercase opacity-80"
                  >
                    {{ step.subtitle }}
                  </h4>
                  <h3 class="text-h3 md:text-h4 text-neutral-text1 leading-tight font-black">
                    {{ step.title }}
                  </h3>
                </div>

                <p class="text-h2 text-neutral-text2 mb-6 leading-snug font-bold">
                  {{ step.description }}
                </p>

                <div
                  class="bg-primary-light border-primary/10 text-body text-primary rounded-2xl border p-6 leading-relaxed font-bold italic"
                >
                  {{ step.details }}
                </div>
              </div>
            </div>

            <!-- 中心图标圆圈（md+ 绝对定位居中；移动端放在流中也可显示） -->
            <div
              class="bg-primary border-neutral-bg z-10 flex h-14 w-14 items-center justify-center rounded-full border-[4px] text-white shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2"
            >
              <Icon :name="step.icon" class="h-8 w-8 scale-110" />
            </div>

            <!-- 装饰性背景编号 -->
            <div
              class="pointer-events-none hidden h-full w-[46%] items-center justify-center select-none md:flex"
            >
              <span class="text-primary/5 text-[140px] leading-none font-black italic">{{
                step.number
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部投递区 -->
      <div class="relative mt-16">
        <div
          class="bg-primary border-primary-dark relative overflow-hidden rounded-[3rem] border p-12 text-center shadow-2xl md:p-16"
        >
          <div
            class="absolute inset-0 opacity-5"
            :style="{
              backgroundImage:
                'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)',
              backgroundSize: '40px 40px',
            }"
          />

          <div class="relative z-10 mx-auto max-w-4xl">
            <Icon name="lucide:zap" class="text-primary-hover mx-auto mb-8 h-12 w-12 opacity-80" />
            <h2
              class="text-h3 mb-6 leading-none font-black tracking-tighter text-white uppercase italic md:text-[56px]"
            >
              Ready to Join <span class="text-primary-hover">Diling?</span>
            </h2>
            <p class="text-h2 mb-12 leading-tight font-bold text-white/90">
              如果你认为自己具备那种能看透代码迷雾、植入确信力量的能力，我们随时待命。直接发起连接，让我们聊聊关于未来的无限可能。
            </p>

            <div class="flex flex-col items-center gap-6">
              <a
                href="mailto:xushuangshuang@yjsafe.cn"
                class="group text-primary text-h3 flex items-center gap-4 rounded-[1.5rem] bg-white px-14 py-7 font-black shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                xushuangshuang@yjsafe.cn
                <Icon
                  name="lucide:arrow-right"
                  class="h-8 w-8 transition-transform group-hover:translate-x-2"
                />
              </a>

              <p
                class="text-primary-hover text-body font-black tracking-[0.5em] uppercase opacity-80"
              >
                Secure Application Channel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
