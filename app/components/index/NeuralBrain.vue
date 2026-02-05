<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
  baseSize: number
}

const props = withDefaults(
  defineProps<{
    /** 是否启动火焰特效 */
    startFile?: boolean
  }>(),
  {
    startFile: false,
  },
)

const canvasRef = ref<HTMLCanvasElement | null>(null)

const brandRgb = '59 112 115' // #3B7073 的 rgb triplet，方便用 rgb(var(--brand)/a)
const stats = reactive({ count: 0, fps: 60 })

let ctx: CanvasRenderingContext2D | null = null
let rafId: number | null = null
let particles: Particle[] = []
let lastTime = 0
let frameCount = 0
const opacityLevel = ref<number>(0)

let cssW = 0
let cssH = 0
const DPR_CAP = 2

// 重置画布尺寸
function resize() {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  const parent = canvas.parentElement
  const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect()

  cssW = rect.width || window.innerWidth
  cssH = rect.height || 70

  const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)

  canvas.style.width = `${cssW}px`
  canvas.style.height = `${cssH}px`
  canvas.width = Math.floor(cssW * dpr)
  canvas.height = Math.floor(cssH * dpr)

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

// 创建一个粒子
function createParticle(w: number, h: number): Particle {
  const baseSize = 15 + Math.random() * 20
  const p = {
    x: w * -0.1,
    y: h / 2 + (Math.random() - 0.5) * h,
    vx: w * (0.01 + Math.random() * 0.02),
    vy: (Math.random() - 0.5) * h * 0.02,
    life: 1,
    size: baseSize,
    opacity: opacityLevel,
    baseSize,
  }
  return p
}

// 限制粒子在垂直方向的边界反弹
function clampBounce(p: Particle, h: number, w: number) {
  const r = p.size
  const top = r
  const bottom = h - r
  const right = w * 0.9 - r
  if (p.y < top) {
    p.y = top
    p.vy = Math.abs(p.vy) * 0.65
  } else if (p.y > bottom) {
    p.y = bottom
    p.vy = -Math.abs(p.vy) * 0.65
  }

  if (p.x > right) {
    p.life = 0
  }
}

function frame(time: number) {
  if (!ctx) return

  if (!lastTime) lastTime = time
  frameCount++
  if (time - lastTime > 1000) {
    stats.fps = frameCount
    stats.count = particles.length
    frameCount = 0
    lastTime = time
  }

  const w = cssW
  const h = cssH

  ctx.clearRect(0, 0, w, h)

  // Emit: 左侧喷发到右侧
  for (let i = 0; i < 15 * opacityLevel.value; i++) {
    particles.push(createParticle(w, h))
  }
  if (props.startFile) {
    opacityLevel.value = Math.min(opacityLevel.value + 0.02, 1)
  } else {
    opacityLevel.value = Math.max(opacityLevel.value - 0.02, 0)
  }

  ctx.save()
  ctx.globalCompositeOperation = 'source-over'

  const now = time
  particles = particles.filter((p) => {
    p.x += p.vx
    p.y += p.vy + Math.sin(now * 0.02 + p.x * 0.05) * 1.5
    clampBounce(p, h, w)
    p.life -= 0.025
    p.size = p.baseSize * p.life

    if (p.life <= 0 || p.x < -40) return false

    const alpha = p.life * opacityLevel.value
    const r = p.size

    if (!ctx) return false

    ctx.beginPath()
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)

    // 白热核心 -> 主题青色尾焰（白底清晰）
    if (p.life > 0.7) {
      g.addColorStop(0, `rgba(255,255,255,${alpha})`)
      g.addColorStop(0.3, `rgba(${brandRgb.replaceAll(' ', ',')},${alpha})`)
    } else {
      g.addColorStop(0, `rgba(${brandRgb.replaceAll(' ', ',')},${alpha})`)
    }
    g.addColorStop(1, `rgba(${brandRgb.replaceAll(' ', ',')},0)`)

    ctx.fillStyle = g
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
    ctx.fill()

    return true
  })
  ctx.restore()

  rafId = requestAnimationFrame(frame)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  if (!ctx) return

  resize()
  window.addEventListener('resize', resize)
  rafId = requestAnimationFrame(frame)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null
  ctx = null
  particles = []
  lastTime = 0
  frameCount = 0
})
</script>

<template>
  <div
    class="relative flex h-full w-full items-center rounded-2xl bg-transparent"
    :style="{ '--brand': brandRgb }"
  >
    <canvas ref="canvasRef" class="pointer-events-none absolute inset-0 h-full w-full" />
    <div
      class="rift-bg bg-primary/80 absolute inset-0 left-0 h-full w-0.5"
      :data-active="props.startFile"
    ></div>
  </div>
</template>

<style scoped>
@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spinSlow 4.5s linear infinite;
}

/* 左侧阴影统一由 ::before 承担 */
.rift-bg {
  position: relative;
  pointer-events: none;
  box-shadow: none;
  transition: box-shadow 2000ms ease;
}

.rift-bg[data-active='false'] {
  box-shadow: 0 0 5px 3px rgba(59, 112, 115, 0.8);
}

.rift-bg[data-active='true'] {
  box-shadow: 0 0 30px 15px rgba(59, 112, 115, 0.8);
}

/* .rift-bg::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  transition:
    transform 2000ms ease,
    opacity 2000ms ease,
    box-shadow 2000ms ease,
    background 2000ms ease;

  opacity: 0;
}

.rift-bg[data-active='false']::before {
  width: 20%;
  transform: scaleX(1);

  box-shadow: none;
  background: linear-gradient(
    to right,
    rgba(59, 112, 115, 0.6),
    rgba(59, 112, 115, 0.3) 35%,
    rgba(59, 112, 115, 0) 85%
  );
  opacity: 1;
}

.rift-bg[data-active='true']::before {
  width: 20%;
  transform: scaleX(1);
  box-shadow: none;
  background: transparent;
  opacity: 1;
} */

/* .rift-bg {
  background: radial-gradient(
    ellipse var(--rx) var(--ry) at center,
    rgba(59, 112, 115, var(--a)) 0%,
    rgba(59, 112, 115, calc(var(--a) * 0.35)) 60%,
    rgba(59, 112, 115, 0) 72%,
    transparent 100%
  );

  box-shadow: 0 0 30px 10px rgba(59, 112, 115, calc(var(--a) * 0.5));
} */
</style>
