<script setup lang="ts">
const data = [
  { name: '传统治理架构', cost: 100, accuracy: 65 },
  { name: '替代人工治理', cost: 75, accuracy: 85 },
  { name: '缔零法则', cost: 40, accuracy: 95 },
]

const option = computed(() => {
  const names = data.map((d) => d.name)
  const cost = data.map((d) => d.cost)
  const acc = data.map((d) => d.accuracy)

  return {
    grid: { top: 20, right: 30, left: 40, bottom: 30, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#ffffff',
      borderColor: 'rgba(0,0,0,0)',
      borderWidth: 0,
      padding: 16,
      textStyle: { color: '#111827', fontSize: 12 },
      extraCssText: 'border-radius:24px; box-shadow:0 10px 30px rgba(0,0,0,0.05);',
      formatter: (params: any) => {
        // params: [{seriesName, name, value}, ...]
        const title = params?.[0]?.axisValue ?? ''
        const lines = (params || [])
          .map((p: any) => `${p.seriesName}: <b>${p.value}</b>`)
          .join('<br/>')
        return `<div style="font-weight:800;margin-bottom:6px">${title}</div>${lines}`
      },
    },
    xAxis: {
      type: 'category',
      data: names,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 11,
        fontWeight: 700,
        color: '#6B7280',
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#E5E7EB', type: 'dashed' } },
      axisLabel: { fontSize: 10, color: '#9CA3AF' },
      name: '相对投入 / 精度 %',
      nameLocation: 'middle',
      nameGap: 42,
      nameTextStyle: { fontSize: 10, color: '#9CA3AF', align: 'center' },
    },
    series: [
      {
        name: '投入成本',
        type: 'bar',
        data: cost,
        barWidth: 40,
        itemStyle: {
          borderRadius: [10, 10, 10, 10],
          color: (p: any) => (p.dataIndex === 2 ? '#3B7073' : '#D1D5DB'),
        },
      },
      {
        name: '安全精度',
        type: 'bar',
        data: acc,
        barWidth: 40,
        itemStyle: {
          borderRadius: [10, 10, 10, 10],
          color: (p: any) => (p.dataIndex === 2 ? '#111111' : '#9CA3AF'),
        },
      },
    ],
  }
})
</script>

<template>
  <section id="data" class="bg-[#F9F9F9] py-32">
    <div class="mx-auto max-w-360 px-8 md:px-16">
      <div class="grid grid-cols-1 gap-16 md:grid-cols-12">
        <!-- Text Info -->
        <div class="md:col-span-5">
          <h2 class="mb-8 text-4xl font-bold tracking-tight">
            性能对撞：<br />
            效率与精度的最优解
          </h2>

          <p class="mb-12 text-lg leading-relaxed font-light text-gray-500">
            通过一站式 AI 解决方案，我们将投入成本曲线从 100% 陡降至
            <span class="font-bold text-black">40%</span>，同时将安全精度提升至
            <span class="font-bold text-[#3B7073]">95%</span>
            以上的人工专家级水平。
          </p>

          <div class="space-y-12">
            <div class="relative rounded-sm border-l-4 border-[#3B7073] pl-8">
              <div class="mb-2 text-5xl font-bold tracking-tighter">-60%</div>
              <div class="text-xs font-bold tracking-widest text-gray-400 uppercase">
                综合治理成本下降
              </div>
            </div>
            <div class="relative rounded-sm border-l-4 border-black pl-8">
              <div class="mb-2 text-5xl font-bold tracking-tighter">95%+</div>
              <div class="text-xs font-bold tracking-widest text-gray-400 uppercase">
                稳定专家级精度
              </div>
            </div>
          </div>

          <div
            class="mt-20 rounded-[2.5rem] border border-gray-100 bg-gray-50 p-10 text-xl font-light text-gray-800 italic shadow-sm"
          >
            “让开发者在 10 分钟内保护您的应用程序。”
          </div>
        </div>

        <!-- Chart Area -->
        <div
          class="flex flex-col justify-center rounded-[4rem] border border-gray-100 bg-gray-50/50 p-8 md:col-span-7 md:p-12"
        >
          <div class="h-100 w-full">
            <ClientOnly>
              <VChart :option="option" autoresize class="h-full w-full" />
            </ClientOnly>
          </div>

          <div
            class="mt-8 flex items-center justify-center space-x-10 text-[10px] font-bold tracking-widest text-gray-400 uppercase"
          >
            <div class="flex items-center space-x-3">
              <div class="h-3 w-3 rounded-full bg-[#3B7073]"></div>
              <span>成本曲线</span>
            </div>
            <div class="flex items-center space-x-3">
              <div class="h-3 w-3 rounded-full bg-black"></div>
              <span>精度峰值</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
