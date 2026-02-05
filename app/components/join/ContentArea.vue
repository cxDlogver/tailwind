<script setup lang="ts">
type BlogPost = {
  id: string
  title: string
  excerpt: string
  tag: string
  imageUrl: string
  href?: string
}

/** 组件内数据（可直接跑）；你有真实 constants 时可替换为 import */
const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: '技术播客: 如何用 AI 驱动招聘流程',
    excerpt: '听听我们的首席架构师聊聊如何将大语言模型集成到内部协作工具中。',
    tag: '技术研发',
    imageUrl:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'b2',
    title: '从 0 到 1 打造极简主义 UI',
    excerpt: '设计团队分享我们在缔零科技产品设计中的美学追求与实践心得。',
    tag: '设计美学',
    imageUrl:
      'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'b3',
    title: '多元包容：我们的工作空间',
    excerpt: '看看我们在全球各地充满创意的办公室，以及我们如何支持远程办公。',
    tag: '企业文化',
    imageUrl:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
  },
]

function goBlogCenter() {
  // TODO: 你接入真实路由后替换
  // const router = useRouter(); router.push('/blog')
}

function openPost(href?: string) {
  // TODO: 你接入真实路由后替换
  if (!href) return
  if (import.meta.client) window.location.href = href
}
</script>

<template>
  <section id="culture" class="bg-neutral-bg py-24">
    <div class="container mx-auto px-6">
      <div class="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
        <div>
          <div class="mb-4 flex items-center gap-2">
            <div class="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
              <Icon name="lucide:book-open" class="h-5 w-5 text-white" />
            </div>
            <span class="text-h1 text-neutral-text1 font-bold tracking-tighter italic"
              >感受@缔零科技</span
            >
          </div>
          <h2 class="text-h3 text-neutral-text1 font-bold tracking-tight">
            探索技术与人文交织的真实笔触
          </h2>
        </div>

        <button
          type="button"
          class="text-primary text-body font-bold underline-offset-8 hover:underline"
          @click="navigateTo('/news')"
        >
          前往博客中心
        </button>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div
          v-for="post in BLOG_POSTS"
          :key="post.id"
          class="group border-neutral-divider flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all hover:shadow-2xl"
        >
          <div class="relative h-64 overflow-hidden">
            <img
              :src="post.imageUrl"
              :alt="post.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div
              class="bg-primary-light/90 text-support text-primary absolute top-4 left-4 rounded-full px-3 py-1 font-bold uppercase backdrop-blur"
            >
              {{ post.tag }}
            </div>
          </div>

          <div class="flex flex-1 flex-col p-8">
            <h3
              class="text-h2 group-hover:text-primary text-neutral-text1 mb-4 leading-tight font-bold transition-colors"
            >
              {{ post.title }}
            </h3>
            <p class="text-body text-neutral-text2 mb-8 flex-1 font-normal">
              {{ post.excerpt }}
            </p>

            <button
              type="button"
              class="text-neutral-text1 hover:text-primary text-support flex items-center gap-2 font-bold tracking-widest uppercase transition-colors"
              @click="openPost(post.href)"
            >
              阅读文章
              <Icon name="lucide:arrow-up-right" class="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
