<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
  color: string
  history: { x: number; y: number }[]
}

let ctx: CanvasRenderingContext2D | null = null
let rafId: number | null = null
let particles: Particle[] = []

// 裂隙扩展（0~1）
let riftExpansion = 0

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function createParticle(h: number): Particle {
  const x = window.innerWidth * 0.2
  const y = Math.random() * h

  const speed = 3 + Math.random() * 12
  const angle = (Math.random() - 0.5) * 0.4

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1,
    size: 1.5 + Math.random() * 4,
    color: `hsla(${200 + Math.random() * 80}, 100%, 80%, 1)`,
    history: [],
  }
}

function drawRift(width: number, height: number) {
  if (!ctx) return

  const riftX = width * 0.2
  const riftWidth = Math.min(80, riftExpansion * 80)

  // 外层辉光
  ctx.save()
  const gradient = ctx.createLinearGradient(riftX - riftWidth, 0, riftX + riftWidth, 0)
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
  gradient.addColorStop(0.3, 'rgba(100, 180, 255, 0.6)')
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.7, 'rgba(100, 180, 255, 0.6)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

  ctx.fillStyle = gradient
  ctx.shadowBlur = 40
  ctx.shadowColor = 'rgba(100, 200, 255, 0.8)'
  ctx.fillRect(riftX - riftWidth, 0, riftWidth * 2, height)
  ctx.restore()

  // 内部“暗核”
  ctx.save()
  const coreGradient = ctx.createLinearGradient(
    riftX - riftWidth * 0.6,
    0,
    riftX + riftWidth * 0.2,
    0,
  )
  coreGradient.addColorStop(0, 'black')
  coreGradient.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = coreGradient
  ctx.fillRect(riftX - riftWidth * 0.6, 0, riftWidth * 0.7, height)
  ctx.restore()
}

function drawParticles(width: number, height: number) {
  if (!ctx) return

  // 每帧喷发粒子（你要更猛就把 6 调大）
  const burstSize = 20
  for (let i = 0; i < burstSize; i++) particles.push(createParticle(height))

  // additive blending
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'

  for (const p of particles) {
    // 记录尾迹
    p.history.push({ x: p.x, y: p.y })
    if (p.history.length > 1) p.history.shift()

    // 更新位置
    p.x += p.vx
    p.y += p.vy
    p.life -= 0.03

    // 尾迹
    if (p.history.length > 1) {
      ctx.beginPath()
      ctx.lineWidth = p.size * 0.8
      ctx.lineCap = 'round'
      ctx.moveTo(p.history[0].x, p.history[0].y)
      for (let i = 1; i < p.history.length; i++) ctx.lineTo(p.history[i].x, p.history[i].y)
      ctx.strokeStyle = p.color.replace('1)', `${p.life * 0.4})`)
      ctx.stroke()
    }

    // 光点头部
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = p.color.replace('1)', `${p.life})`)
    ctx.shadowBlur = 15
    ctx.shadowColor = p.color
    ctx.fill()

    // 更亮的中心核
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${p.life})`
    ctx.fill()
  }

  ctx.restore()

  // 限制粒子数量，避免无限增长
  if (particles.length > 1500) particles = particles.slice(-1500)
  particles = particles.filter((p) => p.life > 0 && p.x < width + 5)
}

function frame() {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  // 背景清空
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 裂隙展开（开场动画）
  if (riftExpansion < 1) riftExpansion = Math.min(1, riftExpansion + 0.005)

  // 画裂隙 + 粒子
  drawRift(canvas.width, canvas.height)
  drawParticles(canvas.width, canvas.height)

  rafId = window.requestAnimationFrame(frame)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  // alpha:false 更快（少一次透明混合）
  ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) return

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  rafId = window.requestAnimationFrame(frame)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (rafId) window.cancelAnimationFrame(rafId)
  rafId = null
  ctx = null
  particles = []
  riftExpansion = 0
})
</script>

<template>
  <div class="relative h-screen w-full overflow-hidden bg-slate-950">
    <canvas ref="canvasRef" class="absolute inset-0 h-full w-full bg-slate-950" />
  </div>
</template>
