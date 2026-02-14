<script setup lang="ts">
import { onBeforeUnmount, reactive } from 'vue'

const emit = defineEmits<{
  (e: 'switch-menu-open', value: boolean): void
}>()

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: '产品矩阵', href: '/products' },
  { label: '解决方案', href: '/' },
  { label: '加入我们', href: '/join' },
  { label: '资讯中心', href: '/news' },
  { label: '联系我们', href: '/contact' },
]

/** 精选资讯数据 */
const featuredNews = [
  {
    id: '1',
    title: '致合作伙伴：在不确定的数字荒原，建立确定的防御秩序',
    date: '2025.02.24',
    category: 'CEO Letter',
    excerpt:
      'AI 的普及意味着生产力的解放，但也带来了法律责任的真空。缔零科技致力于通过“数字契约”填补这一真空...',
    image:
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    title: 'Lawgenesis 荣登《Axios》年度最具潜力 AI 安全企业榜首',
    date: '2025.01.18',
    category: 'Media',
    excerpt:
      '凭借在分布式审计协议上的突破性进展，Lawgenesis 在全球数百家初创企业中脱颖而出，获得监管科技领域最高评价...',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    title: '深度观察：从零信任架构看企业级 AI 安全的未来趋势',
    date: '2025.01.05',
    category: 'Research',
    excerpt:
      '随着大模型在企业内部的渗透，传统边界防御已显疲态。零信任架构结合语义审计正成为下一代安全标准的必经之路...',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '4',
    title: '缔零法则 V2.0：自研分布式安全合规协议正式开启内测',
    date: '2024.12.20',
    category: 'Product',
    excerpt:
      '新版本实现了数据不离境的本地化审计能力，完美对标跨境数据合规要求，为出海企业筑起坚实的合规防护网...',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '5',
    title: '安全边界再定义：端侧 AI 隐私防御如何实现物理隔离',
    date: '2024.11.15',
    category: 'Blog',
    excerpt:
      '在硬件层面实现 AI 行为监测。我们探讨了如何在低功耗环境下维持高强度的隐私过滤，确保敏感数据永不出库...',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
  },
] as const

/** 英文对应关系：hover 背景提示 */
const NAV_ENGLISH: Record<string, string> = {
  产品矩阵: 'PRODUCTS',
  解决方案: 'SOLUTIONS',
  加入我们: 'JOIN US',
  资讯中心: 'NEWSROOM',
  联系我们: 'CONTACT',
}

const subProducts = [
  { name: '缔零法则', link: '/lawGenesis-SaaS', desc: '分布式审计协议' },
  { name: '政府解决方案', link: '/lawGenesis-SaaS', desc: '国家级安全保障' },
  { name: '内容合规引擎', link: '/lawGenesis-SaaS', desc: 'AIGC 实时防御' },
  { name: '智能安全硬件', link: '/lawGenesis-SaaS', desc: '端侧隐私反诈' },
] as const

/** hash + 页面状态映射（尽量贴近你原 React 逻辑） */
function handleLinkClick(link: string) {
  navigateTo(link)
  emit('switch-menu-open', false)
}

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.documentElement.style.overflow = ''
})

/** ————— 磁吸效果（rAF 插值）————— */
type MagneticState = {
  hover: boolean
  expanded: boolean
  tx: number
  ty: number
  targetX: number
  targetY: number
  raf: number | null
}
function createMagneticState(): MagneticState {
  return { hover: false, expanded: false, tx: 0, ty: 0, targetX: 0, targetY: 0, raf: null }
}

/** 统一管理每个 link 的磁吸状态（key 用 label） */
const magnetic = reactive<Record<string, MagneticState>>({})

function ensureState(label: string) {
  if (!magnetic[label]) magnetic[label] = createMagneticState()
  return magnetic[label]
}

function startRAF(label: string) {
  const st = ensureState(label)
  if (st.raf) return

  const step = () => {
    // 经典 lerp：平滑趋近 target，视觉接近弹簧
    st.tx += (st.targetX - st.tx) * 0.14
    st.ty += (st.targetY - st.ty) * 0.14

    // 收敛后停止，避免空转
    const done = Math.abs(st.targetX - st.tx) < 0.1 && Math.abs(st.targetY - st.ty) < 0.1
    if (done) {
      st.tx = st.targetX
      st.ty = st.targetY
      st.raf = null
      return
    }
    st.raf = requestAnimationFrame(step)
  }
  st.raf = requestAnimationFrame(step)
}

function stopRAF(label: string) {
  const st = ensureState(label)
  if (st.raf) {
    cancelAnimationFrame(st.raf)
    st.raf = null
  }
}

function onMagMove(e: MouseEvent, label: string) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = e.clientX - cx
  const dy = e.clientY - cy
  const st = ensureState(label)
  st.targetX = dx * 0.2
  st.targetY = dy * 0.2
  startRAF(label)
}

function onMagEnter(label: string) {
  const st = ensureState(label)
  st.hover = true
}

function onMagLeave(label: string) {
  const st = ensureState(label)
  st.hover = false
  st.tx = 0
  st.ty = 0
  stopRAF(label)
}

function toggleExpand(label: string) {
  const st = ensureState(label)
  st.expanded = !st.expanded
}
</script>

<template>
  <div class="fixed inset-0 z-100 flex overflow-hidden">
    <div class="relative flex h-full w-full flex-col bg-white/95 backdrop-blur-3xl md:flex-row">
      <!-- Left: News Section (Example Content) -->

      <!-- 左侧：资讯遮罩信息页 -->
      <div
        class="relative hidden flex-[1.4] flex-col justify-start overflow-y-auto border-r border-[#EEEEEE] bg-[#F4F7F7]/50 p-16 lg:flex xl:p-24"
      >
        <div class="fs-left-enter max-w-3xl">
          <div class="mb-12 flex items-center justify-between">
            <div>
              <div
                class="text-primary mb-3 flex items-center gap-3 font-mono text-[9px] font-bold tracking-[0.6em] uppercase"
              >
                <Icon name="heroicons:arrow-trending-up" :size="12" />
                <span>Intelligence Center</span>
              </div>
              <h2 class="text-3xl font-bold tracking-tight text-[#333333]">重点资讯中心</h2>
            </div>

            <button
              class="border-primary/30 text-primary border-b pb-1 font-mono text-[10px] font-black tracking-widest uppercase transition-transform hover:translate-x-1"
              @click="handleLinkClick('/news')"
            >
              View All Reports
            </button>
          </div>

          <div class="flex flex-col gap-2">
            <button
              v-for="(news, idx) in featuredNews"
              :key="news.id"
              type="button"
              class="group hover:shadow-primary/5 flex cursor-pointer items-start gap-8 rounded-3xl border border-transparent p-6 text-left transition-all duration-500 hover:border-[#EEEEEE] hover:bg-white hover:shadow-xl"
              :style="{ transitionDelay: `${0.08 * idx}s` }"
              @click="handleLinkClick('`/news')"
            >
              <div class="h-24 w-32 shrink-0 overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                <img
                  :src="news.image"
                  class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt=""
                />
              </div>

              <div class="flex-1 space-y-2">
                <div class="flex items-center gap-2.5 font-mono text-[9px] text-[#BBBBBB]">
                  <span class="text-primary font-bold tracking-wider uppercase">{{
                    news.category
                  }}</span>
                  <span class="h-1 w-1 rounded-full bg-[#DDDDDD]" />
                  <Icon name="heroicons:calendar-date-range-solid" :size="10" />
                  <span>{{ news.date }}</span>
                </div>

                <h3
                  class="group-hover:text-primary text-base leading-snug font-bold text-[#333333] transition-colors"
                >
                  {{ news.title }}
                </h3>

                <div class="flex flex-col gap-2">
                  <p class="line-clamp-2 text-[11px] leading-relaxed font-light text-[#888888]">
                    {{ news.excerpt }}
                  </p>
                  <div
                    class="text-primary flex translate-y-1 items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase opacity-0 transition-opacity duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    阅读更多 <Icon name="heroicons:arrow-right-solid" :size="10" />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- 背景装饰文字 -->
        <div
          class="left pointer-events-none absolute bottom-[50%] translate-y-1/2 rotate-45 transform opacity-[0.02] select-none"
        >
          <span class="text-[8rem] leading-none font-black">NEWSROOM</span>
        </div>
      </div>

      <!-- 右侧 导航栏链接 -->
      <div class="relative flex flex-1 flex-col bg-white p-12 lg:p-24">
        <button
          class="text-muted hover:text-primary absolute top-12 right-12 z-20 p-3 transition-all hover:rotate-90"
          @click="emit('switch-menu-open', false)"
        >
          <span>✖</span>
          <!-- Close button icon -->
        </button>
        <div class="mt-16 flex h-full flex-col justify-center lg:mt-0">
          <nav class="mx-auto flex max-w-xl flex-col gap-2 pr-4 md:mx-0 lg:gap-4">
            <div
              class="mb-6 font-mono text-[11px] font-bold tracking-[0.6em] text-[#BBBBBB] uppercase opacity-60"
            >
              Navigator Matrix / 导航矩阵
            </div>

            <div
              v-for="(link, index) in NAV_LINKS"
              :key="link.label"
              class="relative flex flex-col"
            >
              <!-- hover 英文背景提示 -->
              <Transition name="fs-ghost">
                <div
                  v-if="ensureState(link.label).hover && !ensureState(link.label).expanded"
                  class="text-primary pointer-events-none absolute top-1/2 left-16 z-0 -translate-y-1/2 text-8xl font-black italic opacity-[0.05] select-none"
                >
                  {{ NAV_ENGLISH[link.label] }}
                </div>
              </Transition>

              <!-- 主导航条（磁吸） -->
              <div
                class="group relative z-10 flex cursor-pointer items-center gap-8 py-2 select-none"
                :style="{
                  transform: `translate3d(${ensureState(link.label).tx}px, ${ensureState(link.label).ty}px, 0)`,
                  transition: 'transform 80ms linear',
                }"
                @mousemove="(e) => onMagMove(e as MouseEvent, link.label)"
                @mouseenter="() => onMagEnter(link.label)"
                @mouseleave="() => onMagLeave(link.label)"
                @click="
                  () => {
                    if (link.label === '产品矩阵') toggleExpand(link.label)
                    else handleLinkClick(link.href)
                  }
                "
              >
                <span
                  class="text-primary font-mono text-[10px] font-bold opacity-40 transition-opacity group-hover:opacity-100"
                >
                  {{ String(index + 1).padStart(2, '0') }}
                </span>

                <div class="relative flex items-center gap-4">
                  <div
                    class="relative text-4xl font-bold tracking-tighter transition-all duration-500 lg:text-5xl"
                    :class="
                      ensureState(link.label).hover || ensureState(link.label).expanded
                        ? 'translate-x-1 text-[#333333]'
                        : 'text-[#DDDDDD]'
                    "
                  >
                    {{ link.label }}
                    <div
                      class="bg-primary absolute -bottom-1 left-0 h-0.5 transition-all duration-500"
                      :style="{
                        width:
                          ensureState(link.label).hover || ensureState(link.label).expanded
                            ? '100%'
                            : '0%',
                      }"
                    />
                  </div>

                  <div
                    v-if="link.label === '产品矩阵'"
                    class="transition-colors"
                    :class="ensureState(link.label).expanded ? 'text-primary' : 'text-placeholder'"
                    :style="{
                      transform: `rotate(${ensureState(link.label).expanded ? 180 : 0}deg)`,
                      transition: 'transform 300ms ease',
                    }"
                  >
                    <Icon name="heroicons:chevron-down-solid" :size="24" :stroke-width="3" />
                  </div>
                </div>
              </div>

              <!-- 子产品列表（展开） -->
              <Transition name="fs-expand">
                <div
                  v-if="link.label === '产品矩阵' && ensureState(link.label).expanded"
                  class="mt-6 mb-8 grid grid-cols-1 gap-3 overflow-hidden pr-4 pl-14 sm:grid-cols-2"
                >
                  <button
                    v-for="(sub, idx) in subProducts"
                    :key="sub.name"
                    type="button"
                    class="group/sub hover:border-primary/20 hover:bg-primary hover:shadow-primary/20 relative flex cursor-pointer flex-col gap-1 rounded-2xl border border-[#EEEEEE] bg-[#F4F7F7]/60 px-6 py-4 text-left shadow-sm transition-all duration-300 hover:shadow-2xl"
                    @click="handleLinkClick(sub.link)"
                  >
                    <div class="flex items-start justify-between">
                      <span
                        class="text-primary/40 font-mono text-[9px] font-bold tracking-[0.2em] transition-colors group-hover/sub:text-white/50"
                      >
                        MODULE 0{{ idx + 1 }}
                      </span>
                      <Icon
                        name="heroicons:arrow-right-solid"
                        :size="14"
                        class="text-white opacity-0 transition-all group-hover/sub:translate-x-1 group-hover/sub:opacity-100"
                      />
                    </div>
                    <span
                      class="text-base font-bold text-[#333333] transition-colors group-hover/sub:text-white"
                    >
                      {{ sub.name }}
                    </span>
                    <span
                      class="text-[10px] font-light text-[#999999] transition-colors group-hover/sub:text-white/60"
                    >
                      {{ sub.desc }}
                    </span>
                  </button>
                </div>
              </Transition>
            </div>
          </nav>
        </div>
        <div
          class="mt-auto flex flex-col justify-between gap-6 border-t border-[#F0F0F0] pt-10 text-[10px] font-bold tracking-[0.4em] text-[#BBBBBB] uppercase sm:flex-row"
        >
          <p>© 2025 LAWGENESIS PROTOCOLS</p>
          <div class="flex gap-8">
            <span
              class="hover:border-primary hover:text-primary cursor-pointer border-b border-transparent transition-colors"
            >
              WeChat
            </span>
            <span
              class="hover:border-primary hover:text-primary cursor-pointer border-b border-transparent transition-colors"
            >
              LinkedIn
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@layer components {
  /* hover 背景英文字过渡 */
  .fs-ghost-enter-active {
    @apply transition-[opacity,transform] duration-260;
  }
  .fs-ghost-enter-from {
    @apply scale-98 transform-[translate3d(-20px,-50%,0)] opacity-0;
  }
}
</style>
