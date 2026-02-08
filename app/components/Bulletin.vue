<template>
  <div class="bg-primary fixed top-0 left-0 z-1000 w-full overflow-hidden shadow-md">
    <div class="relative mx-auto flex max-w-screen-2xl items-center justify-center px-8 py-3">
      <div class="flex items-center gap-4">
        <p class="text-sm font-medium tracking-wider text-white md:text-base">
          读CEO给合作伙伴最新的
          <button
            class="mx-1.5 font-bold text-white underline decoration-white/40 decoration-2 underline-offset-4 transition-all hover:text-white/80"
            @click="navigateTo('/news')"
          >
            一封信
          </button>
        </p>
      </div>
      <button
        class="absolute right-8 rounded-full p-2 text-white/60 transition-all hover:bg-white/10 hover:text-white"
        @click="emit('close')"
      >
        <Icon name="close" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
