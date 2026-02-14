<script setup lang="ts">
import { HIRE_STEPS } from '~/data/joinJobData'

const router = useRouter()

const props = defineProps<{
  onBack?: () => void
}>()

const copied = ref(false)
const steps = HIRE_STEPS

function back() {
  if (props.onBack) return props.onBack()
  if (import.meta.client && window.history.length > 1) router.back()
  else router.push('/join')
  if (import.meta.client) window.scrollTo(0, 0)
}

function CopyEmailToClipboard() {
  const email = 'xushuangshuang@yjsafe.cn'
  navigator.clipboard.writeText(email).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}
</script>

<template>
  <div class="bg-neutral-bg p-top main-card p-bottom">
    <div class="container">
      <!-- 返回按钮 -->
      <button
        type="button"
        class="text-neutral-text2 hover:text-primary group text-body mb-8 flex items-center gap-2 font-black tracking-widest uppercase transition-colors"
        @click="back"
      >
        <Icon
          name="lucide:chevron-left"
          class="h-5.5 w-5.5 transition-transform group-hover:-translate-x-1"
        />
        返回
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
          class="text-h4 text-primary mb-6 leading-none font-black tracking-tighter uppercase italic md:text-6xl"
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
          class="bg-primary/10 absolute top-0 bottom-0 left-6.75 hidden w-px md:left-1/2 md:block"
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
                class="group border-neutral-divider hover:border-primary relative rounded-4xl border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl md:p-10"
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

                <p class="text-body text-neutral-text2 mb-6 leading-snug italic">
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
              class="bg-primary border-neutral-bg z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 text-white shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2"
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
          class="bg-primary border-primary-dark relative overflow-hidden rounded-[3rem] border p-12 text-center shadow-2xl md:p-8"
        >
          <div
            class="absolute inset-0 opacity-5"
            :style="{
              backgroundImage:
                'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)',
              backgroundSize: '40px 40px',
            }"
          />

          <div class="relative z-10 mx-auto max-w-3xl">
            <Icon name="lucide:zap" class="text-primary-hover mx-auto mb-8 h-12 w-12 opacity-80" />
            <h2
              class="text-h3 md:text-h1 mb-6 leading-none font-black tracking-tighter text-white uppercase italic"
            >
              Ready to Join <span class="text-primary-hover">Diling?</span>
            </h2>
            <p class="text-h4 mb-12 leading-tight font-bold text-white/90">
              如果你认为自己具备那种能看透代码迷雾、植入确信力量的能力，我们随时待命。直接发起连接，让我们聊聊关于未来的无限可能。
            </p>

            <div class="flex flex-col items-center gap-3">
              <button
                class="group text-primary text-h4 flex cursor-pointer items-center gap-4 rounded-3xl bg-white px-14 py-5 font-black shadow-2xl transition-all hover:scale-105 active:scale-95"
                @click="CopyEmailToClipboard"
              >
                xushuangshuang@yjsafe.cn
                <span v-if="copied" class="flex animate-pulse items-center text-green-700">
                  <Icon name="heroicons:check-solid" class="mr-2" />
                  已复制
                </span>

                <span v-else class="flex items-center">
                  <Icon name="heroicons:clipboard-document-solid" class="mr-2" />
                  复制地址
                </span>
              </button>

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

    <!-- Floating Toast -->
    <div
      v-if="copied"
      class="fixed bottom-16 left-1/2 z-50 flex -translate-x-1/2 animate-bounce items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-white shadow-2xl"
    >
      <Icon name="heroicons:check-circle" class="text-green-400" />
      <span>邮箱地址已复制到剪贴板</span>
    </div>
  </div>
</template>
