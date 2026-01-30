<template>
  <div class="main-card">
    <section class="section-card">
      <div class="h-[200px] w-[100px]">
        <IndexMediaTypeCard variant="image" />
      </div>
    </section>

    <section class="section-card">
      <div class="flex flex-col items-center space-y-10 text-center">
        <div
          class="inline-flex items-center rounded-full border border-[#DDDDDD] bg-white px-6 py-2 font-mono text-[10px] tracking-[0.3em] text-[#3B7073] uppercase shadow-sm transition-all hover:border-[#3B7073]/40"
        >
          <span class="mr-3 h-2 w-2 animate-ping rounded-full bg-[#3B7073]" />
          System Active • Release v8.2
        </div>

        <h1 class="text-7xl leading-[0.9] font-bold tracking-tighter text-[#333333] md:text-9xl">
          探索
          <span
            class="mt-2 block bg-linear-to-r from-[#3B7073] to-[#6E989B] bg-clip-text text-transparent"
          >
            数字边界
          </span>
        </h1>

        <p class="max-w-2xl text-xl leading-relaxed font-light text-[#666666]">
          超越代码，重塑交互。Lawgenesis 以极简主义重构未来生产力内核，
          将法律与科技的深度感知转化为原生动力。
        </p>

        <div class="flex flex-wrap justify-center gap-6 pt-10">
          <button
            type="button"
            class="group relative overflow-hidden rounded-full bg-[#3B7073] px-14 py-5 font-bold text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(59,112,115,0.3)] active:scale-95"
            @click="console.log('Get Started Clicked')"
          >
            <span class="relative z-10">立即开启</span>
            <div
              class="absolute inset-0 bg-[#518B8E] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </button>

          <button
            type="button"
            class="rounded-full border border-[#DDDDDD] bg-white px-14 py-5 font-bold text-[#666666] transition-all duration-500 hover:border-[#3B7073] hover:text-[#3B7073]"
            @click="console.log('Learn More Clicked')"
          >
            技术文档
          </button>
        </div>
      </div>
    </section>

    <!-- =========================
         产品矩阵
         ========================= -->
    <section class="section-card">
      <LazyIndexProductMatrixSection hydrate-on-visible />
    </section>

    <!-- =========================
         合作伙伴
         ========================= -->
    <section class="section-card">
      <LazyIndexPartnersSection hydrate-on-visible />
    </section>

    <!-- =========================
         订阅我们的动态
         ========================= -->
    <section class="section-card">
      <div class="mb-16 text-center">
        <h2 class="text-4xl font-bold tracking-tight text-[#333333]">订阅我们的动态</h2>
        <p class="mx-auto mt-4 max-w-md leading-relaxed text-[#666666]">
          第一时间获取最新的行业深度报告与前沿技术简报，掌握数字变革的最新情报。
        </p>
      </div>
      <LazyIndexNewsletterSubscription hydrate-on-visible />
    </section>
  </div>
</template>
