<!-- pages/news.vue  或 components/NewsCenter.vue -->

<template>
  <div class="main-card">
    <!-- =========================
         1) 顶部 Header（标题 + 分类卡片）
         ========================= -->
    <header class="mb-16 text-left">
      <h2
        class="text-primary mb-6 flex items-center gap-4 font-mono text-[11px] font-bold tracking-[0.8em] uppercase"
      >
        <span class="bg-primary h-[1px] w-12" />
        Intelligence Center
      </h2>
      <div class="mb-12">
        <h1
          class="text-text max-w-2xl text-4xl leading-tight font-bold tracking-tighter lg:text-5xl"
        >
          资讯中心
        </h1>
      </div>

      <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          class="group relative min-w-[140px] flex-1 overflow-hidden rounded-[2rem] border p-6 text-left transition-all duration-500"
          :class="
            activeTab === cat.id
              ? 'bg-primary border-primary shadow-primary/10 shadow-xl'
              : 'bg-surface border-border hover:border-primary/30 shadow-sm hover:-translate-y-1'
          "
          @click="activeTab = cat.id"
        >
          <div
            class="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-500"
            :class="
              activeTab === cat.id ? 'bg-white/20 text-white' : 'bg-primary-soft text-primary'
            "
          >
            <span class="text-xs font-black">{{ cat.short }}</span>
          </div>

          <h3
            class="mb-1.5 text-sm font-bold tracking-tight transition-colors"
            :class="activeTab === cat.id ? 'text-white' : 'text-text'"
          >
            {{ cat.label }}
          </h3>

          <div
            class="flex items-center gap-1.5 font-mono text-[9px] tracking-widest"
            :class="activeTab === cat.id ? 'text-white/40' : 'text-text/40'"
          >
            EXPLORE
            <span class="translate-y-[0.5px]">›</span>
          </div>
        </button>
      </div>
    </header>

    <!-- =========================
         2) Hero 轮播（featuredItems 前 5 条）
         - 鼠标悬停暂停
         - 自动播放：AUTO_PLAY_INTERVAL
         - 方向动画：heroDirection 决定滑入方向
         ========================= -->
    <section
      class="group/hero relative mb-32"
      @mouseenter="isHoveringHero = true"
      @mouseleave="isHoveringHero = false"
    >
      <div
        class="bg-surface relative aspect-21/8 w-full overflow-hidden rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] md:h-145"
      >
        <template v-if="featuredItems.length > 0 && heroItem">
          <Transition :name="heroTransitionName">
            <div :key="heroItem.id" class="absolute inset-0">
              <img :src="heroItem.image" class="h-full w-full object-cover" :alt="heroItem.title" />
            </div>
          </Transition>
          <!-- hero图的遮罩层 -->
          <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

          <div class="absolute inset-0 flex flex-col justify-end p-8 pb-20 md:p-24 md:pb-32">
            <div class="max-w-4xl text-left">
              <!-- 1) 标签/日期 -->
              <Transition name="hero-pop">
                <div
                  :key="heroItem.id"
                  class="mb-6 flex items-center gap-6"
                  :style="{ '--d': '0ms' }"
                >
                  <span
                    class="bg-primary shadow-primary/20 rounded-full px-5 py-1.5 text-[9px] font-bold tracking-[0.4em] text-white uppercase shadow-lg"
                  >
                    {{ heroItem.tag }}
                  </span>
                  <span class="font-mono text-[9px] tracking-[0.2em] text-white/60">
                    {{ heroItem.date }}
                  </span>
                </div>
              </Transition>

              <!-- 2) 标题 -->
              <Transition name="hero-pop">
                <div :key="heroItem.id" :style="{ '--d': '120ms' }">
                  <h2
                    class="mb-6 text-3xl leading-tight font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
                  >
                    {{ heroItem.title }}
                  </h2>
                </div>
              </Transition>

              <!-- 3) 摘要 -->
              <Transition name="hero-pop">
                <div :key="heroItem.id" :style="{ '--d': '240ms' }">
                  <p
                    class="mb-10 line-clamp-2 max-w-2xl text-base leading-relaxed font-light text-white/70 md:text-lg"
                  >
                    {{ heroItem.excerpt }}
                  </p>
                </div>
              </Transition>

              <!-- 4) 按钮 -->
              <button
                type="button"
                class="group bg-primary relative flex items-center gap-5 overflow-hidden rounded-full px-10 py-4 font-bold text-white shadow-lg transition-all duration-500"
              >
                <span
                  class="group-hover:text-primary relative z-10 flex items-center gap-5 text-sm tracking-wide transition-colors duration-500"
                >
                  阅读深度报告
                  <span class="transition-transform group-hover:translate-x-2">→</span>
                </span>
                <span
                  class="absolute inset-0 -translate-x-full bg-white transition-transform duration-600 ease-out group-hover:translate-x-0"
                />
              </button>
            </div>
          </div>
          <!-- 底部进度条 -->
          <div class="absolute right-0 bottom-10 left-0 z-20 flex justify-center gap-4">
            <button
              v-for="(_, i) in featuredItems"
              :key="i"
              type="button"
              class="group flex items-center justify-center px-1 py-2 transition-all"
              @click="jumpToHero(i)"
            >
              <div
                class="relative h-1 overflow-hidden rounded-full bg-white/10 transition-all duration-700"
                :class="i === heroIndex ? 'w-16 bg-white' : 'w-1 bg-white/30 hover:bg-white/60'"
              >
                <div
                  v-if="i === heroIndex && !isHoveringHero"
                  :key="`progress-${heroIndex}`"
                  class="bg-primary hero-progress absolute inset-0"
                  :style="{ animationDuration: `${AUTO_PLAY_INTERVAL}ms` }"
                />
              </div>
            </button>
          </div>
        </template>

        <template v-else>
          <div
            class="bg-primary-soft text-text/60 flex h-full w-full flex-col items-center justify-center font-mono italic"
          >
            <div class="mb-4 text-4xl opacity-20">▦</div>
            NO CONTENT AVAILABLE FOR CURRENT FILTER
          </div>
        </template>
      </div>
    </section>

    <!-- =========================
         3) 新闻网格（分页 + 年份过滤）
         ========================= -->
    <section id="news-grid-anchor" class="scroll-mt-32">
      <div class="mb-16 flex flex-col gap-8 border-b border-[#F0F0F0] pb-12 text-left">
        <div class="flex w-full flex-col justify-between gap-6 md:flex-row md:items-center">
          <div class="flex items-center gap-6">
            <h3 class="text-3xl font-bold tracking-tight text-[#333333]">
              {{
                activeTab === 'All' ? '全部动态' : categories.find((c) => c.id === activeTab)?.label
              }}
            </h3>
            <div
              class="rounded-full bg-[#F4F7F7] px-4 py-1.5 font-mono text-[10px] font-black tracking-widest text-[#3B7073] uppercase"
            >
              {{ fullSortedNews.length }} Units
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div
              v-if="totalPages > 1"
              class="flex items-center gap-4 rounded-full border border-[#EEEEEE] bg-white px-5 py-2 shadow-sm transition-all hover:border-[#3B7073]/30"
            >
              <button
                type="button"
                class="rounded-full p-1.5 transition-all duration-300"
                :class="
                  currentPage === 1
                    ? 'cursor-not-allowed opacity-20'
                    : 'text-[#3B7073] hover:bg-[#3B7073]/5'
                "
                :disabled="currentPage === 1"
                @click="handlePageChange(Math.max(1, currentPage - 1))"
              >
                ‹
              </button>

              <div class="flex items-center gap-2.5 border-x border-[#F5F5F5] px-3">
                <span class="font-mono text-xs font-bold text-[#3B7073]">{{
                  String(currentPage).padStart(2, '0')
                }}</span>
                <span class="font-mono text-[9px] text-[#BBBBBB]">/</span>
                <span class="font-mono text-[9px] tracking-wider text-[#999999]">{{
                  String(totalPages).padStart(2, '0')
                }}</span>
              </div>

              <button
                type="button"
                class="rounded-full p-1.5 transition-all duration-300"
                :class="
                  currentPage === totalPages
                    ? 'cursor-not-allowed opacity-20'
                    : 'text-[#3B7073] hover:bg-[#3B7073]/5'
                "
                :disabled="currentPage === totalPages"
                @click="handlePageChange(Math.min(totalPages, currentPage + 1))"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-8">
          <span
            class="flex items-center gap-2 font-mono text-[9px] font-bold tracking-[0.3em] text-[#BBBBBB] uppercase"
          >
            <span class="text-[12px]">🗓</span>
            Year Filter:
          </span>

          <!-- 年份筛选按钮 -->
          <div class="flex gap-3">
            <button
              v-for="year in yearOptions"
              :key="year"
              type="button"
              class="rounded-full border px-5 py-1.5 font-mono text-[10px] tracking-widest transition-all duration-500"
              :class="
                activeYear === year
                  ? 'border-[#3B7073] bg-[#3B7073] text-white'
                  : 'border-[#EEEEEE] bg-white text-[#999999] hover:border-[#3B7073] hover:text-[#3B7073]'
              "
              @click="activeYear = year"
            >
              {{ year }}
            </button>
          </div>
        </div>
      </div>

      <!-- 新闻网格 -->
      <div class="relative min-h-200 overflow-hidden">
        <Transition name="grid-page">
          <div :key="pageKey" class="grid-page-wrap">
            <div class="grid grid-cols-1 gap-x-16 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
              <template v-if="displayNews.length > 0">
                <article
                  v-for="item in displayNews"
                  :key="item.id"
                  class="group cursor-pointer text-left"
                >
                  <div
                    class="relative mb-10 aspect-16/10 overflow-hidden rounded-[2.5rem] bg-[#E5E5E5] shadow-lg"
                  >
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="h-full w-full object-cover opacity-90 transition-transform duration-[2s] group-hover:scale-110 group-hover:opacity-100"
                    />
                    <div class="absolute top-8 left-8 text-left">
                      <span
                        class="rounded-2xl bg-white/95 px-5 py-2 text-[10px] font-black tracking-widest text-[#3B7073] uppercase backdrop-blur-md"
                      >
                        {{ item.tag }}
                      </span>
                    </div>
                  </div>

                  <div
                    class="mb-6 flex items-center gap-5 font-mono text-[10px] tracking-[0.3em] text-[#BBBBBB]"
                  >
                    <span class="font-bold text-[#3B7073]">{{ item.date }}</span>
                    <span class="h-[1.5px] w-1.5 bg-[#DDDDDD]" />
                    <span>ARTICLE {{ item.id }}</span>
                  </div>

                  <h3
                    class="mb-6 line-clamp-2 text-2xl leading-tight font-bold text-[#333333] transition-colors group-hover:text-[#3B7073]"
                  >
                    {{ item.title }}
                  </h3>

                  <p class="mb-10 line-clamp-3 text-lg leading-relaxed font-light text-[#666666]">
                    {{ item.excerpt }}
                  </p>

                  <div
                    class="flex items-center gap-3 border-t border-[#F9F9F9] pt-8 text-base font-bold text-[#3B7073] transition-all group-hover:gap-5"
                  >
                    深入阅读 <span class="text-lg">→</span>
                  </div>
                </article>
              </template>

              <div
                v-else
                class="col-span-full py-40 text-center font-mono tracking-widest text-[#BBBBBB] uppercase opacity-50"
              >
                Found nothing for these conditions.
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- 分页栏 -->
      <div v-if="totalPages > 1" class="mt-40 flex items-center justify-center">
        <div
          class="flex items-center gap-2 rounded-4xl border border-[#EEEEEE] bg-white p-3 shadow-xl shadow-black/2"
        >
          <button
            type="button"
            class="flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-500"
            :class="
              currentPage === 1
                ? 'cursor-not-allowed opacity-20'
                : 'border-[#EEEEEE] text-[#333333] hover:border-[#3B7073] hover:bg-[#3B7073]/5 hover:text-[#3B7073]'
            "
            :disabled="currentPage === 1"
            @click="handlePageChange(Math.max(1, currentPage - 1))"
          >
            ‹
          </button>

          <div class="flex items-center px-4">
            <button
              v-for="p in visiblePages"
              :key="p"
              type="button"
              class="group relative flex h-12 w-12 items-center justify-center"
              @click="handlePageChange(p)"
            >
              <span
                v-if="currentPage === p"
                class="absolute inset-2 z-0 rounded-2xl bg-[#3B7073] shadow-lg shadow-[#3B7073]/20"
              />
              <span
                class="relative z-10 font-mono text-xs font-bold transition-colors duration-500"
                :class="
                  currentPage === p ? 'text-white' : 'text-[#BBBBBB] group-hover:text-[#3B7073]'
                "
              >
                {{ String(p).padStart(2, '0') }}
              </span>
            </button>
          </div>

          <button
            type="button"
            class="flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-500"
            :class="
              currentPage === totalPages
                ? 'cursor-not-allowed opacity-20'
                : 'border-[#EEEEEE] text-[#333333] hover:border-[#3B7073] hover:bg-[#3B7073]/5 hover:text-[#3B7073]'
            "
            :disabled="currentPage === totalPages"
            @click="handlePageChange(Math.min(totalPages, currentPage + 1))"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type NewsCategory = 'All' | 'Media' | 'Press' | 'Blog' | 'CEO' | 'Research'

interface NewsItem {
  id: string // 新闻ID
  category: Exclude<NewsCategory, 'All'> // 新闻类别
  title: string // 新闻标题
  excerpt: string // 新闻摘要
  date: string // 新闻日期
  tag: 'Insights' | 'Official' // 新闻标签
  image: string // 新闻图片URL
}
/** 临时数据信息 */
const ITEMS_PER_PAGE = 6
const AUTO_PLAY_INTERVAL = 6000
const yearOptions = ['All', '2025', '2024'] as const
const CATEGORY_IMAGE_POOLS: Record<Exclude<NewsCategory, 'All'>, string[]> = {
  Media: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    'https://images.unsplash.com/photo-1497366216548-37526070297c',
    'https://images.unsplash.com/photo-1449156001533-cb39c16b4d00',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
  ],
  Press: [
    'https://images.unsplash.com/photo-1557804506-669a67965ba0',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    'https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f',
  ],
  Blog: [
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    'https://images.unsplash.com/photo-1493612276216-ee3925520721',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    'https://images.unsplash.com/photo-1454165833767-027eeef1593e',
  ],
  CEO: [
    'https://images.unsplash.com/photo-1431540015161-0bf868a2d407',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72',
  ],
  Research: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    'https://images.unsplash.com/photo-1518770660439-4636190af475',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31',
  ],
}

const categories = [
  { label: '全部动态', id: 'All' as const, short: 'ALL' },
  { label: '媒体报道', id: 'Media' as const, short: 'MED' },
  { label: '新闻稿', id: 'Press' as const, short: 'PRS' },
  { label: '博客中心', id: 'Blog' as const, short: 'BLG' },
  { label: 'CEO 信函', id: 'CEO' as const, short: 'CEO' },
  { label: '行业研究', id: 'Research' as const, short: 'R&D' },
]

/** 临时生成的新闻数据 —— 后面需要调用CMS系统API数据替换 useFetch */
function generateAbundantNews(): NewsItem[] {
  const categories: Exclude<NewsCategory, 'All'>[] = ['Media', 'Press', 'Blog', 'CEO', 'Research']
  const data: NewsItem[] = []

  for (let i = 1; i <= 48; i += 1) {
    const cat = categories[i % categories.length]
    const pool = CATEGORY_IMAGE_POOLS[cat]
    const baseImg = pool[i % pool.length]
    const year = i > 24 ? '2024' : '2025'
    const month = String((i % 2) + 1).padStart(2, '0')
    const day = String((i % 28) + 1).padStart(2, '0')

    data.push({
      id: String(i),
      category: cat,
      title:
        i === 1
          ? '致合作伙伴：在不确定的数字荒原，建立确定的防御秩序'
          : i === 2
            ? 'Lawgenesis 荣登《Axios》年度最具潜力 AI 安全企业榜首'
            : i === 3
              ? '深度观察：从零信任架构看企业级 AI 安全的未来趋势'
              : `全球智库深度简报：关于数字契约与 AI 监管的第 ${i} 阶段研究成果`,
      excerpt:
        'AI 的普及意味着生产力的解放，但也带来了法律责任的真空。缔零科技致力于通过“数字契约”填补这一真空，构建透明可信的未来。',
      date: `${year}.${month}.${day}`,
      tag: i % 3 === 0 ? 'Insights' : 'Official',
      image: `${baseImg}?auto=format&fit=crop&q=80&w=1600&sig=${cat}-${i}`,
    })
  }

  return data
}

/** 全局状态 */
const activeTab = ref<NewsCategory>('All') // 当前标签类型
const activeYear = ref<(typeof yearOptions)[number]>('All') // 当前年份过滤
const currentPage = ref(1) // 当前页码
const newsData = generateAbundantNews() // 全部新闻数据
// 当前筛选并排序后的新闻数据
const fullSortedNews = computed(() => {
  let data = [...newsData]

  if (activeTab.value !== 'All') data = data.filter((item) => item.category === activeTab.value)
  if (activeYear.value !== 'All')
    data = data.filter((item) => item.date.startsWith(activeYear.value))
  // 根据日期排序
  data.sort((a, b) => {
    const ta = new Date(a.date.replace(/\./g, '-')).getTime()
    const tb = new Date(b.date.replace(/\./g, '-')).getTime()
    return tb - ta
  })

  return data
})

// 监听当前类别和年份的变化，重置分页和轮播状态，重启自动播放
watch(
  () => [activeTab.value, activeYear.value],
  () => {
    currentPage.value = 1
    heroIndex.value = 0
    heroDirection.value = 1
    stopHeroAutoPlay()
    if (featuredItems.value.length > 0 && !isHoveringHero.value) startHeroAutoPlay()
  },
)

/** hexo轮播图信息 */
const heroIndex = ref(0)
const heroDirection = ref(1) // 1 表示从右往左
const isHoveringHero = ref(false)
// 精选轮播新闻（前 5 条）- 最新的5条
const featuredItems = computed(() => fullSortedNews.value.slice(0, 5))
// 当前轮播新闻项
const heroItem = computed(() => featuredItems.value[heroIndex.value] || featuredItems.value[0])
//  轮播过渡类名
const heroTransitionName = computed(() =>
  heroDirection.value > 0 ? 'hero-slide-left' : 'hero-slide-right',
)
// 自动播放定时器ID
const timerId = ref<number | null>(null)

// 跳转到指定的 Hero 索引
function jumpToHero(index: number): void {
  if (index === heroIndex.value) return
  heroDirection.value = index > heroIndex.value ? 1 : -1
  heroIndex.value = index
}

// 分页 Hero， direction: 1 向后， -1 向前
function paginateHero(direction: number): void {
  heroDirection.value = direction
  const len = featuredItems.value.length
  if (len <= 0) return

  let next = heroIndex.value + direction
  if (next < 0) next = len - 1
  if (next >= len) next = 0
  heroIndex.value = next
}

// 启动/停止 Hero 自动播放
function startHeroAutoPlay(): void {
  if (timerId.value !== null) return
  timerId.value = window.setInterval(() => paginateHero(1), AUTO_PLAY_INTERVAL)
}

function stopHeroAutoPlay(): void {
  if (timerId.value === null) return
  window.clearInterval(timerId.value)
  timerId.value = null
}

// 监听hover动作， hover暂停自动播放
watch(
  () => isHoveringHero.value,
  (hovering) => {
    if (hovering) stopHeroAutoPlay()
    else if (featuredItems.value.length > 0) startHeroAutoPlay()
  },
)

/** 新闻分割板块 */
// 计算总页数
const totalPages = computed(() => Math.ceil(fullSortedNews.value.length / ITEMS_PER_PAGE))
// 当前页显示的新闻项
const displayNews = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return fullSortedNews.value.slice(start, start + ITEMS_PER_PAGE)
})
// 分页过渡关键字 - 用于 Transition 组件的 key，触发过渡动画 - 当前页数 - 年份 - 类型
const pageKey = computed(() => `${currentPage.value}-${activeTab.value}-${activeYear.value}`)
// 处理页码变化
function handlePageChange(page: number): void {
  if (page === currentPage.value) return
  currentPage.value = page
}
// 计算可见页码（最多5个）
const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  const total = totalPages.value

  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  const end = Math.min(total, start + maxVisible - 1)

  if (end === total) start = Math.max(1, end - maxVisible + 1)

  for (let i = start; i <= end; i += 1) pages.push(i)
  return pages
})

/** 生命周期钩子 */
onMounted(() => {
  if (featuredItems.value.length > 0 && !isHoveringHero.value) startHeroAutoPlay()
})

onBeforeUnmount(() => {
  stopHeroAutoPlay()
})
</script>

<style>
/* ===== Hero 方向滑动 ===== */
.hero-slide-left-enter-active,
.hero-slide-left-leave-active,
.hero-slide-right-enter-active,
.hero-slide-right-leave-active {
  transition:
    transform 420ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 420ms ease;
}

.hero-slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.hero-slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.hero-slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.hero-slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* ===== Hero 元素弹出动画 ===== */
.hero-pop-enter-active {
  transition:
    transform 840ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 840ms ease;
  transition-delay: var(--d, 0ms);
}

.hero-pop-enter-from {
  transform: translateY(18px);
  opacity: 0;
}

/* 可选：减少动态效果偏好 */
@media (prefers-reduced-motion: reduce) {
  .hero-pop-enter-active {
    transition-duration: 1ms;
    transition-delay: 0ms;
  }
}

/* Hero 指示器进度条 */
.hero-progress {
  animation-name: heroProgress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes heroProgress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

/* =========================
   Grid 叠加切页动画（无空白）
   - 离场：左移 + 快速淡出
   - 进场：左移 + 上移 + 渐显
   ========================= */

/* 两个状态都做硬件加速 & 避免闪烁 */
/* 叠加：离场页 absolute，避免空白 */
.grid-page-enter-active,
.grid-page-leave-active {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.grid-page-leave-active {
  position: absolute;
  inset: 0;
  width: 100%;
}

/* 外层：只管 X */
.grid-page-enter-from,
.grid-page-leave-to {
  transform: translate3d(22px, 0, 0);
}
.grid-page-enter-to,
.grid-page-leave-from {
  transform: translate3d(0, 0, 0);
}

/* 内层：只管 Y + opacity（Y 迟一点开始） */
.grid-page-wrap > .grid {
  will-change: transform, opacity, filter;
}

.grid-page-enter-from .grid {
  opacity: 0;
  transform: translate3d(0, 50px, 0);
  filter: blur(1px);
}

.grid-page-enter-to .grid {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  filter: blur(0);
}

/* 时序：X 先开始（无 delay），Y+opacity 后开始（delay） */
.grid-page-enter-active {
  transition: transform 2000ms cubic-bezier(0.16, 1, 0.3, 1) 320ms;
}
.grid-page-enter-active .grid {
  transition:
    transform 2000ms cubic-bezier(0.16, 1, 0.3, 1) 420ms,
    opacity 1000ms ease 320ms,
    filter 500ms ease 320ms;
}

/* 离场：快速左移淡出（也可以同样拆分，通常不必） */
.grid-page-leave-active {
  transition:
    transform 500ms ease,
    opacity 180ms ease;
}
.grid-page-leave-from {
  opacity: 1;
}
.grid-page-leave-to {
  opacity: 0;
  transform: translate3d(-22px, 0, 0);
}
</style>
