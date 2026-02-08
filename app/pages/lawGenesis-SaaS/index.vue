<!-- pages/index.vue -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const scrollY = ref(0)

const handleScroll = () => {
  scrollY.value = window.scrollY || 0
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="relative min-h-screen overflow-x-hidden bg-[#F9F9F9] selection:bg-[#3B7073]/20 selection:text-[#3B7073]"
  >
    <main>
      <SaaSHero :scroll-y="scrollY" />
      <SaaSValueProp />
      <SaaSCapabilityMatrix />
      <SaaSTechArchitecture />
      <SaaSPerformanceChart />
      <SaaSAppScenarios />
    </main>
  </div>
</template>
