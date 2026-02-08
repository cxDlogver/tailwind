<!-- components/ValueProp.vue -->
<script setup lang="ts"></script>

<template>
  <section class="border-t border-gray-100 bg-[#FFFFFF] py-24">
    <div class="mx-auto max-w-[1440px] px-8 md:px-16">
      <div class="relative grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-0">
        <!-- Vertical Separator -->
        <div
          class="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-gray-200 md:block"
        ></div>

        <!-- Left Column -->
        <div class="py-10 md:pr-20">
          <div class="mb-6 text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
            Status Quo
          </div>
          <h3 class="mb-6 text-2xl font-bold text-gray-400">传统治理架构</h3>
          <p class="text-xl leading-relaxed font-light text-gray-500">
            “在日益严峻的监管尺度与对抗性内容面前，效率与精度的矛盾已达极限。”
          </p>
          <div class="mt-8 flex items-baseline space-x-2">
            <span class="text-4xl font-bold tracking-tighter text-gray-300">FAILURE</span>
            <div class="h-px w-12 bg-gray-200"></div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="py-10 md:pl-20">
          <div class="mb-6 text-[10px] font-bold tracking-[0.3em] text-[#3B7073] uppercase">
            Breakthrough
          </div>
          <h3 class="mb-6 text-2xl font-bold text-black">缔零法则</h3>
          <p class="text-xl leading-relaxed font-light text-black">
            “将多年 R&amp;D 经验转化为智能平台，灵活对齐您的自然语言规则与监管需求。”
          </p>
          <div class="mt-8 flex items-baseline space-x-2">
            <span class="text-4xl font-bold tracking-tighter text-[#3B7073]">EVOLUTION</span>
            <div class="h-px w-12 bg-[#3B7073]"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
