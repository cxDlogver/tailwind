<script setup lang="ts">
import { computed, ref } from 'vue'

type PartnerItem = {
  company: string
  provider: string
  role: string
  type: number
  quote: string
  verifiedId: string
}

const props = defineProps<{ item: PartnerItem }>()
const isHovered = ref(false)

const topLineStyle = computed(() => ({ width: isHovered.value ? '100%' : '0%' }))
const cardStyle = computed(() => ({
  boxShadow: isHovered.value ? '0 20px 40px -10px rgba(59, 112, 115, 0.08)' : 'none',
  transform: isHovered.value ? 'translateY(-5px)' : 'translateY(0px)',
}))
const footerStyle = computed(() => ({
  maxHeight: isHovered.value ? '160px' : '48px',
  backgroundColor: isHovered.value ? '#F9F9F9' : '#FFFFFF',
}))
</script>

<template>
  <div
    class="group border-border hover:border-primary/40 relative flex w-95 shrink-0 flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-700"
    :style="cardStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      class="bg-primary absolute top-0 left-0 z-20 h-0.5 transition-all duration-500"
      :style="topLineStyle"
    />

    <div class="p-8 pb-6">
      <div class="mb-6 flex items-start justify-between">
        <div class="flex items-center gap-4">
          <div
            class="transition-colors duration-500"
            :class="isHovered ? 'text-primary' : 'text-text-secondary'"
          ></div>

          <div>
            <h4 class="text-text-primary text-xl font-bold tracking-tight">
              {{ props.item.company }}
            </h4>
            <div class="mt-0.5 flex items-center gap-1.5">
              <span class="text-text-secondary font-mono text-[8px] tracking-widest uppercase"
                >Verified Partner</span
              >
            </div>
          </div>
        </div>

        <Icon
          name="i-lucide-quote"
          class="transition-all duration-700"
          :class="isHovered ? 'text-primary/30 rotate-12' : 'text-placeholder/30 rotate-0'"
          style="width: 32px; height: 32px"
        />
      </div>

      <p
        class="group-hover:text-text-secondary text-text-placeholder text-base leading-relaxed font-light transition-colors duration-500"
      >
        “{{ props.item.quote }}”
      </p>
    </div>

    <div
      class="border-text-secondary/50 mt-auto flex flex-col justify-center overflow-hidden border-t px-8 transition-all duration-500"
      :style="footerStyle"
    >
      <div class="flex h-12 shrink-0 items-center justify-between">
        <div class="flex items-center gap-2">
          <Icon
            name="i-lucide-user-check"
            style="width: 12px; height: 12px"
            :class="isHovered ? 'text-primary' : 'text-text-secondary'"
          />
          <span
            class="font-mono text-[9px] tracking-widest uppercase"
            :class="isHovered ? 'text-primary' : 'text-text-secondary'"
          >
            Security Shielded
          </span>
        </div>

        <div
          class="text-text-secondary transition-transform duration-500"
          :class="isHovered ? 'rotate-180' : 'rotate-0'"
        >
          <Icon name="i-lucide-chevron-down" style="width: 12px; height: 12px" />
        </div>
      </div>

      <div
        class="border-border flex items-center gap-4 border-t pt-2 pb-8 transition-all duration-300"
        :class="
          isHovered ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
        "
      >
        <div
          class="bg-surface-muted text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold"
        >
          {{ props.item.provider.charAt(0) }}
        </div>
        <div class="overflow-hidden">
          <div class="text-text-primary truncate text-sm font-bold">{{ props.item.provider }}</div>
          <div class="text-text-regular truncate font-mono text-[8px] tracking-widest uppercase">
            {{ props.item.role }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
