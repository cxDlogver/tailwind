<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const rootEl = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const email = ref('')
const isSubmitting = ref(false)

const isEmailValid = computed(() => {
  // 轻量校验：满足常见邮箱格式即可
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
})

function onSubmit() {
  if (!isEmailValid.value || isSubmitting.value) return
  isSubmitting.value = true

  // 这里先做占位：你后续可以换成 $fetch('/api/subscribe', { method:'POST', body:{ email }})
  // 为避免“假成功提示”，这里只做状态复位
  setTimeout(() => {
    isSubmitting.value = false
  }, 600)
}

let io: IntersectionObserver | null = null

onMounted(() => {
  if (!rootEl.value) return

  io = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting) {
        isVisible.value = true
        // once: true
        io?.disconnect()
        io = null
      }
    },
    { threshold: 0.15 },
  )

  io.observe(rootEl.value)
})

onBeforeUnmount(() => {
  io?.disconnect()
  io = null
})
</script>

<template>
  <div ref="rootEl" class="mx-auto w-full max-w-lg" :class="isVisible ? 'enter-to' : 'enter-from'">
    <div class="mb-4 px-2 text-left">
      <label
        class="text-primary font-mono text-[10px] font-bold tracking-[0.4em] uppercase select-none"
      >
        Terminal Subscription / 订阅情报
      </label>
    </div>

    <div class="group relative">
      <input
        v-model.trim="email"
        type="email"
        inputmode="email"
        autocomplete="email"
        placeholder="输入邮箱地址，获取行业研报"
        class="border-surface-muted w-full rounded-t-3xl border-b-2 bg-white px-8 py-6 text-lg font-light text-[#333333] shadow-[0_4px_10px_rgba(0,0,0,0.01)] transition-all duration-500 placeholder:text-[#BBBBBB] focus:border-[#3B7073] focus:bg-[#F9F9F9] focus:outline-none"
        @keydown.enter.prevent="onSubmit"
      />

      <button
        type="button"
        class="bg-primary shadow-primary/20 absolute top-1/2 right-5 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-center text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        :disabled="!isEmailValid || isSubmitting"
        aria-label="Subscribe"
        @click="onSubmit"
      >
        <Icon name="i-lucide-send" class="size-5" />
      </button>
    </div>

    <div class="mt-6 flex items-center justify-between px-4">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="bg-primary h-2 w-2 rounded-full"></div>
          <div
            class="bg-primary absolute inset-0 h-2 w-2 animate-ping rounded-full opacity-75"
          ></div>
        </div>
        <span
          class="text-text-secondary font-mono text-[10px] font-bold tracking-[0.2em] uppercase"
        >
          Linkage: Secured
        </span>
      </div>

      <div class="flex items-center gap-2">
        <div class="bg-primary/50 h-px w-10"></div>
        <span class="text-placeholder font-mono text-[10px] tracking-[0.3em] uppercase italic">
          Protocols v4.0
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 等价 motion: initial {opacity:0,y:20} -> inView {opacity:1,y:0} */
.enter-from {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 800ms ease,
    transform 800ms ease;
  will-change: opacity, transform;
}
.enter-to {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 800ms ease,
    transform 800ms ease;
  will-change: opacity, transform;
}
</style>
