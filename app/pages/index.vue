<script setup lang="ts">
const { siteUrl } = useSiteSeo()

useSeoMeta({
  title: '缔零科技 - 智能内容安全解决方案',
  description:
    '缔零科技提供一站式多模态全风险域内容审查平台，助力企业构建安全、合规的数字环境。了解我们的产品矩阵和合作伙伴，加入我们，共创安全未来。',
  ogTitle: '缔零科技 - 智能内容安全解决方案',
  ogDescription:
    '缔零科技提供一站式多模态全风险域内容审查平台，助力企业构建安全、合规的数字环境。了解我们的产品矩阵和合作伙伴，加入我们，共创安全未来。',
  ogUrl: `${siteUrl}/`,
  ogType: 'website',
})
</script>

<template>
  <div>
    <section class="pb-6">
      <IndexHero />
    </section>
    <div class="main-card">
      <section class="section-card">
        <div class="flex flex-col items-center space-y-10 text-center">
          <div
            class="inline-flex items-center rounded-full border border-[#DDDDDD] bg-white px-6 py-2 font-mono text-[10px] tracking-[0.3em] text-[#3B7073] uppercase shadow-sm transition-all hover:border-[#3B7073]/40"
          >
            <span class="mr-3 h-2 w-2 animate-ping rounded-full bg-[#3B7073]" />
            System Active • Release v8.2
          </div>
          <h1 class="text-5xl leading-[0.9] font-bold tracking-tighter text-[#333333] md:text-8xl">
            缔零科技
            <div class="bg-primary mt-2 block bg-clip-text text-transparent">智能内容安全</div>
          </h1>
          <div>
            <p class="text-neutral-text2 max-w-2xl text-xl leading-relaxed font-medium">
              一站式多模态全风险域内容审查平台
            </p>
            <p class="text-primary/50 text-10 max-w-2xl font-mono leading-relaxed font-bold">
              One-stop Multi-modal Full-risk Domain Content Audit Platform
            </p>
          </div>
        </div>
      </section>
    </div>
    <div class="main-card">
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
      <!-- =========================
         产品矩阵
         ========================= -->
      <section class="section-card">
        <IndexProductMatrixSection />
      </section>
    </div>

    <!-- =========================
         合作伙伴
         ========================= -->
    <section class="section-card">
      <IndexPartnersSection />
    </section>
  </div>
</template>

<style scoped>
@keyframes glossSweep {
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(120%);
  }
}

.animate-gloss-sweep {
  animation: glossSweep 5s ease-in-out infinite;
}
</style>
