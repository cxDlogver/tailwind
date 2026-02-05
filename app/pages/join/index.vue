<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function onSearch(query: string) {
  router.push({ path: '/join/jobs', query: { category: '全部', search: query } })
  if (import.meta.client) window.scrollTo(0, 0)
}

function onSelectJob(id: string) {
  router.push(`/join/jobs/${id}`)
  if (import.meta.client) window.scrollTo(0, 0)
}
</script>

<template>
  <main class="bg-neutral-bg p-top min-h-screen">
    <JoinHero :on-search="onSearch" :on-select-job="onSelectJob" />
    <JoinFeaturedJobs :on-select-job="onSelectJob" :on-see-all="() => onSearch('')" />
    <JoinMissionVision />
    <JoinValues />
    <JoinGlobalPresence />
    <JoinContentArea />
    <JoinQuickClicks />
  </main>
</template>
