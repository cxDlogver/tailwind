<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    onHomeClick?: () => void
    onPositionsClick: (category?: string) => void
    isDark?: boolean
  }>(),
  { isDark: true },
)

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

type NavItem = {
  label: string
  id?: string
  onClick?: () => void
}

const navItems: NavItem[] = [
  { label: '职位', onClick: () => props.onPositionsClick('全部') },
  { label: '办公地点', id: 'locations' },
  { label: '企业文化', id: 'culture' },
  { label: '校园招聘', onClick: () => props.onPositionsClick('Campus') },
]

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  if (!import.meta.client) return
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <header
      class="fixed top-2000 right-0 left-0 z-50 transition-all duration-300"
      :class="isScrolled ? 'bg-white/95 py-3 shadow-sm backdrop-blur' : 'bg-transparent py-6'"
    >
      <div class="container mx-auto flex items-center justify-between px-6">
        <div class="group flex cursor-pointer items-center gap-2" @click="props.onHomeClick?.()">
          <div
            class="bg-brand-1 flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:scale-110"
          >
            <span class="text-xl font-bold text-white italic">0</span>
          </div>
          <span
            class="text-h1 font-bold tracking-tighter uppercase transition-colors"
            :class="
              isScrolled ? 'text-neutral-text1' : props.isDark ? 'text-white' : 'text-neutral-text1'
            "
          >
            缔零科技 <span class="font-normal opacity-70">招聘</span>
          </span>
        </div>

        <nav class="hidden items-center gap-8 md:flex">
          <a
            v-for="item in navItems"
            :key="item.label"
            :href="item.id ? `#${item.id}` : '#'"
            class="text-support hover:text-brand-1 font-medium transition-colors"
            :class="
              isScrolled
                ? 'text-neutral-text2'
                : props.isDark
                  ? 'text-white/90'
                  : 'text-neutral-text2'
            "
            @click.prevent="() => {}"
          >
            {{ item.label }}
          </a>
          <button
            class="bg-brand-1 text-support hover:bg-brand-2 rounded-full px-5 py-2 font-bold text-white shadow-lg transition-colors"
          >
            立即登录
          </button>
        </nav>

        <button class="md:hidden" type="button" @click="mobileMenuOpen = !mobileMenuOpen">
          <Icon
            v-if="!mobileMenuOpen"
            name="lucide:menu"
            class="h-7 w-7"
            :class="
              isScrolled ? 'text-neutral-text1' : props.isDark ? 'text-white' : 'text-neutral-text1'
            "
          />
          <Icon v-else name="lucide:x" class="text-neutral-text1 h-7 w-7" />
        </button>
      </div>

      <div v-if="mobileMenuOpen" class="bg-neutral-bg fixed inset-0 z-[60] px-6 pt-24 md:hidden">
        <button class="absolute top-6 right-6" type="button" @click="mobileMenuOpen = false">
          <Icon name="lucide:x" class="h-8 w-8" />
        </button>

        <div class="text-h3 text-neutral-text1 flex flex-col gap-6 font-bold">
          <a
            v-for="item in navItems"
            :key="item.label"
            href="#"
            @click.prevent="mobileMenuOpen = false"
          >
            {{ item.label }}
          </a>
          <a href="#" @click.prevent="mobileMenuOpen = false">常见问题</a>
        </div>
      </div>
    </header>
  </div>
</template>
