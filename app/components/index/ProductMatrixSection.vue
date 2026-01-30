<script setup lang="ts">
import { computed, ref } from 'vue'

// 定义 BusinessItem 类型
type BusinessItem = {
  id: string
  title: string
  english: string
  desc: string
  detail: string
  gridClass: string // Tailwind CSS 网格位置类
  roundedClass: string // Tailwind CSS 圆角类
  slideX: number // 鼠标悬停时的 X 轴位移
  slideY: number // 鼠标悬停时的 Y 轴位移
  rotateX: number // 鼠标悬停时的 X 轴旋转角度
  rotateY: number // 鼠标悬停时的 Y 轴旋转角度
  coverPadding: string // 覆盖层内边距类
  innerPadding: string // 内部内容内边距类
  iconName: string // 图标名称
  audienceIconName: string // 受众图标名称
}

// 临时数据
const businessItems = computed<BusinessItem[]>(() => [
  {
    id: 'tob',
    title: '缔零法则',
    english: 'ENTERPRISE SOLUTIONS',
    desc: '自研分布式安全合规协议',
    detail: '自研分布式协议，支持**数据不离境审计**，保障企业**商业秘密**并实现合规对标。',
    iconName: 'i-lucide-briefcase',
    audienceIconName: 'i-lucide-building',
    gridClass: 'col-start-1 row-start-1',
    roundedClass: 'rounded-tl-[140px] rounded-tr-[30px] rounded-bl-[30px] rounded-br-[10px]',
    slideX: -250,
    slideY: -250,
    rotateX: 18,
    rotateY: -18,
    coverPadding: 'pt-8 pb-8 pl-12 pr-8',
    innerPadding: 'pt-12 pb-12 pl-16 pr-12',
  },
  {
    id: 'tog',
    title: '政府解决方案',
    english: 'PUBLIC SECTOR',
    desc: '国家级算力安全保障体系',
    detail: '深度适配**国产信创**。为政务模型提供**物理隔离**，守护国家**数字主权**。',
    iconName: 'i-lucide-landmark',
    audienceIconName: 'i-lucide-landmark',
    gridClass: 'col-start-2 row-start-1',
    roundedClass: 'rounded-tr-[140px] rounded-tl-[30px] rounded-br-[30px] rounded-bl-[10px]',
    slideX: 250,
    slideY: -250,
    rotateX: 18,
    rotateY: 18,
    coverPadding: 'pt-8 pb-8 pr-12 pl-8',
    innerPadding: 'pt-12 pb-12 pr-16 pl-12',
  },
  {
    id: 'tosmb',
    title: '内容合规引擎',
    english: 'MCN & CREATORS',
    desc: 'AIGC 内容全生命周期防御',
    detail: '10ms **版权保护引擎**。实时识别侵权风险，追踪 **AIGC 内容来源**。',
    iconName: 'i-lucide-clapperboard',
    audienceIconName: 'i-lucide-video',
    gridClass: 'col-start-2 row-start-2',
    roundedClass: 'rounded-br-[280px] rounded-tr-[30px] rounded-tl-[10px] rounded-bl-[0px]',
    slideX: 220,
    slideY: 220,
    rotateX: -18,
    rotateY: 18,
    coverPadding: 'pb-28 pt-12 pr-16 pl-8',
    innerPadding: 'pb-40 pt-28 pr-24 pl-12',
  },
  {
    id: 'toc',
    title: '智能安全硬件',
    english: 'FAMILY PROTECTION',
    desc: '端侧 AI 隐私反诈终端',
    detail: '本地 **AI 反诈芯片**。无需数据上云，实现**话术实时预警**，守护数字屏障。',
    iconName: 'i-lucide-heart-handshake',
    audienceIconName: 'i-lucide-baby',
    gridClass: 'col-start-1 row-start-2',
    roundedClass: 'rounded-bl-[280px] rounded-tl-[30px] rounded-tr-[10px] rounded-br-[0px]',
    slideX: -220,
    slideY: 240,
    rotateX: -18,
    rotateY: -18,
    coverPadding: 'pb-28 pt-12 pl-16 pr-8',
    innerPadding: 'pb-40 pt-28 pl-24 pr-12',
  },
])

const hoveredId = ref<string | null>(null)

// 解析 detail 字符串，识别加粗部分
type DetailPart = { text: string; bold: boolean }
function parseDetail(detail: string): DetailPart[] {
  const parts: DetailPart[] = []
  const re = /\*\*(.*?)\*\*/g
  let lastIndex = 0

  detail.replace(re, (match, boldText: string, offset: number) => {
    if (offset > lastIndex) {
      parts.push({ text: detail.slice(lastIndex, offset), bold: false })
    }

    parts.push({ text: boldText, bold: true })
    lastIndex = offset + match.length
    return match
  })

  if (lastIndex < detail.length) {
    parts.push({ text: detail.slice(lastIndex), bold: false })
  }

  return parts
}

// 计算覆盖层样式
function coverStyle(item: BusinessItem) {
  const isActive = hoveredId.value === item.id
  const x = isActive ? item.slideX : 0
  const y = isActive ? item.slideY : 0
  const rx = isActive ? item.rotateX : 0
  const ry = isActive ? item.rotateY : 0
  const scale = isActive ? 1.05 : 1

  const transform = `translate3d(${x}px, ${y}px, ${isActive ? 150 : 0}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
  const boxShadow = isActive
    ? '0 70px 100px -15px rgba(59, 112, 115,0.45), 0 25px 45px -20px rgba(0,0,0,0.3)'
    : '0 10px 20px -5px rgba(0,0,0,0.05)'

  return { transform, boxShadow } as Record<string, string>
}
</script>

<template>
  <div
    class="relative flex w-full flex-col items-center justify-center gap-12 overflow-visible bg-transparent pt-40 pb-20 xl:flex-row xl:justify-between xl:gap-40"
  >
    <!-- 左侧标题组件 -->
    <div class="relative z-10 w-full space-y-8 px-6 text-center xl:max-w-md xl:text-left">
      <div
        class="text-primary flex items-center justify-center gap-6 font-mono text-[11px] font-bold tracking-[0.8em] uppercase xl:justify-start"
      >
        <div class="bg-primary/30 hidden h-px w-12 xl:block" />
        Product Matrix
      </div>

      <div class="space-y-6">
        <h2
          class="text-muted text-5xl leading-[1.1] font-light tracking-tighter md:text-6xl xl:text-7xl"
        >
          核心 <br class="hidden xl:block" />
          <span class="text-primary font-bold">产品矩阵</span>
        </h2>

        <p
          class="text-text mx-auto max-w-sm text-lg leading-relaxed font-normal tracking-wide italic opacity-70 xl:mx-0"
        >
          全场景闭环守护，构建 AIGC 时代不可篡改的安全底座。从政府侧到家庭端，筑起数字长城。
        </p>
      </div>

      <div class="flex flex-col items-center gap-8 pt-10 xl:items-start">
        <div
          class="text-text-secondary flex items-center gap-5 font-mono text-[11px] font-black tracking-[0.6em] uppercase"
        >
          <div
            class="h-3 w-3 rounded-full transition-all duration-700"
            :class="hoveredId ? 'bg-primary shadow-[0_0_15px_#3B7073]' : 'bg-[#EEEEEE]'"
          />
          System Status: {{ hoveredId ? 'DECODING' : 'IDLE' }}
        </div>
      </div>
    </div>

    <!-- 右侧产品矩阵 -->
    <div class="relative flex h-160 w-full shrink-0 items-center justify-center p-4 md:w-160">
      <div
        class="pointer-events-none absolute inset-[-10%] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,112,115,0.06)_0%,transparent_70%)]"
      />

      <div
        class="absolute inset-0 z-10 grid grid-cols-2 grid-rows-2 gap-1"
        :style="{ perspective: '30000px' }"
      >
        <div
          v-for="item in businessItems"
          :key="item.id"
          class="group relative cursor-pointer"
          :class="item.gridClass"
          @mouseenter="hoveredId = item.id"
          @mouseleave="hoveredId = null"
        >
          <!-- 内部矩阵 -->
          <div
            class="bg-primary absolute inset-0 z-0 overflow-hidden shadow-[inset_0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-700"
            :class="item.roundedClass"
          >
            <div
              class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_80%)]"
            />
            <div
              class="relative z-10 flex h-full w-full flex-col items-center justify-center space-y-4 text-center text-white"
              :class="item.innerPadding"
            >
              <div class="space-y-2">
                <h4 class="text-lg leading-tight font-black tracking-tight md:text-xl">
                  {{ item.desc }}
                </h4>
                <div class="mx-auto h-1 w-8 rounded-full bg-white/20" />
              </div>

              <p class="max-w-50 text-xs leading-relaxed font-light opacity-90 md:text-sm">
                <template v-for="(part, idx) in parseDetail(item.detail)" :key="idx">
                  <b v-if="part.bold" class="font-black text-white">{{ part.text }}</b>
                  <span v-else>{{ part.text }}</span>
                </template>
              </p>

              <button
                class="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[10px] font-black tracking-[0.2em] text-[#3B7073] uppercase shadow-xl shadow-black/10 transition-all hover:scale-[1.05] active:scale-[0.95]"
              >
                了解更多
                <Icon name="i-lucide-external-link" class="bg-primary size-3" />
              </button>
            </div>
          </div>
          <!-- 外层矩阵 -->
          <div
            class="border-surface-muted absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden border bg-white transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            :class="[item.roundedClass, item.coverPadding]"
            :style="coverStyle(item)"
          >
            <div class="relative z-10 flex w-full flex-col items-center gap-6 text-center">
              <div
                class="transform rounded-[2.5rem] p-6 transition-all duration-1000"
                :class="
                  hoveredId === item.id
                    ? 'bg-primary scale-110 rotate-360 text-white shadow-2xl'
                    : 'text-primary bg-sufface-muted'
                "
              >
                <Icon :name="item.iconName" class="size-8" />
              </div>

              <div class="flex max-w-40 flex-col items-center">
                <h4
                  class="text-placeholder mb-3 font-mono text-[10px] font-black tracking-[0.4em] uppercase transition-colors group-hover:text-[#3B7073]/50"
                >
                  {{ item.english }}
                </h4>
                <div
                  class="text-text-primary text-xl leading-[1.1] font-black tracking-tighter md:text-2xl"
                >
                  {{ item.title }}
                </div>
              </div>
              <div
                class="border-surface-muted absolute -top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border transition-all"
                :class="
                  hoveredId === item.id
                    ? 'bg-primary rotate-360 text-white shadow-2xl'
                    : 'text-primary bg-surface-white'
                "
              >
                <Icon :name="item.audienceIconName" class="size-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 中心引擎旋转 -->
      <div
        class="pointer-events-none absolute z-20 flex h-36 w-36 items-center justify-center rounded-full md:h-32.5 md:w-32.5"
      >
        <div
          class="border-surface-muted absolute inset-0 flex items-center justify-center overflow-hidden rounded-full border-[5px] bg-white shadow-[inset_0_4px_20px_rgba(0,0,0,0.05),0_20px_40px_-15px_rgba(0,0,0,0.08),0_8px_12px_-5px_rgba(59,112,115,0.12)]"
        ></div>

        <div class="relative z-50 flex items-center justify-center">
          <div
            class="border-surface-muted flex h-12 w-12 items-center justify-center rounded-[0.9rem] border bg-white shadow-xl transition-transform duration-700"
            :class="hoveredId ? 'scale-[1.05]' : 'scale-100'"
          >
            <div class="bg-primary/5 absolute inset-0 animate-pulse rounded-[0.9rem]" />
            <Icon
              name="i-lucide-cpu"
              class="relative z-10 size-7 transition-all duration-1000"
              :class="
                hoveredId
                  ? 'cpu-spin text-primary drop-shadow-[0_0_15px_rgba(59,112,115,0.3)]'
                  : 'text-text-secondary'
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes cpuSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
.cpu-spin {
  animation: cpuSpin 2.5s linear infinite;
}
</style>
