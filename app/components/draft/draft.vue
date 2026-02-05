<template>
  <div
    class="group border-cyan-500/30px-6 relative flex h-80 w-full items-center overflow-hidden –transition-all duration-700"
  >
    <!-- Starry Layer -->
    <div class="pointer-events-none absolute inset-0">
      <!-- Nebulas (星云效果) -->
      <div
        class="absolute top-[-20%] left-[-10%] h-64 w-64 animate-pulse bg-purple-600/10 blur-[80px]"
      />
      <div
        class="absolute right-[-10%] bottom-[-20%] h-64 w-64 animate-pulse bg-cyan-600/10 blur-[80px]"
        style="animation-delay: 1s"
      />

      <!-- Twinkling Stars -->
      <div class="pointer-events-none absolute inset-0">
        <div
          v-for="(s, i) in stars"
          :key="i"
          class="animate-twinkle absolute rounded-full bg-white opacity-0"
          :style="{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: s.delay,
            boxShadow: s.size > 2 ? '0 0 4px #fff' : 'none',
          }"
        />
      </div>
    </div>

    <!-- Scanning Line Effect  -->
    <div
      class="animate-scan-line absolute top-0 left-0 z-20 h-0.5 w-full bg-linear-to-r from-transparent via-cyan-400 to-transparent"
    />

    <!-- Outer Border Glow -->
    <div
      class="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-cyan-400/50"
    />

    <div class="h-40 w-20 md:w-25">
      <IndexMediaTypeCard variant="image" />
    </div>
    <div class="h-40 w-20 md:w-25">
      <IndexMediaTypeCard variant="video" />
    </div>
    <div class="h-40 w-20 md:w-25">
      <IndexMediaTypeCard variant="audio" />
    </div>

    <div class="h-40 w-20 md:w-25">
      <IndexMediaTypeCard variant="text" />
    </div>
    <div class="h-40 w-20 md:w-25">
      <IndexMediaTypeCard variant="file" />
    </div>
    <div class="h-full w-20 md:w-25">
      <IndexNeuralBrain />
    </div>

    <div class="h-40 w-20 md:w-25">
      <IndexMediaTypeCard variant="structured" />
    </div>
    <div class="h-full w-20 md:w-25">
      <IndexNeuralBrain />
    </div>

    <div class="mx-6 h-40 w-20 md:w-50">
      <IndexRecallTypeCard :card-index="0" />
    </div>
    <div class="absolute top-0 right-0">
      <IndexAuditFlow class="flow-target" />
    </div>
    <div class="h-[99%] w-30">
      <IndexEnergyFlowDemo src="/images/energy-flow.gif" />
    </div>
  </div>
</template>

<script setup>
const stars = ref(
  Array.from({ length: 40 }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    size: Math.random() * 2 + 1,
  })),
)
</script>

<style scoped>
@keyframes glossSweep {
  0% {
    transform: translateX(-120%);
  }
  100% {
    transform: translateX(120%);
  }
}

@keyframes twinkle {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.animate-twinkle {
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes scanLine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-scan-line {
  animation: scanLine 3s linear infinite;
}
</style>
