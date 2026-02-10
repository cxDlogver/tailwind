<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 进入视口触发：给你替代 framer-motion 的最小实现
 */
function useInView(options?: IntersectionObserverInit) {
  const el = ref<HTMLElement | null>(null)
  const inView = ref(false)

  let io: IntersectionObserver | null = null

  onMounted(() => {
    if (!import.meta.client) return
    io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) inView.value = true
      },
      options ?? { threshold: 0.25 },
    )
    if (el.value) io.observe(el.value)
  })

  onBeforeUnmount(() => {
    if (io && el.value) io.unobserve(el.value)
    io?.disconnect()
    io = null
  })

  return { el, inView }
}

/**
 * TheSignal: canvas 粒子发散核心
 */
const canvasRef = ref<HTMLCanvasElement | null>(null)

type Particle = {
  r: number
  theta: number
  phi: number
  s: number
  size: number
}

const brandColor = '#3B7073'

let rafId = 0
let frame = 0
let particles: Particle[] = []

function initSignalCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 内部采样分辨率：800 x 800
  const w = (canvas.width = 800)
  const h = (canvas.height = 800)
  frame = 0

  particles = []
  for (let i = 0; i < 1000; i++) {
    particles.push({
      r: Math.random() * 360 + 20,
      theta: Math.random() * Math.PI * 2,
      phi: Math.random() * Math.PI * 2,
      s: Math.random() * 0.004 + 0.001,
      size: Math.random() * 1.8 + 0.5,
    })
  }

  const animate = () => {
    ctx.clearRect(0, 0, w, h)
    frame++

    const ox = 0
    const oy = 0

    // 核心发光体
    const pulse = Math.sin(frame * 0.012) * 20
    const grad = ctx.createRadialGradient(
      w / 2 + ox,
      h / 2 + oy,
      0,
      w / 2 + ox,
      h / 2 + oy,
      420 + pulse,
    )
    grad.addColorStop(0, 'rgba(59, 112, 115, 0.18)')
    grad.addColorStop(0.5, 'rgba(59, 112, 115, 0.03)')
    grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(w / 2 + ox, h / 2 + oy, 420 + pulse, 0, Math.PI * 2)
    ctx.fill()

    // 波纹效果
    ctx.setLineDash([1, 15])
    for (let i = 1; i <= 3; i++) {
      const r = 300 + Math.sin(frame * 0.015 + i) * 25
      ctx.beginPath()
      ctx.arc(w / 2 + ox, h / 2 + oy, r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(59, 112, 115, ${0.1 / i})`
      ctx.stroke()
    }
    ctx.setLineDash([])

    // 粒子球
    for (let idx = 0; idx < particles.length; idx++) {
      const p = particles[idx]
      p.theta += p.s

      const spreadFactor = Math.sin(frame * 0.008 + idx * 0.05) * 20
      const rr = p.r + spreadFactor
      const x = w / 2 + ox + Math.sin(p.theta) * Math.cos(p.phi) * rr
      const y = h / 2 + oy + Math.sin(p.theta) * Math.sin(p.phi) * rr

      const alphaBase = Math.max(0, 1 - p.r / 380)
      const isAccent = idx % 15 === 0
      ctx.fillStyle = isAccent ? brandColor : `rgba(59, 112, 115, ${alphaBase * 0.8})`
      ctx.globalAlpha = (Math.sin(frame * 0.04 + idx) * 0.3 + 0.7) * alphaBase

      ctx.beginPath()
      ctx.arc(x, y, p.size, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1

    rafId = requestAnimationFrame(animate)
  }

  rafId = requestAnimationFrame(animate)
}

onMounted(async () => {
  if (!import.meta.client) return
  await nextTick()
  initSignalCanvas()
})

onBeforeUnmount(() => {
  if (import.meta.client && rafId) cancelAnimationFrame(rafId)
})

/**
 * 扫描文字：用 CSS 动画控制（进入视口才触发）
 */
const scan1 = useInView({ threshold: 0.2 })

/**
 * 整体入场动效（替代 framer-motion）
 */
const signalIn = useInView({ threshold: 0.15 })
const rightIn = useInView({ threshold: 0.15 })
const formIn = useInView({ threshold: 0.15 })

const contactItems = computed(() => [
  { icon: 'lucide:mail', label: 'Email', value: 'pr@lawgenesis.cn' },
  { icon: 'lucide:phone', label: 'Terminal', value: '+86 190-8655-2860' },
  { icon: 'lucide:map-pin', label: 'Node', value: 'Shenzhen / Nanshan District' },
  { icon: 'lucide:cpu', label: 'Status', value: 'System Online' },
])
</script>

<template>
  <main class="bg-neutral-bg relative min-h-screen overflow-hidden pt-64 pb-20">
    <div class="relative z-10 mx-auto max-w-[1440px] px-10">
      <div class="flex flex-col items-center gap-10 lg:flex-row lg:gap-24">
        <!-- 左侧：The Signal -->
        <div
          ref="signalIn.el"
          class="order-2 w-full flex-1 lg:order-1"
          :class="signalIn.inView ? 'anim-in-left' : 'anim-init-left'"
        >
          <div class="relative flex aspect-square w-full max-w-[600px] items-center justify-center">
            <div class="bg-primary/5 absolute inset-0 scale-[1.2] rounded-full blur-[160px]" />
            <canvas ref="canvasRef" class="relative z-10 h-full w-full object-contain" />
          </div>
        </div>

        <!-- 右侧：文案与表单 -->
        <div
          ref="rightIn.el"
          class="order-1 flex-1 space-y-16 lg:order-2"
          :class="rightIn.inView ? 'anim-in-right' : 'anim-init-right'"
        >
          <div class="space-y-6">
            <div
              class="text-primary flex items-center gap-4 font-mono text-[10px] font-bold tracking-[0.8em] uppercase"
            >
              <div class="bg-primary h-px w-8" />
              Secure Connection Interface
            </div>

            <h1
              class="text-neutral-text1 text-5xl leading-tight font-bold tracking-tighter lg:text-7xl"
            >
              <span ref="scan1.el" class="scan-wrap">
                <!-- 底字（弱化） -->
                <span class="scan-base">让我们建立连接</span>

                <!-- 扫描条 -->
                <span
                  class="scan-bar"
                  :class="scan1.inView ? 'scan-run' : ''"
                  style="animation-delay: 200ms"
                />

                <!-- 扫描出来的字（从 0% 宽度展开到 100%） -->
                <span
                  class="scan-mask"
                  :class="scan1.inView ? 'scan-run' : ''"
                  style="animation-delay: 200ms"
                >
                  让我们建立连接
                </span>
              </span>
            </h1>

            <p class="text-neutral-text2 max-w-md text-sm font-light tracking-[0.2em] uppercase">
              Initiate Conversation / 通常我们会在 24 小时内响应你的接入请求。
            </p>
          </div>

          <!-- 表单 -->
          <div
            ref="formIn.el"
            class="space-y-12"
            :class="formIn.inView ? 'anim-in-up delay-300' : 'anim-init-up'"
          >
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div class="group relative">
                <label
                  class="text-neutral-text3 group-focus-within:text-primary absolute -top-6 left-0 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors"
                >
                  Your Identity
                </label>
                <input
                  type="text"
                  placeholder="称呼 / 公司"
                  class="border-neutral-divider text-neutral-text1 placeholder:text-neutral-text4 focus:border-primary focus:bg-primary-light w-full rounded-t-xl border-b bg-white px-4 py-4 transition-all focus:outline-none"
                />
              </div>

              <div class="group relative">
                <label
                  class="text-neutral-text3 group-focus-within:text-primary absolute -top-6 left-0 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors"
                >
                  Access Channel
                </label>
                <input
                  type="email"
                  placeholder="邮箱 / 联系方式"
                  class="border-neutral-divider text-neutral-text1 placeholder:text-neutral-text4 focus:border-primary focus:bg-primary-light w-full rounded-t-xl border-b bg-white px-4 py-4 transition-all focus:outline-none"
                />
              </div>
            </div>

            <div class="group relative">
              <label
                class="text-neutral-text3 group-focus-within:text-primary absolute -top-6 left-0 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors"
              >
                Message Context
              </label>
              <textarea
                rows="3"
                placeholder="请描述您的业务场景与安全需求..."
                class="border-neutral-divider text-neutral-text1 placeholder:text-neutral-text4 focus:border-primary focus:bg-primary-light w-full resize-none rounded-t-xl border-b bg-white px-4 py-4 transition-all focus:outline-none"
              />
            </div>

            <button
              class="group border-neutral-divider hover:border-primary/50 relative w-full overflow-hidden rounded-full border bg-white py-6 shadow-sm transition-all"
            >
              <div
                class="bg-primary absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0"
              />
              <span
                class="text-primary relative z-10 flex items-center justify-center gap-4 text-[10px] font-black tracking-[0.6em] uppercase group-hover:text-white"
              >
                发送接入请求
                <Icon name="lucide:send" class="h-4 w-4" />
              </span>
            </button>
          </div>

          <!-- 联系信息 -->
          <div class="border-neutral-divider grid grid-cols-2 gap-8 border-t pt-12">
            <div
              v-for="(item, i) in contactItems"
              :key="i"
              class="group flex cursor-default flex-col gap-2 transition-transform hover:-translate-y-1"
            >
              <div class="text-primary flex items-center gap-2">
                <Icon :name="item.icon" class="h-4 w-4" />
                <span class="font-mono text-[10px] font-bold tracking-widest uppercase">{{
                  item.label
                }}</span>
              </div>
              <div class="text-neutral-text1 text-xs font-medium">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 背景网格装饰 -->
    <div class="grid-bg pointer-events-none absolute inset-0 z-0 opacity-[0.4]" />
    <div
      class="from-primary/5 pointer-events-none absolute top-0 left-0 h-[40vh] w-full bg-gradient-to-b to-transparent"
    />
  </main>
</template>

<style scoped>
/* --- 动效：替代 framer-motion 的入场 --- */
.anim-init-left {
  opacity: 0;
  transform: translate3d(-30px, 0, 0) scale(0.95);
}
.anim-in-left {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
  transition:
    opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
    transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.anim-init-right {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}
.anim-in-right {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition:
    opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
    transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.anim-init-up {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}
.anim-in-up {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition:
    opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
    transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.delay-300 {
  transition-delay: 0.3s;
}

/* --- 扫描文字（ScanningText） --- */
@layer components {
  .scan-wrap {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }

  .scan-base {
    white-space: nowrap;
    color: rgba(51, 51, 51, 0.12); /* 等价于你之前 ghost 的效果 */
  }

  .scan-mask {
    position: absolute;
    inset: 0;
    z-index: 20;
    width: 0%;
    overflow: hidden;
    white-space: nowrap;
    color: #333333;
  }

  .scan-bar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -10%;
    width: 6%;
    z-index: 30;
    background: rgb(59, 112, 115);
    filter: blur(6px);
    pointer-events: none;
  }

  /* 同一个类同时驱动 mask 和 bar 的 keyframes */
  .scan-run.scan-mask {
    animation: scan-reveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .scan-run.scan-bar {
    animation: scan-bar 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes scan-reveal {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }

  @keyframes scan-bar {
    from {
      left: -10%;
    }
    to {
      left: 110%;
    }
  }
}

/* --- 背景网格 --- */
.grid-bg {
  background-image: radial-gradient(#dddddd 1px, transparent 1px);
  background-size: 60px 60px;
}
</style>
