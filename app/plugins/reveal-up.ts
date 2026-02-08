// plugins/reveal-up.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal-up', {
    getSSRProps() {
      return {}
    },

    mounted(el, binding) {
      if (import.meta.server) return

      const opts = binding.value ?? {}
      const once = opts.once ?? true
      const threshold = opts.threshold ?? 0.15
      const rootMargin = opts.rootMargin ?? '0px 0px -10% 0px'
      const delayMs = opts.delayMs ?? 0

      // 1) 常驻过渡类 + 初始隐藏态
      el.classList.add('reveal-up', 'reveal-up--hidden')
      if (delayMs > 0) el.style.transitionDelay = `${delayMs}ms`

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue

            requestAnimationFrame(() => {
              el.classList.add('reveal-up--in')
              el.classList.remove('reveal-up--hidden')
            })

            if (once) io.disconnect()
          }
        },
        { threshold, rootMargin },
      )

      io.observe(el)
    },
  })
})
