<script setup lang="ts">
import { computed } from 'vue'

type Job = {
  id: string
  title: string
  location: string
  category: string
  type: string
}

const router = useRouter()

/** 组件内数据（可直接跑）；你有真实 constants 时替换为 import */
const RECENT_JOBS: Job[] = [
  {
    id: 'job-001',
    title: '前端开发工程师（Nuxt）',
    location: '深圳 · 南山',
    category: 'Engineering',
    type: 'Full-time',
  },
  {
    id: 'job-002',
    title: '安全研究员（AI 安全）',
    location: '武汉 · 光谷',
    category: 'Engineering',
    type: 'Full-time',
  },
  { id: 'job-003', title: '体验设计实习生', location: '北京', category: 'Design', type: '实习' },
  {
    id: 'job-004',
    title: '产品经理（合规）',
    location: '上海',
    category: 'Product',
    type: 'Full-time',
  },
  {
    id: 'job-005',
    title: '内容合规运营（AIGC）',
    location: '远程 / 混合',
    category: 'Content',
    type: 'Full-time',
  },
]

const categoryMap: Record<string, string> = {
  Engineering: '技术研发',
  Product: '产品管理',
  Design: '体验设计',
  Marketing: '市场营销',
  Content: '内容运营',
}

const props = withDefaults(
  defineProps<{
    jobId?: string | null
    onBack?: () => void
    onGoHome?: () => void
    onHowWeHireClick?: () => void
  }>(),
  { jobId: 'job-001' },
)

const job = computed(() => RECENT_JOBS.find((j) => j.id === props.jobId) || null)

const relatedJobs = computed(() => {
  if (!job.value) return []
  return RECENT_JOBS.filter(
    (j) => j.id !== job.value!.id && j.category === job.value!.category,
  ).slice(0, 2)
})

function back() {
  if (props.onBack) return props.onBack()
  if (import.meta.client && window.history.length > 1) router.back()
  else router.push('/join/jobs')
  if (import.meta.client) window.scrollTo(0, 0)
}

function goHome() {
  if (props.onGoHome) return props.onGoHome()
  router.push('/join')
  if (import.meta.client) window.scrollTo(0, 0)
}

function howWeHire() {
  if (props.onHowWeHireClick) return props.onHowWeHireClick()
  router.push('/join/how-we-hire')
  if (import.meta.client) window.scrollTo(0, 0)
}

function shareJob() {
  if (!job.value) return
  const url = import.meta.client ? window.location.href : ''
  const text = `职位：${job.value.title}`

  // Web Share API（有则用）
  if (import.meta.client && (navigator as any).share) {
    ;(navigator as any).share({ title: job.value.title, text, url }).catch(() => {})
    return
  }

  // fallback：复制链接
  if (import.meta.client && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(url).catch(() => {})
  }
}
</script>

<template>
  <div v-if="job" class="p-top min-h-screen pb-32">
    <!-- Detail Hero -->
    <div class="bg-neutral-text1 relative overflow-hidden py-20 text-white">
      <div class="bg-primary/10 absolute top-0 right-0 h-full w-1/3 translate-x-1/2 skew-x-12" />

      <div class="relative z-10 container mx-auto px-6">
        <button
          type="button"
          class="mb-12 flex items-center gap-2 font-bold text-white/60 transition-colors hover:text-white"
          @click="back"
        >
          <Icon name="lucide:chevron-left" class="h-5 w-5" />
          返回职位列表
        </button>

        <div class="max-w-4xl">
          <span
            class="text-support bg-primary mb-6 inline-block rounded-full px-4 py-1 font-black tracking-widest text-white uppercase"
          >
            {{ categoryMap[job.category] || job.category }}
          </span>

          <h1 class="text-h4 mb-8 leading-none font-bold tracking-tighter md:text-[72px]">
            {{ job.title }}
          </h1>

          <div class="flex flex-wrap items-center gap-8 text-white/80">
            <div class="flex items-center gap-2">
              <Icon name="lucide:map-pin" class="text-primary h-5 w-5" />
              <span class="font-bold">{{ job.location }}</span>
            </div>

            <div class="flex items-center gap-2">
              <Icon name="lucide:briefcase" class="text-primary h-5 w-5" />
              <span class="font-bold">{{ job.type }}</span>
            </div>

            <div class="flex items-center gap-2">
              <Icon name="lucide:clock" class="text-primary h-5 w-5" />
              <span class="font-bold">发布于 2天前</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-20 container mx-auto -mt-10 px-6">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <!-- Main Content -->
        <div
          class="border-neutral-divider space-y-16 rounded-[2.5rem] border bg-white p-8 shadow-xl md:p-16 lg:col-span-2"
        >
          <section>
            <h2 class="text-h3 text-neutral-text1 mb-8 flex items-center gap-4 font-bold">
              职位概览
              <div class="bg-neutral-divider h-px flex-1" />
            </h2>

            <p class="text-body text-neutral-text2 mb-6 leading-relaxed">
              作为
              {{
                job.title
              }}，你将加入缔零科技的核心团队，负责重构我们数字化基础设施的关键部分。我们不仅是在维护系统，我们是在为“数字契约”构建最底层的确定性。
            </p>
            <p class="text-body text-neutral-text2 leading-relaxed">
              你将与顶尖的设计师、架构师和产品专家紧密协作。在这里，你的每一行代码都将被赋予“安全原力”，成为改变行业规则的一部分。
            </p>
          </section>

          <section>
            <h2 class="text-h3 text-neutral-text1 mb-8 flex items-center gap-4 font-bold">
              核心职责
              <div class="bg-neutral-divider h-px flex-1" />
            </h2>

            <ul class="space-y-4">
              <li
                v-for="(item, i) in [
                  `负责${job.category}领域的核心模块设计与开发`,
                  '参与制定技术规范与工程最佳实践',
                  '通过高质量的代码审计和重构，确保持续的安全产出',
                  '与跨职能团队合作，将复杂的业务需求转化为优雅的技术方案',
                  '持续关注行业前沿动态，将新技术安全、高效地引入现有生态',
                ]"
                :key="i"
                class="text-body text-neutral-text2 flex gap-4"
              >
                <span class="text-primary font-black">0{{ i + 1 }}.</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-h3 text-neutral-text1 mb-8 flex items-center gap-4 font-bold">
              任职要求
              <div class="bg-neutral-divider h-px flex-1" />
            </h2>

            <ul class="space-y-4">
              <li
                v-for="(item, i) in [
                  '3年以上相关领域实战经验，有大型分布式系统背景者优先',
                  '对技术有极致的追求，信奉代码的确定性与逻辑的美感',
                  '具备极强的解决复杂问题的能力 and 快速学习的能力',
                  '良好的沟通协作能力，认可“一个乐队，没有独奏者”的团队文化',
                  '本科及以上学历，计算机或相关专业背景',
                ]"
                :key="i"
                class="text-body text-neutral-text2 flex gap-4"
              >
                <div class="bg-primary mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8 lg:col-span-1">
          <div class="bg-primary sticky top-32 rounded-[2.5rem] p-10 text-white shadow-2xl">
            <h3 class="text-h2 mb-6 font-bold">感兴趣？</h3>
            <p class="mb-10 font-medium text-white/80">
              如果你已经准备好重构规则，植入确定的安全原力，现在就开始你的申请吧。
            </p>

            <button
              type="button"
              class="text-primary text-h1 mb-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-5 font-black shadow-lg transition-transform hover:scale-105"
              @click="howWeHire"
            >
              立即申请
              <Icon name="lucide:arrow-right" class="h-5 w-5" />
            </button>

            <button
              type="button"
              class="text-body flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 py-5 font-bold text-white transition-all hover:bg-white/20"
              @click="shareJob"
            >
              <Icon name="lucide:share-2" class="h-[18px] w-[18px]" />
              分享此职位
            </button>

            <button
              type="button"
              class="text-support mt-6 w-full font-bold text-white/70 underline underline-offset-8 hover:text-white"
              @click="goHome"
            >
              返回加入我们首页
            </button>
          </div>

          <div class="border-neutral-divider rounded-[2.5rem] border bg-white p-8">
            <h3 class="text-support text-neutral-text3 mb-6 font-black tracking-widest uppercase">
              相关职位
            </h3>

            <div class="space-y-6">
              <button
                v-for="rj in relatedJobs"
                :key="rj.id"
                type="button"
                class="group block w-full text-left"
                @click="router.push(`/join/jobs/${rj.id}`)"
              >
                <h4
                  class="text-neutral-text1 group-hover:text-primary mb-1 font-bold transition-colors"
                >
                  {{ rj.title }}
                </h4>
                <p class="text-support text-neutral-text3">{{ rj.location }}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="p-top pb-24">
    <div class="container mx-auto px-6">
      <div class="border-neutral-divider rounded-3xl border bg-white p-10 text-center">
        <p class="text-neutral-text3 text-h3">未找到该职位</p>
        <button type="button" class="text-primary mt-6 font-bold hover:underline" @click="back">
          返回职位列表
        </button>
      </div>
    </div>
  </div>
</template>
