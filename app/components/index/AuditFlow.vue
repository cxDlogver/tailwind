<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

type DataType = 'image' | 'video' | 'audio' | 'text' | 'file'
type DecisionType = '放行' | '复核' | '限流' | '禁止' | '罚款' | '通报'
type AssociationType = '常规用户' | '违法团伙' | '商业投毒' | '异常账号'

type AuditItem = {
  id: string
  type: DataType
  label: string
  category: string
  association: AssociationType
  decision: DecisionType
  color: string
  icon: string
  score: number
}

const AUDIT_DATA: AuditItem[] = [
  {
    id: '001',
    type: 'image',
    label: 'IMG_772.raw',
    category: '涉政',
    association: '违法团伙',
    decision: '禁止',
    color: 'rose',
    icon: '⚖️',
    score: 98,
  },
  {
    id: '002',
    type: 'video',
    label: 'LIVE_STREAM.mp4',
    category: '违法',
    association: '商业投毒',
    decision: '罚款',
    color: 'red',
    icon: '🚫',
    score: 92,
  },
  {
    id: '003',
    type: 'audio',
    label: 'VOIP_RECORD.wav',
    category: '色情',
    association: '违法团伙',
    decision: '通报',
    color: 'purple',
    icon: '🔞',
    score: 85,
  },
  {
    id: '004',
    type: 'text',
    label: 'CHAT_LOG.txt',
    category: '专项',
    association: '异常账号',
    decision: '复核',
    color: 'amber',
    icon: '⚠️',
    score: 64,
  },
  {
    id: '005',
    type: 'file',
    label: 'DATA_PACK.zip',
    category: '正常',
    association: '常规用户',
    decision: '放行',
    color: 'emerald',
    icon: '✅',
    score: 5,
  },
]

const activeIndex = ref(0)
let timer: any = null

onMounted(() => {
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % AUDIT_DATA.length
  }, 5500)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="relative flex h-full w-full flex-col overflow-hidden">
    <!-- main -->
    <IndexReasoningEngine :item="AUDIT_DATA[activeIndex]" />
  </div>
</template>

<style scoped>
@keyframes progress-flow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
.animate-progress-flow {
  background: linear-gradient(90deg, #3b82f6, #818cf8, #3b82f6);
  background-size: 200% 100%;
  animation: progress-flow 3s linear infinite;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
