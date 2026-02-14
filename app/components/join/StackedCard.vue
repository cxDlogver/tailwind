<script setup lang="ts">
import type { PropType } from 'vue'

type Job = {
  slug: string
  title: string
  base?: Array<string>
}

const props = defineProps({
  job: { type: Object as PropType<Job>, required: true },
  image: { type: String, required: true },
  index: { type: Number, required: true },
})

const cardTransform = computed(() => {
  const yOffset = props.index % 2 === 0 ? 'translateY(-20px)' : 'translateY(20px)'
  const rotateOffset = props.index % 2 === 0 ? 'rotate(1deg)' : 'rotate(-1deg)'
  return `${yOffset} ${rotateOffset}`
})

async function handleApplyClick(e: MouseEvent) {
  e.stopPropagation()
  // 获取单个岗位的申请信息
  navigateTo(`/jobs/${props.job.slug}`)
  // navigateTo(`/jobs/${data.value?.slug}`)
}
</script>

<template>
  <div class="w-70">
    <div
      class="group perspective-lg relative z-10 h-105 w-70 shrink-0 pt-10 pb-10 transition-all duration-500 first:ml-0 hover:z-50 md:h-135 md:w-80"
      :style="{ transform: cardTransform }"
    >
      <div
        class="preserve-3d relative h-full w-full rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.35)] transition-transform duration-700 group-hover:transform-[rotateY(180deg)]"
      >
        <!-- 正面 -->
        <div
          class="bg-neutral-divider absolute inset-0 flex flex-col items-center overflow-hidden rounded-[3rem] border border-white/50 p-8 backface-hidden"
        >
          <div
            class="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 transition-transform duration-700 group-hover:scale-125"
          />

          <div class="flex w-full grow items-center justify-center pt-4 pb-24">
            <Icon
              :name="image"
              class="h-full w-full brightness-95 transition-all duration-500 group-hover:scale-110 group-hover:brightness-100"
            />
          </div>

          <div class="absolute bottom-10 left-10 text-left">
            <div
              class="mb-3 inline-block rounded-full border border-white/30 bg-white/20 px-4 py-2 backdrop-blur-md"
            >
              <span class="text-neutral-text1 text-[10px] font-black tracking-[0.3em] uppercase">
                Join the Band
              </span>
            </div>
            <h4 class="text-neutral-text2 text-h2 tracking-tighter uppercase italic opacity-80">
              Leading Force
            </h4>
          </div>
        </div>

        <!-- 背面 -->
        <div
          class="bg-primary absolute inset-0 flex transform-[rotateY(180deg)] flex-col justify-between overflow-hidden rounded-[3rem] border border-white/10 p-10 text-white shadow-[0_40px_100px_rgba(59,112,115,0.6)] backface-hidden"
        >
          <div class="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

          <div class="relative z-10">
            <span
              class="text-support mb-6 block font-black tracking-[0.3em] text-white/60 uppercase italic"
            >
              Current Opening
            </span>

            <h3 class="text-h2 md:text-h3 mb-4 leading-tight font-black tracking-tight">
              {{ job.title }}
            </h3>

            <div class="mb-4 flex items-center gap-2 font-bold text-white/80">
              <Icon name="lucide:map-pin" class="text-primary-hover h-4.5 w-4.5" />
              <span class="text-body">{{ job.base?.join(' / ') || '面议' }}</span>
            </div>
          </div>

          <div class="relative z-10 space-y-4">
            <p class="text-support leading-relaxed font-medium text-white/70">
              在这里，每个人都是乐谱中不可或缺的音符。我们期待你的加入，共同谱写数字契约的未来。
            </p>

            <button
              type="button"
              class="text-primary text-body hover:bg-neutral-bg flex w-full transform items-center justify-center gap-3 rounded-2xl bg-white py-5 font-black shadow-xl transition-all active:scale-95"
              @click="handleApplyClick"
            >
              立即申请
              <Icon name="lucide:arrow-right" class="h-5.5 w-5.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 3D 必要类：如果你已全局定义可移除 */
.perspective-lg {
  perspective: 1200px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
</style>
