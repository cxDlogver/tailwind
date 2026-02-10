<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const productItems = [
  { label: '缔零法则', link: '/lawGenesis-Saas' },
  { label: '政府解决方案', link: '#' },
  { label: '智能安全硬件', link: '#' },
  { label: '内容合规引擎', link: '#' },
] as const
</script>

<template>
  <!-- =========================
         订阅我们的动态
         ========================= -->
  <footer>
    <section class="section-card pb-24">
      <div class="mb-16 text-center">
        <h2 class="text-4xl font-bold tracking-tight text-[#333333]">订阅我们的动态</h2>
        <p class="mx-auto mt-4 max-w-md leading-relaxed text-[#666666]">
          第一时间获取最新的行业深度报告与前沿技术简报，掌握数字变革的最新情报。
        </p>
      </div>
      <LayoutNewsletterSubscription />
    </section>

    <!-- =========================
         页脚
         ========================= -->
    <div class="bg-surface border-border relative z-10 border-t px-6 pt-12 pb-5 md:px-12">
      <div class="mx-auto max-w-360">
        <div class="flex flex-col items-start justify-between gap-12 lg:flex-row lg:gap-4">
          <!-- 左侧导航矩阵 -->
          <div class="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-4 xl:grid-cols-5">
            <!-- 首页 -->
            <div class="space-y-4">
              <NuxtLink to="/">
                <h4 class="text-[14px] font-bold tracking-widest whitespace-nowrap text-[#333333]">
                  首页
                </h4>
              </NuxtLink>
            </div>

            <!-- 产品介绍 -->
            <div class="space-y-4">
              <h4 class="text-[14px] font-bold tracking-widest whitespace-nowrap text-[#333333]">
                产品介绍
              </h4>
              <ul class="space-y-2">
                <li v-for="item in productItems" :key="item.label">
                  <NuxtLink
                    :to="item.link"
                    class="hover:text-primary text-[12px] whitespace-nowrap text-[#666666] transition-all"
                  >
                    {{ item.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- 解决方案 -->
            <div class="space-y-4">
              <NuxtLink
                to="/"
                class="hover:text-primary block text-[14px] font-bold tracking-widest whitespace-nowrap text-[#333333] transition-colors"
              >
                解决方案
              </NuxtLink>
            </div>

            <!-- 加入我们 -->
            <div class="space-y-4">
              <NuxtLink
                to="/join"
                class="hover:text-primary text-[14px] font-bold tracking-widest whitespace-nowrap text-[#333333] transition-colors"
              >
                加入我们
              </NuxtLink>
            </div>

            <!-- 资讯中心 -->
            <div class="space-y-4">
              <NuxtLink
                to="/news"
                class="hover:text-primary block cursor-pointer text-[14px] font-bold tracking-widest whitespace-nowrap text-[#333333] transition-colors"
              >
                资讯中心
              </NuxtLink>
            </div>
          </div>

          <!-- 右侧公司信息 -->
          <div class="flex flex-col items-start space-y-4 lg:w-fit lg:items-end">
            <!-- Logo -->
            <div
              class="group flex shrink-0 origin-left cursor-pointer items-center py-1 transition-all select-none hover:opacity-80"
              @click="navigateTo('/')"
            >
              <div
                class="relative flex h-14 w-14 scale-75 items-center justify-center transition-transform duration-500 group-hover:animate-bounce"
              >
                <!-- Particle Logo SVG -->
                <svg viewBox="0 0 100 100" class="h-full w-full">
                  <path
                    d="M29.4862 25.5478V34.582L39.2089 28.9695L53.3235 37.1222V40.1735H53.3548V42.0252H53.3235V73.3579L39.2089 81.5106L7.82405 63.3901V52.4886L17.2651 57.9393L39.2089 70.6091L48.9577 64.9758V55.9416L39.2089 61.5749L36.4131 59.9632L25.0891 53.4223V53.3962L17.2651 48.8791V48.9052L7.82405 43.4544V27.2795L12.9514 24.635V15.8303L0 22.5121V67.9072L39.2089 90.5447L61.1475 77.875V75.4652V68.8408V42.0252V32.6051L39.2089 19.9353L29.4862 25.5478Z"
                    class="fill-primary"
                  />
                  <path
                    d="M39.2087 0L17.2649 12.6697V34.8639V43.8981L25.0889 48.4152V17.1868L39.2087 9.03416L53.532 17.3068L53.5633 22.4029L61.4082 26.9304L61.3299 12.7741L39.2087 0Z"
                    class="fill-primary"
                  />
                  <path
                    d="M65.5447 15.2051V24.2392L70.5886 27.155V56.1353V63.3908L65.5447 66.3065V75.3407L78.4126 67.9079V50.8827V22.6379L65.5447 15.2051Z"
                    class="fill-primary"
                  />
                  <path
                    d="M38.7189 39.2192L33.1532 44.7849C32.8844 45.0538 32.8844 45.4897 33.1532 45.7586L38.7189 51.3242C38.9877 51.5931 39.4237 51.5931 39.6926 51.3242L45.2582 45.7586C45.5271 45.4897 45.5271 45.0538 45.2582 44.7849L39.6926 39.2192C39.4237 38.9504 38.9877 38.9504 38.7189 39.2192Z"
                    class="fill-primary"
                  />
                  <path
                    d="M68.6345 2.89047C68.9165 2.28514 69.2854 1.76629 69.7555 1.34111C70.2257 0.915937 70.7681 0.584446 71.3829 0.353843C71.9977 0.12324 72.6414 0.000732422 73.3141 0.000732422C73.9867 0.000732422 74.6304 0.116034 75.2452 0.353843C75.86 0.584446 76.4024 0.915937 76.8726 1.34111C77.3427 1.76629 77.7116 2.28514 77.9936 2.89047C78.2685 3.49581 78.4131 4.1732 78.4131 4.92266C78.4131 5.67212 78.2757 6.36393 77.9936 6.96926C77.7188 7.57459 77.3427 8.09345 76.8726 8.52583C76.4024 8.95821 75.86 9.2897 75.2452 9.5131C74.6304 9.7437 73.9867 9.859 73.3141 9.859C72.6414 9.859 71.9977 9.7437 71.3829 9.5131C70.7681 9.2825 70.2257 8.951 69.7555 8.52583C69.2854 8.09345 68.9165 7.57459 68.6345 6.96926C68.3596 6.36393 68.215 5.67933 68.215 4.92266C68.215 4.166 68.3524 3.49581 68.6345 2.89047ZM69.864 6.48644C70.0593 6.96206 70.3269 7.37282 70.6596 7.71872C70.9923 8.06463 71.3901 8.33847 71.8458 8.53304C72.3015 8.72761 72.7861 8.82129 73.3141 8.82129C73.842 8.82129 74.3122 8.72761 74.7678 8.53304C75.2235 8.33847 75.6213 8.07183 75.954 7.71872C76.2867 7.37282 76.5543 6.96206 76.7568 6.48644C76.9521 6.01082 77.0534 5.49196 77.0534 4.92987C77.0534 4.36777 76.9521 3.84892 76.7568 3.38051C76.5616 2.91209 76.294 2.50133 75.954 2.16263C75.6213 1.81673 75.2235 1.5501 74.7678 1.35552C74.3122 1.16095 73.8276 1.06727 73.3141 1.06727C72.8005 1.06727 72.3015 1.16095 71.8458 1.35552C71.3901 1.5501 70.9923 1.81673 70.6596 2.16263C70.3269 2.50854 70.0593 2.91209 69.864 3.38051C69.6687 3.84892 69.5747 4.36777 69.5747 4.92987C69.5747 5.49196 69.6687 6.01082 69.864 6.48644ZM73.4225 2.15543C74.1241 2.15543 74.6593 2.27794 75.0355 2.52295C75.4116 2.76797 75.5996 3.19314 75.5996 3.79127C75.5996 4.04349 75.5634 4.26689 75.4839 4.44704C75.4116 4.6272 75.3031 4.77854 75.1729 4.88663C75.0427 5.00193 74.8836 5.08841 74.71 5.15326C74.5364 5.21812 74.3411 5.25415 74.1386 5.26857L75.6213 7.68269H74.4713L73.1188 5.31901H72.4317V7.68269H71.3323V2.15543H73.4298H73.4225ZM73.4081 4.46866C73.7263 4.46866 73.9867 4.42542 74.1892 4.33895C74.3917 4.25247 74.493 4.03628 74.493 3.70479C74.493 3.55346 74.4568 3.43816 74.3845 3.35168C74.3122 3.2652 74.2254 3.19314 74.1097 3.1499C74.0012 3.09946 73.8782 3.07063 73.7408 3.04901C73.6034 3.0346 73.4732 3.02019 73.3502 3.02019H72.4244V4.47587H73.4081V4.46866Z"
                    class="fill-primary"
                  />
                </svg>
              </div>
              <!-- 文字部分 -->
              <div class="ml-1 flex flex-col justify-center text-left">
                <span class="text-text text-xl leading-none font-bold tracking-[0.12em] md:text-xl"
                  >缔零科技</span
                >
                <span
                  class="mt-1.5 text-[9px] font-medium tracking-[0.32em] text-[#999999] uppercase opacity-70"
                  >LAW<span class="text-[#3B7073]">GENESIS</span></span
                >
              </div>
            </div>

            <!-- 联系详情 -->
            <div class="space-y-2 text-left text-[13px] text-[#333333] lg:text-right">
              <p class="flex flex-wrap gap-1 lg:justify-end">
                <span class="text-[#666666]">联系电话：</span>
                <span class="font-mono font-medium">190-8655-2860</span>
              </p>

              <p class="flex flex-wrap gap-1 lg:justify-end">
                <span class="text-[#666666]">企业邮箱：</span>
                <span class="font-mono font-medium">pr@lawgenesis.cn</span>
              </p>

              <p class="max-w-100 leading-relaxed lg:max-w-none">
                <span class="text-[#666666]">深圳总部：</span>
                深圳市南山区创维半导体设计大厦裙楼二层SKYWORK 创新空间B201房
              </p>

              <p class="max-w-100 leading-relaxed lg:max-w-none">
                <span class="text-[#666666]">武汉分部：</span>
                武汉洪山区高新大道780号沃德中心614室
              </p>
            </div>
          </div>
        </div>

        <!-- 底部版权与备案 -->
        <div
          class="mt-5 flex flex-col items-center justify-between gap-4 border-t border-[#EEEEEE] pt-6 md:flex-row"
        >
          <p class="font-mono text-[11px] tracking-widest text-[#BBBBBB]">
            © 2024-{{ currentYear }} 缔零科技
          </p>

          <div
            class="flex flex-wrap justify-center gap-4 font-mono text-[11px] tracking-wider text-[#BBBBBB]"
          >
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
              class="hover:text-primary transition-colors"
            >
              粤ICP备2024350824号-1
            </a>
            <span class="opacity-20">|</span>
            <a
              href="http://www.beian.gov.cn/"
              target="_blank"
              rel="noreferrer"
              class="hover:text-primary transition-colors"
            >
              粤公网安备 44030002005987号
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
