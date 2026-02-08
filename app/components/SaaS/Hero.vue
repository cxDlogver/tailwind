<!-- components/Hero.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  scrollY: number
}>()

const mousePos = ref({ x: 0, y: 0 })
const isHovering = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const handleMouseMove = (e: MouseEvent) => {
  const el = containerRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  mousePos.value = { x, y }
}

const onEnter = () => {
  isHovering.value = true
}

const onLeave = () => {
  isHovering.value = false
  mousePos.value = { x: 0, y: 0 }
}

type NodeItem = {
  id: 'policy' | 'semantic' | 'graph'
  label: string
  status: string
  posClass: string
  tz: number
  rot: number
}

const nodes: NodeItem[] = [
  {
    id: 'policy',
    label: 'Policy Agent',
    status: 'Monitoring',
    posClass: 'top-10 left-1/2 -translate-x-1/2',
    tz: 100,
    rot: -2,
  },
  {
    id: 'semantic',
    label: 'Semantic Engine',
    status: 'Analyzing',
    posClass: 'bottom-20 right-4',
    tz: 80,
    rot: 3,
  },
  {
    id: 'graph',
    label: 'Graph Reasoning',
    status: 'Active',
    posClass: 'bottom-40 left-4',
    tz: 120,
    rot: -3,
  },
]
</script>

<template>
  <section class="relative overflow-hidden bg-[#F9F9F9] pt-32 pb-20 md:pt-52 md:pb-64">
    <!-- Background Grid Pattern -->
    <div class="grid-pattern pointer-events-none absolute inset-0 opacity-40"></div>

    <div
      class="relative z-10 mx-auto grid max-w-360 grid-cols-1 items-center gap-12 px-8 md:grid-cols-12 md:px-16"
    >
      <!-- Left Content -->
      <div class="relative md:col-span-6">
        <div class="absolute top-0 bottom-0 -left-8 hidden w-px bg-gray-100 lg:block">
          <div
            class="bg-primary w-full transition-all duration-300 ease-out"
            :style="{ height: `${Math.min(props.scrollY / 2, 100)}%` }"
          />
        </div>

        <div class="mb-14 flex flex-col">
          <div
            class="inline-flex w-fit items-center space-x-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-black uppercase shadow-sm"
          >
            <span class="bg-primary flex h-1.5 w-1.5 rounded-full"></span>
            <span class="text-gray-400">Product:</span>
            <span>LawGenesis 缔零法则</span>
          </div>
        </div>

        <div class="mb-12 space-y-4">
          <div class="group relative">
            <h2 class="text-6xl leading-none font-black tracking-tighter text-black md:text-8xl">
              10 <span class="text-primary relative inline-block">分钟</span>内
            </h2>
          </div>
          <div class="ml-12 flex items-center md:ml-24">
            <div class="mr-6 h-px w-8 bg-gray-200"></div>
            <h2 class="text-6xl leading-none font-light tracking-tighter text-gray-400 md:text-8xl">
              部署<span class="font-bold text-black">专家级</span>
            </h2>
          </div>
          <div class="group relative">
            <h2 class="text-6xl leading-none font-black tracking-tighter text-black md:text-8xl">
              内容安全<span class="text-primary font-light italic">防线</span>
            </h2>
          </div>
        </div>

        <div class="relative mb-12 pl-6 md:pl-12">
          <div
            class="from-primary absolute top-0 bottom-0 left-0 w-1 rounded-full bg-linear-to-b to-transparent"
          ></div>
          <div class="flex flex-col space-y-4">
            <div class="text-xs font-bold tracking-[0.2em] text-black uppercase">
              Introducing LawGenesis
            </div>
            <p class="max-w-lg text-lg leading-relaxed font-light text-gray-500 md:text-xl">
              <span class="font-bold text-black">缔零法则</span> 采用
              <span class="font-semibold text-black">Agentic AI</span>
              架构，将全球复杂的监管逻辑转化为毫秒级的自动化
              Perimeter，为您的应用构建不可逾越的安全边界。
            </p>
          </div>
        </div>

        <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <button
            class="group bg-primary shadow-primary/20 relative overflow-hidden rounded-xl px-12 py-5 text-sm font-bold tracking-widest text-white uppercase shadow-2xl transition-all hover:bg-black"
          >
            <span class="relative z-10">预约演示</span>
          </button>
          <button
            class="group flex items-center justify-center space-x-3 rounded-xl border border-gray-200 bg-white px-12 py-5 text-sm font-bold tracking-widest text-black uppercase shadow-sm transition-all hover:border-black"
          >
            <span>获取白皮书</span>
          </button>
        </div>
      </div>

      <!-- Right Content: Interactive Technical Visualization -->
      <div
        ref="containerRef"
        class="relative flex h-150 cursor-crosshair items-center justify-center md:col-span-6"
        @mousemove="handleMouseMove"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
      >
        <div
          class="relative aspect-square w-full max-w-2xl transition-transform duration-700 ease-out"
          :style="{
            transform: `perspective(1000px) rotateX(${-(mousePos.y * 15)}deg) rotateY(${mousePos.x * 15}deg)`,
          }"
        >
          <!-- Background Rings -->
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              class="absolute h-[85%] w-[85%] rounded-full border border-gray-100 transition-transform duration-500"
              :style="{ transform: `translateZ(20px) rotate(${props.scrollY * 0.05}deg)` }"
            />
            <div
              class="absolute h-[110%] w-[110%] rounded-full border border-gray-50 opacity-50 transition-transform duration-1000"
              :style="{ transform: `translateZ(-40px) rotate(${-props.scrollY * 0.02}deg)` }"
            />
          </div>

          <!-- Central Kernel -->
          <div
            class="group absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            :style="{ transform: `translate(-50%, -50%) translateZ(60px)` }"
          >
            <div
              class="relative h-52 w-52 overflow-hidden rounded-[3.5rem] border border-gray-100 bg-white p-1 shadow-2xl"
            >
              <div
                class="scanner-line absolute inset-0 z-20 h-1/2 w-full"
                :class="isHovering ? 'animate-[scan_1.5s_linear_infinite]' : ''"
              />
              <div
                class="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[3.3rem] border border-gray-100 bg-gray-50"
              >
                <div
                  class="text-primary mb-4 animate-pulse font-mono text-[9px] font-bold tracking-[0.4em] uppercase"
                >
                  Cordon_Kernel
                </div>
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-lg"
                >
                  <div class="animate-spin-slow bg-primary h-5 w-5 rounded-md"></div>
                </div>
                <div class="mt-4 flex items-center space-x-2">
                  <div class="bg-primary h-1.5 w-1.5 animate-pulse rounded-full"></div>
                  <span class="font-mono text-[7px] tracking-tighter text-gray-400 uppercase">
                    {{ isHovering ? 'Tracking Input...' : 'System Nominal' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive Satellite Nodes -->
          <div
            v-for="node in nodes"
            :key="node.id"
            class="absolute z-30 transition-all duration-300 hover:scale-110"
            :class="node.posClass"
            :style="{ transform: `translateZ(${node.tz}px) rotate(${node.rot}deg)` }"
          >
            <div
              class="group hover:border-primary/50 cursor-pointer rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-xl transition-colors"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="h-2.5 w-2.5 rounded-full transition-colors group-hover:animate-ping"
                  :class="node.id === 'graph' ? 'bg-black' : 'bg-primary'"
                />
                <div class="flex flex-col">
                  <span
                    class="group-hover:text-primary text-[9px] font-bold tracking-widest text-black uppercase transition-colors"
                  >
                    {{ node.label }}
                  </span>
                  <span class="font-mono text-[7px] tracking-tighter text-gray-400">
                    {{ node.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Dynamic Connection Lines -->
          <svg
            class="pointer-events-none absolute inset-0 h-full w-full opacity-10"
            viewBox="0 0 400 400"
          >
            <g
              class="transition-all duration-700"
              :style="{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }"
            >
              <line
                x1="200"
                y1="200"
                x2="200"
                y2="80"
                stroke="black"
                stroke-width="1.2"
                stroke-dasharray="3 3"
              />
              <line
                x1="200"
                y1="200"
                x2="320"
                y2="280"
                stroke="black"
                stroke-width="1.2"
                stroke-dasharray="3 3"
              />
              <line
                x1="200"
                y1="200"
                x2="80"
                y2="240"
                stroke="black"
                stroke-width="1.2"
                stroke-dasharray="3 3"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center space-y-2 opacity-20"
    >
      <div class="text-[8px] font-bold tracking-[0.5em] uppercase">Interaction Ready</div>
      <div class="h-12 w-px rounded-full bg-black"></div>
    </div>
  </section>
</template>

<style scoped>
/* 你原代码里用到了 scanner-line + scan 动画，这里给最小兜底，避免 Tailwind 未定义时失效 */
.scanner-line {
  background: linear-gradient(
    to bottom,
    rgba(59, 112, 115, 0),
    rgba(59, 112, 115, 0.25),
    rgba(59, 112, 115, 0)
  );
  mix-blend-mode: multiply;
}

@keyframes scan {
  0% {
    transform: translateY(-60%);
    opacity: 0.2;
  }
  20% {
    opacity: 0.35;
  }
  100% {
    transform: translateY(140%);
    opacity: 0.1;
  }
}

/* 如果你项目里没有 animate-spin-slow，这里也给兜底 */
@keyframes spin-slow {
  to {
    transform: rotate(360deg);
  }
}
:deep(.animate-spin-slow) {
  animation: spin-slow 2.2s linear infinite;
}
</style>
