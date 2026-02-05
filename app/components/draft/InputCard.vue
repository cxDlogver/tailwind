<script setup lang="ts">
type DataType = 'image' | 'video' | 'audio' | 'text' | 'file'

const props = defineProps<{
  item: {
    id: string
    type: DataType
    label: string
  }
  isActive: boolean
}>()

const typeEmoji = (t: DataType) => {
  if (t === 'image') return '🖼️'
  if (t === 'video') return '📹'
  if (t === 'audio') return '🎙️'
  if (t === 'text') return '📄'
  return '📦'
}
</script>

<template>
  <div
    class="relative flex h-24 w-full items-center gap-4 rounded-2xl border-2 bg-slate-900/50 p-4 transition-all duration-500"
    :class="
      isActive
        ? 'z-10 scale-105 border-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.3)]'
        : 'border-white/5 opacity-60'
    "
  >
    <div
      class="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl"
    >
      {{ typeEmoji(item.type) }}
    </div>

    <div class="flex flex-col overflow-hidden">
      <span class="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
        {{ item.type }} source
      </span>
      <span class="truncate text-sm font-black text-white">{{ item.label }}</span>
    </div>

    <div v-if="isActive" class="absolute right-4 h-2 w-2 animate-ping rounded-full bg-blue-400" />
  </div>
</template>
