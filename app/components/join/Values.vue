<script setup lang="ts">
import { computed, ref } from 'vue'

type CoreValue = {
  id: string
  number: string
  title: string
  description: string
  imageUrl: string
}

/** 组件内数据（可直接跑）；你有真实 constants 时可替换为 import */
const CORE_VALUES: CoreValue[] = [
  {
    id: 'v1',
    number: '01',
    title: '薪酬体系：让每一份付出，都换回看得见的公平与尊严',
    description:
      '我们提供极具竞争力的薪酬标准，并建立透明的回报机制，确保你的每一份专业贡献都被清晰计量并赋予对等价值。',
    imageUrl:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'v2',
    number: '02',
    title: '职业成长：构建清晰的晋升航道，在确定性中预见更好的自己',
    description:
      '无论是深耕技术的极客还是统筹全局的领军者，我们提供双轨并行的成长空间与明确的职级对标，让未来清晰可见。',
    imageUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'v3',
    number: '03',
    title: '高效协作：以专业为导向的沟通，极力规避那些无意义的消耗',
    description:
      '我们倡导极简主义的协作文化，通过流程自动化与专业化分工，减少无效会议与沟通成本，让灵感在专注中即刻落地。',
    imageUrl:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'v4',
    number: '04',
    title: '长效激励：共享核心贡献红利，让每一个音符都参与未来合奏',
    description:
      '核心贡献者不仅拥有眼前的激励，更能通过股权与期权计划共享公司的长期发展红利，真正成为事业的合伙人。',
    imageUrl:
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'v5',
    number: '05',
    title: '健康节奏：尊重个人时间的主权，在高效与生活间寻找动态平衡',
    description:
      '我们不崇尚盲目的加班文化，而是通过科学的目标管理确保工作节奏健康合理，全力支持成员探索工作之外的精彩可能。',
    imageUrl:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'v6',
    number: '06',
    title: '团队关系：温暖互助的社区氛围，用一场团建治愈所有技术焦虑',
    description:
      '友好、透明且充满人文关怀的团队环境，结合定期的创意团建活动，让每一个冰冷的技术细节都流淌着人的温度。',
    imageUrl:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
  },
]

const activeIndex = ref(0)

const activeItem = computed(() => CORE_VALUES[activeIndex.value] as CoreValue)
</script>

<template>
  <section class="bg-neutral-bg main-card overflow-hidden py-20">
    <div class="container mx-auto px-6">
      <!-- 顶部标题 -->
      <div class="mb-12 flex flex-col items-center text-center">
        <div
          class="border-primary/20 bg-primary/5 mb-6 inline-flex items-center gap-3 rounded-full border px-5 py-1.5 backdrop-blur-md"
        >
          <Icon name="lucide:heart" class="text-primary h-4 w-4 animate-pulse" />
          <span class="text-primary text-[12px] font-black tracking-[0.4em] uppercase"
            >perks &amp; benefits</span
          >
        </div>

        <h2
          class="text-h2 md:text-h1 text-neutral-text1 font-black tracking-tighter uppercase italic"
        >
          我们如何回馈你的<span class="text-primary">专业</span>
        </h2>
      </div>

      <!-- 主体卡片 -->
      <div
        class="border-neutral-divider flex min-h-150 w-full flex-col overflow-hidden rounded-[3rem] border bg-white shadow-2xl lg:flex-row"
      >
        <!-- 左侧：图片 -->
        <div
          class="bg-neutral-divider relative min-h-87.5 overflow-hidden lg:min-h-full lg:w-[45%]"
        >
          <div
            v-for="(value, index) in CORE_VALUES"
            :key="value.id"
            class="absolute inset-0 transition-all duration-1000 ease-in-out"
            :class="
              index === activeIndex
                ? 'translate-x-0 scale-100 opacity-100'
                : 'translate-x-4 scale-110 opacity-0'
            "
          >
            <img
              :src="value.imageUrl"
              :alt="value.title"
              class="h-full w-full object-cover brightness-90 contrast-110 grayscale"
              loading="lazy"
            />
            <div class="bg-primary/10 absolute inset-0 mix-blend-overlay" />
            <div class="from-primary/40 absolute inset-0 bg-linear-to-tr to-transparent" />
          </div>

          <!-- 悬浮装饰 -->
          <div
            class="absolute top-8 left-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md"
          >
            <Icon name="lucide:sparkles" class="h-5 w-5 text-white" />
          </div>

          <!-- 巨大编号 -->
          <div class="pointer-events-none absolute bottom-4 left-8 overflow-hidden">
            <span
              class="text-[140px] leading-none font-black tracking-tighter text-white/30 italic transition-all duration-700 select-none"
            >
              {{ activeItem.number }}
            </span>
          </div>
        </div>

        <!-- 右侧：列表 -->
        <div class="flex flex-col justify-center space-y-2 p-6 md:p-12 lg:w-[55%]">
          <button
            v-for="(value, index) in CORE_VALUES"
            :key="value.id"
            type="button"
            class="group relative flex flex-col overflow-hidden rounded-2xl p-6 text-left transition-all duration-500"
            :class="
              index === activeIndex
                ? 'bg-primary/20 shadow-sm'
                : 'hover:bg-neutral-bg opacity-70 hover:opacity-100'
            "
            @click="activeIndex = index"
          >
            <div class="relative z-10 flex items-center gap-6">
              <span
                class="text-h3 w-10 font-black italic transition-colors duration-300"
                :class="index === activeIndex ? 'text-primary' : 'text-neutral-text4'"
              >
                {{ value.number }}
              </span>

              <h3
                class="text-h3 font-bold transition-all duration-300"
                :class="index === activeIndex ? 'text-primary translate-x-1' : 'text-neutral-text1'"
              >
                {{ value.title.split('：')[0] }}
              </h3>

              <div
                v-if="index === activeIndex"
                class="bg-primary/20 animate-in slide-in-from-left ml-4 h-0.75 flex-1 duration-700"
              />
            </div>

            <!-- 详情 -->
            <div
              class="overflow-hidden transition-all duration-500 ease-in-out"
              :class="index === activeIndex ? 'mt-6 max-h-60 opacity-100' : 'max-h-0 opacity-0'"
            >
              <p
                class="text-body text-neutral-text2 border-primary/20 ml-5 border-l-4 pl-16 leading-relaxed font-medium"
              >
                {{ value.description }}
              </p>
            </div>

            <!-- 左侧强调条 -->
            <div
              v-if="index === activeIndex"
              class="bg-primary absolute top-0 bottom-0 left-0 w-2"
            />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
