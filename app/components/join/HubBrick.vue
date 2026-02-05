<!-- components/join/HubBrick.vue -->
<script setup lang="ts">
defineProps<{
  name: string
  en: string
  image: string
}>()
</script>

<template>
  <div
    class="bg-neutral-bg border-primary relative mx-3 flex h-[180px] w-[320px] flex-shrink-0 items-center overflow-hidden rounded-[2rem] border-[2px] shadow-sm md:h-[230px] md:w-[420px]"
  >
    <!-- 图片 -->
    <div class="border-primary h-full w-[42%] overflow-hidden border-r-[2px]">
      <img
        :src="image"
        :alt="name"
        class="h-full w-full object-cover brightness-90 grayscale"
        loading="lazy"
      />
    </div>

    <!-- 文案 -->
    <div class="relative flex w-[58%] flex-col justify-center bg-transparent p-6 md:p-8">
      <div class="flex flex-col">
        <span
          class="mb-1.5 text-[28px] leading-none font-black tracking-tighter text-black uppercase md:text-4xl"
        >
          {{ en }}
        </span>

        <div class="flex items-center gap-3">
          <div class="bg-primary h-[3px] w-8" />
          <span class="text-[18px] font-bold tracking-tight text-black md:text-[20px]">
            {{ name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
