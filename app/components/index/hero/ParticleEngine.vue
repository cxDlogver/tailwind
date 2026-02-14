<!-- components/ParticleEngine.vue -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  char: string | null // 20% 概率显示字符
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const particles = ref<Particle[]>([])
const numParticles = computed(() => (window.innerWidth > 768 ? 300 : 100)) // 大屏 300 粒，小屏 150 粒

let rafId: number | null = null

function alphaToHex(alpha: number) {
  const a = Math.max(0, Math.min(1, alpha))
  return Math.floor(a * 255)
    .toString(16)
    .padStart(2, '0')
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
  }

  window.addEventListener('resize', resize)
  resize()

  const chars = '01010101ABCDEF'.split('')

  const createParticle = (): Particle => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: 1.5 + Math.random() * 4,
    vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 2 + 1,
    alpha: Math.random() * 0.4 + 0.1,
    char: Math.random() > 0.8 ? (chars[Math.floor(Math.random() * chars.length)] as string) : null,
  })

  // 初始化 300 粒子
  particles.value = []
  for (let i = 0; i < numParticles.value; i++) {
    particles.value.push(createParticle())
  }

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const p of particles.value) {
      p.x += p.vx
      p.y += p.vy

      if (p.x > canvas.width + 50) {
        p.x = -50
        p.y = Math.random() * canvas.height
      }

      ctx.fillStyle = `#3B7073${alphaToHex(p.alpha)}`

      if (p.char) {
        ctx.font = `${p.size * 5}px JetBrains Mono`
        ctx.fillText(p.char, p.x, p.y)
      } else {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    rafId = requestAnimationFrame(render)
  }

  render()

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    if (rafId != null) cancelAnimationFrame(rafId)
    rafId = null
  })
})
</script>

<template>
  <canvas ref="canvasRef" class="pointer-events-none absolute inset-0 z-0 h-full w-full" />
</template>
