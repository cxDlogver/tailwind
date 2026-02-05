<script setup lang="ts">
import { computed } from 'vue'

export type Variant = 'audio' | 'video' | 'image' | 'text' | 'file' | 'allow' | 'prohibit'

const props = withDefaults(
  defineProps<{
    variant: Variant
    /** 品牌主色（默认 #3B7073） */
    brandColor?: string
  }>(),
  {
    brandColor: '#3B7073',
  },
)

/** 主题样式 *
/** 将 hex 转成 "r g b" */
function hexToRgbTriplet(hex?: string) {
  const s = (hex ?? '').trim()

  const m3 = /^#([0-9a-fA-F]{3})$/.exec(s)
  if (m3) {
    const h = m3[1] ?? ''
    const r = parseInt(h.charAt(0) + h.charAt(0), 16)
    const g = parseInt(h.charAt(1) + h.charAt(1), 16)
    const b = parseInt(h.charAt(2) + h.charAt(2), 16)
    return `${r} ${g} ${b}`
  }

  const m6 = /^#([0-9a-fA-F]{6})$/.exec(s)
  if (m6) {
    const h = m6[1] ?? ''
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    return `${r} ${g} ${b}`
  }

  return '59 112 115'
}

const brandTriplet = computed(() => hexToRgbTriplet(props.brandColor))

const rootStyle = computed(() => ({
  '--brand': brandTriplet.value,
}))

const rootCls = computed(() => {
  return [
    'group relative flex h-full w-full flex-col bg-slate-100 border-2 border-slate-300/60',
    'rounded-[2.5rem] overflow-hidden shadow-lg transition-all duration-500',
    'hover:shadow-2xl',
  ].join(' ')
})

const audioBars = ref([5, 8, 4, 9, 6, 7, 3, 8])
</script>

<template>
  <div :class="rootCls" :style="rootStyle">
    <div
      class="relative m-4 flex flex-1 items-center justify-center overflow-hidden rounded-[1.8rem] border border-slate-300 bg-slate-200/50 shadow-inner"
    >
      <!-- AUDIO -->
      <div v-if="variant === 'audio'" class="flex h-full w-full flex-col items-center p-6">
        <div class="relative flex items-center justify-center">
          <div
            class="absolute inset-0 scale-[1.8] animate-pulse rounded-full bg-[rgb(var(--brand)/0.06)]"
          />

          <!-- Rotating Disk Plate -->
          <div
            class="animate-spin-slow relative flex h-24 w-24 items-center justify-center rounded-full bg-[rgb(var(--brand)/1)] shadow-2xl"
          >
            <div class="absolute inset-2 rounded-full border-2 border-dashed border-white/20" />
            <div class="absolute inset-6 rounded-full border border-white/10" />
            <Icon name="lucide:music" class="relative z-10 text-white" size="32" />
            <div class="absolute top-2 right-1/2 h-1 w-1 rounded-full bg-white" />
          </div>
        </div>

        <div class="mt-2 flex h-15 items-end gap-1">
          <div
            v-for="(h, i) in [...audioBars!, ...audioBars!]"
            :key="i"
            class="animate-wave w-1.5 rounded-full bg-[rgb(var(--brand)/1)]"
            :style="{
              height: `${h * 10}%`,
              animationDelay: `${i * 0.05}s`,
              transformOrigin: 'bottom',
            }"
          />
        </div>

        <div class="mt-auto flex w-full items-center justify-between px-4">
          <div class="flex gap-1">
            <div v-for="i in 3" :key="i" class="h-1 w-1 rounded-full bg-[rgb(var(--brand)/0.25)]" />
          </div>
          <Icon name="lucide:activity" class="text-[rgb(var(--brand)/0.40)]" size="12" />
        </div>
      </div>

      <!-- VIDEO -->
      <div
        v-else-if="variant === 'video'"
        class="relative flex h-full w-full flex-col items-center justify-center p-6"
      >
        <div class="absolute top-4 left-4 flex gap-1.5">
          <div class="h-2 w-2 rounded-full bg-[rgb(var(--brand)/0.40)]" />
          <div class="h-2 w-8 rounded-full bg-slate-300" />
        </div>

        <div
          class="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-[2rem] bg-[rgb(var(--brand)/1)] shadow-[0_10px_30px_rgb(var(--brand)/0.18)] shadow-xl transition-transform group-hover:scale-110"
        >
          <div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          <div class="relative z-10">
            <Icon
              name="lucide:play"
              class="fill-white text-white transition-all duration-700 group-hover:scale-0 group-hover:opacity-0"
              size="32"
            />
            <Icon
              name="lucide:pause"
              class="absolute inset-0 scale-0 fill-white text-white opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
              size="32"
            />
          </div>
        </div>

        <!-- Timeline Interface -->
        <div class="mt-8 w-full space-y-2 px-4">
          <div class="flex h-4 items-end justify-between gap-1">
            <div
              v-for="(h, i) in [15, 40, 60, 30, 80, 45, 20, 50]"
              :key="i"
              class="flex-1 rounded-sm bg-slate-300"
              :style="{ height: `${h}%` }"
            />
          </div>

          <div class="relative h-1.5 overflow-hidden rounded-full bg-slate-300">
            <div class="absolute left-0 h-full w-3/4 bg-[rgb(var(--brand)/0.30)]" />
            <div
              class="animate-line-grow h-full w-full origin-left bg-[rgb(var(--brand)/1)] shadow-[0_0_10px_rgb(var(--brand)/0.35)]"
            />
          </div>
        </div>

        <div class="absolute right-4 bottom-4 opacity-30">
          <Icon name="lucide:maximize-2" class="text-[rgb(var(--brand)/1)]" size="16" />
        </div>
      </div>

      <!-- IMAGE -->
      <div
        v-else-if="variant === 'image'"
        class="relative flex h-full w-full items-center justify-center p-4"
      >
        <!-- Viewfinder Corners -->
        <div
          class="absolute top-6 left-6 h-4 w-4 rounded-tl-sm border-t-2 border-l-2 border-[rgb(var(--brand)/0.40)]"
        />
        <div
          class="absolute top-6 right-6 h-4 w-4 rounded-tr-sm border-t-2 border-r-2 border-[rgb(var(--brand)/0.40)]"
        />
        <div
          class="absolute bottom-6 left-6 h-4 w-4 rounded-bl-sm border-b-2 border-l-2 border-[rgb(var(--brand)/0.40)]"
        />
        <div
          class="absolute right-6 bottom-6 h-4 w-4 rounded-br-sm border-r-2 border-b-2 border-[rgb(var(--brand)/0.40)]"
        />

        <div class="animate-float relative z-10 flex flex-col items-center gap-4">
          <div
            class="relative overflow-hidden rounded-[2.5rem] border-2 border-slate-200 bg-white p-8 shadow-2xl"
          >
            <Icon name="lucide:image" class="text-[rgb(var(--brand)/1)]" size="48" />
            <div class="absolute bottom-0 left-0 h-1 w-full bg-[rgb(var(--brand)/0.06)]" />
          </div>
        </div>

        <!-- Side UI elements -->
        <div class="absolute top-1/2 left-8 flex -translate-y-1/2 flex-col gap-2">
          <div
            v-for="i in 4"
            :key="i"
            class="h-1.5 w-1.5 rounded-full bg-[rgb(var(--brand)/0.18)]"
          />
        </div>

        <div class="absolute right-8 bottom-12 flex h-6 items-end gap-0.5">
          <div
            v-for="(h, i) in [3, 6, 4, 8, 2, 5]"
            :key="i"
            class="w-1 rounded-t-sm bg-[rgb(var(--brand)/0.30)]"
            :style="{ height: `${h * 10}%` }"
          />
        </div>

        <!-- Technical Scanning line -->
        <div
          class="animate-scan absolute inset-x-8 h-px bg-[rgb(var(--brand)/1)] shadow-[0_0_10px_rgb(var(--brand)/0.35)]"
        />
      </div>

      <!-- TEXT -->
      <div
        v-else-if="variant === 'text'"
        class="relative flex h-full w-full flex-col justify-center gap-5 p-8"
      >
        <div class="mb-2 flex items-center gap-2">
          <Icon name="lucide:cpu" class="text-[rgb(var(--brand)/0.40)]" size="14" />
          <div class="h-1.5 w-12 rounded-full bg-[rgb(var(--brand)/0.18)]" />
        </div>

        <div class="space-y-3">
          <div
            class="animate-typing h-2 overflow-hidden rounded-full bg-[rgb(var(--brand)/0.40)]"
            style="animation-delay: 0s"
          />
          <div class="flex gap-2">
            <div
              class="animate-typing h-2 flex-2 rounded-full bg-slate-400/20"
              style="animation-delay: 0.2s"
            />
            <div
              class="animate-typing h-2 flex-1 rounded-full bg-[rgb(var(--brand)/0.40)]"
              style="animation-delay: 0.4s"
            />
          </div>
          <div
            class="animate-typing h-2 rounded-full bg-slate-400/20"
            style="animation-delay: 0.6s"
          />
          <div class="flex gap-2">
            <div
              class="animate-typing h-2 flex-1 rounded-full bg-[rgb(var(--brand)/0.40)]"
              style="animation-delay: 0.8s"
            />
            <div
              class="animate-typing h-2 flex-3 rounded-full bg-slate-400/20"
              style="animation-delay: 1s"
            />
          </div>
          <div
            class="animate-typing h-2 rounded-full bg-slate-400/20"
            style="animation-delay: 1.2s"
          />
        </div>

        <div
          class="mt-4 flex items-center justify-between rounded-xl border border-slate-300 bg-white/40 p-3"
        >
          <div class="h-1 w-12 rounded-full bg-[rgb(var(--brand)/0.10)]" />
          <Icon
            name="lucide:refresh-cw"
            class="animate-spin-slow text-[rgb(var(--brand)/0.40)]"
            size="12"
          />
        </div>
      </div>

      <!-- FILE -->
      <div
        v-else-if="variant === 'file'"
        class="animate-bounce-subtle flex h-full w-full flex-col items-center justify-center p-8"
      >
        <div class="relative transition-transform duration-500 group-hover:scale-105">
          <div
            class="absolute -top-2 -left-2 h-20 w-16 rounded-xl border border-slate-400/20 bg-slate-300/40"
          />
          <div
            class="absolute -top-1 -left-1 h-20 w-16 rounded-xl border border-slate-400/30 bg-slate-200/60"
          />

          <div
            class="relative flex h-20 w-16 flex-col gap-2 rounded-xl border-2 border-slate-300 bg-white p-3 shadow-xl"
          >
            <div class="h-1.5 w-full rounded-full bg-[rgb(var(--brand)/0.30)]" />
            <div class="h-1.5 w-full rounded-full bg-slate-200" />
            <div class="h-1.5 w-2/3 rounded-full bg-slate-200" />
            <div class="mt-auto flex justify-center">
              <Icon name="lucide:layers" class="text-slate-300" size="12" />
            </div>
          </div>

          <div
            class="absolute -right-4 -bottom-4 animate-pulse rounded-[1rem] border-2 border-white bg-[rgb(var(--brand)/1)] p-2.5 text-white shadow-[0_10px_24px_rgb(var(--brand)/0.20)] shadow-xl"
          >
            <Icon name="lucide:shield-check" size="20" />
          </div>
        </div>

        <div class="mt-10 flex w-full flex-col items-center gap-2">
          <div class="flex items-center gap-3">
            <Icon
              name="lucide:download"
              class="animate-bounce text-[rgb(var(--brand)/1)]"
              size="16"
            />
            <Icon name="lucide:settings-2" class="animate-spin-slow text-slate-400" size="12" />
          </div>
          <div class="relative h-1.5 w-32 overflow-hidden rounded-full bg-slate-300">
            <div
              class="absolute h-full w-1/2 animate-[scan_1.5s_linear_infinite] bg-[rgb(var(--brand)/0.35)]"
            />
          </div>
        </div>
      </div>

      <!-- ALLOW (放行) -->
      <div
        v-else-if="variant === 'allow'"
        class="relative flex h-full w-full flex-col items-center justify-center p-4"
      >
        <!-- Success Indicators -->
        <div class="absolute top-3 right-3 flex gap-1">
          <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          <div class="h-1.5 w-6 rounded-full bg-[rgb(var(--brand)/0.20)]" />
        </div>

        <div class="relative z-10">
          <!-- Pulsing Concentric Rings -->
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              class="absolute h-28 w-28 animate-ping rounded-full border border-[rgb(var(--brand)/0.20)]"
            />
          </div>

          <!-- Main Entity -->
          <div
            class="relative flex h-24 w-24 items-center justify-center rounded-full bg-[rgb(var(--brand)/1)] shadow-2xl transition-transform group-hover:scale-110"
          >
            <div
              class="animate-spin-slow absolute inset-2 rounded-full border-2 border-dashed border-white/40"
            />
            <Icon
              name="lucide:check"
              size="44"
              class="animate-bounce-subtle stroke-[3.5px] text-white"
            />
            <div
              class="absolute -top-1 -right-1 rounded-full bg-white p-1 text-[rgb(var(--brand)/1)] shadow-md"
            >
              <Icon name="lucide:unlock" size="14" />
            </div>
          </div>
        </div>

        <!-- Bottom Technical Bar -->
        <div class="mt-8 flex flex-col items-center gap-2">
          <div class="flex gap-1.5">
            <div
              v-for="i in 5"
              :key="i"
              class="h-1 w-2.5 animate-pulse rounded-full bg-[rgb(var(--brand)/0.40)]"
              :style="{ animationDelay: `${(i - 1) * 0.15}s` }"
            />
          </div>
          <div class="relative h-1 w-24 overflow-hidden rounded-full bg-[rgb(var(--brand)/0.10)]">
            <div
              class="absolute h-full w-1/3 animate-[scan_2s_linear_infinite] bg-[rgb(var(--brand)/1)]"
            />
          </div>
        </div>
      </div>

      <!-- PROHIBIT (禁止) -->
      <div
        v-else-if="variant === 'prohibit'"
        class="group relative flex h-full w-full flex-col items-center justify-center p-4"
      >
        <!-- Caution Perimeter -->
        <div
          class="animate-spin-slow absolute h-36 w-36 rounded-full border-4 border-[rgb(var(--brand)/0.10)] border-t-[rgb(var(--brand)/0.40)] border-b-[rgb(var(--brand)/0.40)]"
        />
        <div class="absolute top-3 left-3 opacity-20">
          <Icon
            name="lucide:triangle-alert"
            size="24"
            class="animate-pulse text-[rgb(var(--brand)/1)]"
          />
        </div>

        <div class="group relative z-10 flex flex-col items-center">
          <!-- Main Entity -->
          <div
            class="relative flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-slate-300 shadow-xl group-hover:animate-[shake_.5s_ease-in-out_infinite]"
          >
            <div class="absolute inset-0 rounded-[2.5rem] bg-[rgb(var(--brand)/0.10)]" />
            <!-- Internal Glow -->
            <div class="absolute inset-2 animate-pulse rounded-full bg-white/40 opacity-50" />

            <div class="relative flex items-center justify-center">
              <Icon
                name="lucide:shield-alert"
                size="60"
                class="absolute scale-125 text-[rgb(var(--brand)/1)] opacity-10"
              />
              <Icon
                name="lucide:x"
                size="52"
                class="relative z-20 stroke-[5px] text-[rgb(var(--brand))]"
              />
            </div>

            <div
              class="absolute -right-1 -bottom-1 rounded-full bg-[rgb(var(--brand)/1)] p-1 text-white shadow-md"
            >
              <Icon name="lucide:lock" size="14" />
            </div>
          </div>
        </div>

        <!-- Status Monitoring HUD -->
        <div class="absolute right-6 bottom-3 left-6">
          <div class="mb-1.5 flex items-center justify-between opacity-30">
            <Icon
              name="lucide:activity"
              size="12"
              class="animate-pulse text-[rgb(var(--brand)/1)]"
            />
            <Icon name="lucide:tally-5" size="12" class="text-[rgb(var(--brand)/1)]" />
          </div>
          <div class="flex h-2 w-full gap-0.5 overflow-hidden rounded-full bg-slate-300 p-[2px]">
            <div
              v-for="i in 6"
              :key="i"
              class="flex-1 animate-pulse bg-[rgb(var(--brand)/0.40)]"
              :style="{ animationDelay: `${(i - 1) * 0.2}s` }"
            />
          </div>
        </div>

        <!-- Scanning Laser Line -->
        <div
          class="animate-scan absolute inset-x-4 h-px bg-[rgb(var(--brand)/1)] opacity-50 shadow-[0_0_10px_rgb(var(--brand)/0.35)]"
        />
      </div>
    </div>

    <!-- Glass reflection overlay -->
    <div
      class="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/10"
    />
  </div>
</template>

<style scoped>
@layer utilities {
  @keyframes wave {
    0%,
    100% {
      transform: scaleY(0.55);
      opacity: 0.75;
    }
    50% {
      transform: scaleY(1);
      opacity: 1;
    }
  }
  .animate-wave {
    animation: wave 1.2s ease-in-out infinite;
  }

  @keyframes spinSlow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin-slow {
    animation: spinSlow 6s linear infinite;
  }

  @keyframes lineGrow {
    0% {
      transform: scaleX(0.05);
      opacity: 0.55;
    }
    60% {
      transform: scaleX(1);
      opacity: 1;
    }
    100% {
      transform: scaleX(1);
      opacity: 0.9;
    }
  }
  .animate-line-grow {
    animation: lineGrow 1.6s ease-in-out infinite;
  }

  @keyframes scan {
    0% {
      transform: translateY(20%);
      opacity: 0;
    }
    15% {
      opacity: 0.7;
    }
    50% {
      transform: translateY(50%);
      opacity: 1;
    }
    85% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(80%);
      opacity: 0;
    }
  }
  .animate-scan {
    animation: scan 1.8s linear infinite;
  }

  @keyframes floaty {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-6px);
    }
  }
  .animate-float {
    animation: floaty 2.4s ease-in-out infinite;
  }

  @keyframes typing {
    0% {
      width: 0%;
      opacity: 0.35;
    }
    55% {
      width: 100%;
      opacity: 1;
    }
    100% {
      width: 100%;
      opacity: 0.9;
    }
  }
  .animate-typing {
    overflow: hidden;
    animation: typing 1.6s ease-in-out infinite;
  }

  @keyframes bounceSubtle {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-4px);
    }
  }
  .animate-bounce-subtle {
    animation: bounceSubtle 2.2s ease-in-out infinite;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0px) rotate(0deg);
    }
    25% {
      transform: translateX(-2px) rotate(-1deg);
    }
    50% {
      transform: translateX(2px) rotate(1deg);
    }
    75% {
      transform: translateX(-2px) rotate(-1deg);
    }
  }
}
</style>
