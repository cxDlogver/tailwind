<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('flameCanvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 300
  canvas.height = 400

  const particles = []

  // 生成随机的火焰粒子
  function createFlame() {
    const particle = {
      x: canvas.width / 2,
      y: canvas.height,
      size: Math.random() * 5 + 2,
      speed: Math.random() * 1 + 2,
      direction: Math.random() * 2 - 1, // 随机水平方向
      color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 0, 1)`, // 随机颜色
    }
    particles.push(particle)
  }

  // 更新火焰粒子的位置
  function updateFlame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // 清除上帧内容

    particles.forEach((particle, index) => {
      particle.y -= particle.speed
      particle.x += particle.direction * 0.3
      particle.size *= 0.98 // 逐渐缩小
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()
      ctx.closePath()

      if (particle.size < 0.2) {
        particles.splice(index, 1) // 去掉消失的粒子
      }
    })
  }

  // 动画循环
  function animate() {
    createFlame()
    updateFlame()
    requestAnimationFrame(animate) // 继续下一帧
  }

  // 启动动画
  animate()
})
</script>

<template>
  <div>
    <div class="main-card p-top">
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
        </div>
      </section>
    </div>
    <!-- <div
      class="test relative aspect-2/1 h-50 w-full overflow-hidden rounded-2xl border border-white/10 bg-black"
    >
      <Transition name="reveal-in-out" appear>
        <IndexEnergyFlowDemo
          v-if="show"
          src="/images/energy-flow.gif"
          :duration-ms="1000"
          :center-pct="35"
          :slit-width-pct="1"
          fit="contain"
        />
      </Transition>
    </div> -->
    <section class="px-36 pb-6">
      <IndexCelestialAuditCard />
    </section>

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
        <LazyIndexProductMatrixSection hydrate-on-visible />
      </section>
    </div>

    <!-- =========================
         合作伙伴
         ========================= -->
    <section class="section-card">
      <LazyIndexPartnersSection hydrate-on-visible />
    </section>
    <canvas id="flameCanvas"></canvas>

    <!-- =========================
         订阅我们的动态
         ========================= -->
    <div class="main-card p-bottom">
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

.test {
  /* background:
    radial-gradient(1% 60%, #fff 0%, #4600ff00 80%),
    radial-gradient(10% 60%, #fff, #4600ff1a 20%, #4600ff00 100%),
    radial-gradient(8% 50%, #fff, #4600ff66 20%, #4600ff00 100%); */
  /* background:
    radial-gradient(10% 100%, #fff, #fff0 40%), radial-gradient(1% 45%, #fff 60%, #4600ff00 100%),
    radial-gradient(10% 40%, #4600ff99 50%, #4600ff00 100%),
    radial-gradient(20% 50%, #fff 2%, #6432e633 50%, #6432e600 100%),
    radial-gradient(30% 50%, #fff 0%, #6432e6 10%, #6432e600 100%); */
  background: linear-gradient(90deg, #fff, #6432e6 20%, #6432e600);
}
</style>
