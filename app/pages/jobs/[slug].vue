<script setup lang="ts">
import type { JobsCollectionItem } from '@nuxt/content'

const router = useRouter()
const route = useRoute()
const jobSlug = route.params.slug as string
const job = (await $fetch(`/api/jobs/${encodeURIComponent(jobSlug)}`)) as JobsCollectionItem
</script>

<template>
  <div v-if="job" class="p-top min-h-screen pb-32">
    <!-- Detail Hero -->
    <div class="bg-neutral-text1 relative overflow-hidden py-20 text-white">
      <div class="bg-primary/10 absolute top-0 right-0 h-full w-1/3 translate-x-1/2 skew-x-12" />

      <div class="relative z-10 container mx-auto px-32">
        <button
          type="button"
          class="mb-12 flex cursor-pointer items-center gap-2 font-bold text-white/60 transition-colors hover:text-white"
          @click="navigateTo('/jobs')"
        >
          <Icon name="lucide:chevron-left" class="h-5 w-5" />
          返回职位列表
        </button>

        <div class="max-w-4xl">
          <span
            class="text-support bg-primary mb-6 inline-block rounded-full px-4 py-1 font-black tracking-widest text-white uppercase"
          >
            {{ job.category ?? '研发组' }}
          </span>

          <h1 class="text-h4 mb-8 leading-none font-bold tracking-tighter md:text-[60px]">
            {{ job.title }}
          </h1>

          <div class="flex flex-wrap items-center gap-8 text-white/80">
            <div class="flex items-center gap-2">
              <Icon name="lucide:map-pin" class="text-primary h-5 w-5" />
              <span class="font-bold">{{ job.base?.join(' / ') || '面议' }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="lucide:briefcase" class="text-primary h-5 w-5" />
              <span class="font-bold">{{ job.type }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="lucide:clock" class="text-primary h-5 w-5" />
              <span class="font-bold"
                >发布时间：{{
                  job.updatedAt ? new Date(job.updatedAt).toLocaleDateString() : '最新'
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-20 container mx-auto -mt-10 px-32">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <!-- Main Content -->
        <div
          class="border-neutral-divider space-y-16 rounded-[2.5rem] border bg-white p-8 shadow-xl md:p-16 lg:col-span-2"
        >
          <div
            class="prose prose-h2:text-h2 prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-h3 prose-h3:font-bold prose-h3:mt-10 prose-h3:mb-4 prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-ul:pl-6 prose-li:my-2 dark:prose-invert"
          >
            <ContentRenderer :value="job" />
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <div class="bg-primary sticky top-48 rounded-[2.5rem] p-10 text-white shadow-2xl">
            <h3 class="text-h2 mb-6 font-bold">感兴趣？</h3>
            <p class="mb-10 font-medium text-white/80">
              如果你已经准备好重构规则，植入确定的安全原力，现在就开始你的申请吧。
            </p>

            <button
              type="button"
              class="text-primary text-h4 mb-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white py-5 font-black shadow-lg transition-transform hover:scale-105"
              @click="navigateTo('/join/process')"
            >
              立即申请
              <Icon name="lucide:arrow-right" class="h-5 w-5" />
            </button>

            <button
              type="button"
              class="text-body flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 py-5 font-bold text-white transition-all hover:bg-white/20"
              @click="() => {}"
            >
              <Icon name="lucide:share-2" class="h-4.5 w-4.5" />
              分享此职位
            </button>

            <button
              type="button"
              class="text-support mt-6 w-full cursor-pointer font-bold text-white/70 underline underline-offset-8 hover:text-white"
              @click="navigateTo('/join')"
            >
              返回加入我们首页
            </button>
          </div>

          <div
            v-if="job.relatedJobs && job.relatedJobs.length > 0"
            class="border-neutral-divider rounded-[2.5rem] border bg-white p-8"
          >
            <h3 class="text-support text-neutral-text3 mb-6 font-black tracking-widest uppercase">
              相关职位
            </h3>

            <div class="space-y-6">
              <button
                v-for="rj in job.relatedJobs"
                :key="rj.slug"
                type="button"
                class="group block w-full text-left"
                @click="router.push(`/join/jobs/${rj.slug}`)"
              >
                <h4
                  class="text-neutral-text1 group-hover:text-primary mb-1 font-bold transition-colors"
                >
                  {{ rj.title }}
                </h4>
                <p class="text-support text-neutral-text3">{{ rj.base?.join(' / ') || '面议' }}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="p-top pb-24">
    <div class="container mx-auto px-6">
      <div class="border-neutral-divider rounded-3xl border bg-white p-10 text-center">
        <p class="text-neutral-text3 text-h2">未找到该职位</p>
        <button
          type="button"
          class="text-primary mt-6 cursor-pointer font-bold hover:underline"
          @click="navigateTo('/jobs')"
        >
          返回职位列表
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
