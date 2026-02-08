<!-- components/TechArchitecture.vue -->
<script setup lang="ts">
const heights = [15, 30, 45, 25, 60]
const tags01 = ['监管对齐', '自然语言规则', '对抗策略', '100+ 标签']
</script>

<template>
  <section id="tech" class="relative overflow-hidden bg-[#FFFFFF] py-24">
    <!-- Background Decorative Grid Lines -->
    <div class="pointer-events-none absolute inset-0 opacity-[0.03]">
      <div class="absolute top-0 bottom-0 left-[8%] w-px bg-black"></div>
      <div class="absolute top-0 bottom-0 left-[50%] w-px bg-black"></div>
      <div class="absolute top-0 right-[8%] bottom-0 w-px bg-black"></div>
      <div class="absolute top-[20%] right-0 left-0 h-px bg-black"></div>
      <div class="absolute top-[50%] right-0 left-0 h-px bg-black"></div>
      <div class="absolute top-[80%] right-0 left-0 h-px bg-black"></div>
    </div>

    <div class="relative z-10 mx-auto max-w-[1440px] px-8 md:px-16">
      <div class="mb-20 flex flex-col justify-between pb-4 md:flex-row md:items-end">
        <div class="max-w-2xl">
          <div
            class="mb-6 inline-flex items-center space-x-2 rounded-md border border-gray-200 bg-[#F9F9F9] px-3 py-1 font-mono text-[9px] font-bold tracking-[0.2em] text-[#3B7073] uppercase shadow-sm"
          >
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3B7073]"></span>
            <span>System Specification v4.0.1</span>
          </div>

          <h2 class="mb-6 text-5xl font-black tracking-tighter text-black uppercase">解决方案</h2>

          <p class="text-lg leading-relaxed font-light text-gray-500">
            一款基于 Agentic AI技术构建的高精度内容安全风控产品,让开发者在10分钟内保护您的应用程序
          </p>
        </div>

        <div class="hidden space-y-1 text-right font-mono text-[10px] text-gray-400 md:block">
          <p>LATENT_DIM: 1536</p>
          <p>GRAPH_NODES: 1.2M+</p>
          <p>INFERENCE_LATENCY: &lt;30MS</p>
        </div>
      </div>

      <div class="space-y-24">
        <!-- Module 01 - 星核 Tokenizer 映射库 -->
        <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          <div class="pt-2 md:col-span-7">
            <div class="mb-4 flex items-center space-x-4">
              <span class="text-4xl font-black tracking-tighter text-gray-200">01</span>
              <div class="h-px w-16 bg-gray-200"></div>
              <div class="text-[10px] font-bold tracking-[0.3em] text-[#3B7073] uppercase">
                Infrastructure Layer
              </div>
            </div>

            <h3 class="mb-4 text-3xl font-bold tracking-tight text-black">星核 Tokenizer 映射库</h3>

            <p class="mb-6 max-w-2xl text-lg leading-relaxed font-light text-gray-600">
              精准处理形近字、同音字及变体语义泛化。在变体语义空间内划定安全边界，即使是最复杂的变体字对齐也能实现毫秒级精准识别。
            </p>

            <div class="grid max-w-xl grid-cols-2 gap-4">
              <div class="rounded-xl border border-gray-100 bg-[#F9F9F9] p-5 shadow-sm">
                <div class="mb-2 text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                  Mapping Efficiency
                </div>
                <div class="text-lg font-bold text-black">99.98%</div>
                <div class="mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-200">
                  <div class="h-full w-[99%] bg-[#3B7073]"></div>
                </div>
              </div>

              <div class="rounded-xl border border-gray-100 bg-[#F9F9F9] p-5 shadow-sm">
                <div class="mb-2 text-[9px] font-bold tracking-wider text-gray-400 uppercase">
                  Semantic Stability
                </div>
                <div class="text-lg font-bold text-black">High-Fidelity</div>
                <div class="mt-3 flex space-x-1">
                  <div v-for="i in 5" :key="i" class="h-1 w-2 rounded-full bg-[#3B7073]"></div>
                </div>
              </div>
            </div>

            <div
              class="group relative mt-6 max-w-md overflow-hidden rounded-xl bg-black p-6 font-mono text-[11px] leading-relaxed text-[#3B7073] shadow-xl"
            >
              <div class="absolute top-2 right-4 text-[8px] text-gray-600 uppercase">
                Pseudo-Code
              </div>
              <code>
                def normalize(token):<br />
                &nbsp;&nbsp;latent = kernel.map(token)<br />
                &nbsp;&nbsp;if dist(latent, boundary) &lt; epsilon:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;return REJECT_SIGNAL
              </code>
            </div>
          </div>

          <div class="relative flex justify-center md:col-span-4 md:col-start-9">
            <div
              class="group relative aspect-square w-full max-w-[320px] rounded-[2.5rem] border border-gray-200 bg-[#F9F9F9] p-1 shadow-2xl"
            >
              <div
                class="absolute -top-3 -left-3 h-10 w-10 rounded-tl-2xl border-t-2 border-l-2 border-[#3B7073]"
              ></div>
              <div
                class="absolute -right-3 -bottom-3 h-10 w-10 rounded-br-2xl border-r-2 border-b-2 border-black"
              ></div>

              <div
                class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2.3rem] border border-gray-100 bg-white"
              >
                <div class="absolute inset-0 grid grid-cols-6 gap-2 p-8 opacity-10">
                  <div v-for="i in 36" :key="i" class="aspect-square rounded-sm bg-black"></div>
                </div>

                <div class="relative z-10 flex h-3/4 w-3/4 items-center justify-center">
                  <div
                    class="animate-spin-slow aspect-square w-full rounded-full border-2 border-dashed border-[#3B7073]/30"
                  ></div>
                  <div
                    class="absolute aspect-square w-2/3 rounded-full border border-[#3B7073]/50"
                  ></div>

                  <div
                    class="absolute flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl"
                  >
                    <div class="mb-2 flex h-1/2 w-full items-end justify-center space-x-1">
                      <div
                        v-for="(h, i) in heights"
                        :key="i"
                        class="w-1.5 rounded-t-sm bg-[#3B7073]"
                        :style="{ height: `${h}%` }"
                      ></div>
                    </div>
                    <div class="font-mono text-[8px] font-bold tracking-widest text-black">
                      KERNEL_01
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Module 02 - 审查规则 -->
        <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          <div class="relative order-2 flex justify-center md:order-1 md:col-span-4">
            <div
              class="flex aspect-square w-full max-w-[320px] flex-col justify-between rounded-[2.5rem] border border-gray-200 bg-[#F9F9F9] p-8 shadow-2xl"
            >
              <div class="flex items-center justify-between border-b border-gray-100 pb-4">
                <div class="flex space-x-2">
                  <div class="h-2 w-2 rounded-full bg-black"></div>
                  <div class="h-2 w-2 rounded-full bg-gray-200"></div>
                  <div class="h-2 w-2 rounded-full bg-gray-200"></div>
                </div>
                <div class="font-mono text-[8px] tracking-tighter text-gray-400 uppercase">
                  RULE_ENGINE
                </div>
              </div>

              <div class="flex flex-1 flex-col justify-center py-6">
                <div class="space-y-4">
                  <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div class="h-full w-3/4 bg-black"></div>
                  </div>
                  <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div class="h-full w-1/2 bg-[#3B7073]"></div>
                  </div>
                  <div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div class="h-full w-5/6 bg-black"></div>
                  </div>
                </div>

                <div class="mt-8 grid grid-cols-2 gap-2">
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="rounded border border-gray-200 px-2 py-1 text-center text-[7px] font-bold text-gray-400 uppercase"
                  >
                    Tag_{{ i }}
                  </div>
                </div>
              </div>

              <div class="text-center">
                <div class="text-xs font-black text-black">100+ LABELS</div>
              </div>
            </div>
          </div>

          <div class="order-1 pt-2 md:order-2 md:col-span-6 md:col-start-7">
            <div class="mb-4 flex items-center space-x-4">
              <span class="text-4xl font-black tracking-tighter text-gray-200">02</span>
              <div class="h-px w-16 bg-gray-200"></div>
              <div class="text-[10px] font-bold tracking-[0.3em] text-[#3B7073] uppercase">
                Compliance Layer
              </div>
            </div>

            <h3 class="mb-4 text-3xl font-bold tracking-tight text-black">审查规则</h3>

            <p class="mb-6 max-w-2xl text-lg leading-relaxed font-light text-gray-600">
              基于监管尺度的基础规则，对齐客户自然语言规则。针对对抗性内容策略，支持在 100+
              细分标签中进行多选，实现极高颗粒度的合规覆盖。
            </p>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="(tag, i) in tags01"
                :key="i"
                class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Module 03 - 舆情事件图谱 -->
        <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          <div class="pt-2 md:col-span-7">
            <div class="mb-4 flex items-center space-x-4">
              <span class="text-4xl font-black tracking-tighter text-gray-200">03</span>
              <div class="h-px w-16 bg-gray-200"></div>
              <div class="text-[10px] font-bold tracking-[0.3em] text-[#3B7073] uppercase">
                Monitoring Layer
              </div>
            </div>

            <h3 class="mb-4 text-3xl font-bold tracking-tight text-black">舆情事件图谱</h3>

            <p class="mb-8 max-w-2xl text-lg leading-relaxed font-light text-gray-600">
              实时更新事件并支持推理式查询，实现舆情跟踪与溯源。通过全域知识图谱，锁定非法变体传播的生命周期与扩散路径。
            </p>

            <div class="flex flex-col space-y-4">
              <div class="flex items-center space-x-4">
                <div class="h-px w-12 bg-[#3B7073]"></div>
                <div class="text-sm font-light text-gray-500 italic">
                  “从孤立的识别点，到全链路的防御面。”
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center md:col-span-4 md:col-start-9">
            <div
              class="group relative w-full max-w-[320px] overflow-hidden rounded-[2.5rem] border border-gray-200 bg-[#F9F9F9] p-8 shadow-2xl"
            >
              <div
                class="absolute top-0 right-0 p-4 font-mono text-[8px] tracking-tighter text-gray-400"
              >
                CLUSTER: 0x82f
              </div>

              <div class="grid grid-cols-8 gap-2">
                <div
                  v-for="i in 40"
                  :key="i"
                  class="aspect-square rounded-sm transition-all duration-700 hover:scale-110"
                  :class="
                    (i - 1) % 9 === 0
                      ? 'bg-[#3B7073] shadow-lg shadow-[#3B7073]/20'
                      : (i - 1) % 5 === 0
                        ? 'bg-black'
                        : 'border border-gray-100 bg-white'
                  "
                ></div>
              </div>

              <div class="mt-8 grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                <div class="text-center">
                  <div class="text-lg font-black text-black">1.2M</div>
                  <div class="text-[7px] font-bold tracking-widest text-gray-400 uppercase">
                    Nodes
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-black text-[#3B7073]">50ms</div>
                  <div class="text-[7px] font-bold tracking-widest text-gray-400 uppercase">
                    Query
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-black text-black">99%</div>
                  <div class="text-[7px] font-bold tracking-widest text-gray-400 uppercase">
                    Trace
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Module 04 - Cordon 治理架构 -->
        <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          <div class="relative order-2 flex justify-center md:order-1 md:col-span-4">
            <div
              class="relative flex aspect-square w-full max-w-[320px] flex-col justify-between overflow-hidden rounded-[2.5rem] border border-gray-800 bg-black p-8 shadow-2xl"
            >
              <div
                class="grid-pattern pointer-events-none absolute inset-0 opacity-10 brightness-0 invert"
              ></div>

              <div
                class="relative z-10 flex items-center justify-between border-b border-white/10 pb-4"
              >
                <div class="flex space-x-1.5">
                  <div class="h-1.5 w-1.5 rounded-full bg-[#3B7073]"></div>
                  <div class="h-1.5 w-1.5 rounded-full bg-[#3B7073]"></div>
                </div>
                <div class="font-mono text-[8px] tracking-tighter text-gray-500 uppercase">
                  CORDON_FRAMEWORK_V4
                </div>
              </div>

              <div class="relative z-10 flex flex-1 items-center justify-center">
                <div class="relative">
                  <div
                    class="absolute -inset-0 h-24 w-24 animate-ping rounded-full border border-[#3B7073]/30"
                  ></div>
                  <div
                    class="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#3B7073]/50 bg-[#3B7073]/10"
                  >
                    <svg
                      class="h-10 w-10 text-[#3B7073]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="relative z-10 space-y-2">
                <div class="font-mono text-[10px] font-bold text-[#3B7073]">
                  MULTI_AGENT_SYNC: ACTIVE
                </div>
                <div class="text-[7px] tracking-widest text-gray-500 uppercase">
                  Turing-Self Evaluation System
                </div>
              </div>
            </div>
          </div>

          <div class="order-1 pt-2 md:order-2 md:col-span-6 md:col-start-7">
            <div class="mb-4 flex items-center space-x-4">
              <span class="text-4xl font-black tracking-tighter text-gray-200">04</span>
              <div class="h-px w-16 bg-gray-200"></div>
              <div class="text-[10px] font-bold tracking-[0.3em] text-[#3B7073] uppercase">
                Governance Layer
              </div>
            </div>

            <h3 class="mb-4 text-3xl font-bold tracking-tight text-black">Cordon 治理架构</h3>

            <p class="mb-6 max-w-2xl text-lg leading-relaxed font-light text-gray-600">
              基于定向训练 LLM 的原子能力组件，集成图灵自评估质量控制系统。依托 RAG +
              百万节点安全知识图谱（KG），通过多 Agent 协同研判，精准处理极具挑战性的边界合规问题。
            </p>

            <div class="space-y-4">
              <div class="rounded-r-xl border-l-4 border-[#3B7073] bg-[#F9F9F9] p-4 shadow-sm">
                <div class="mb-1 text-xs font-bold text-black">图灵自评估系统</div>
                <div class="text-[11px] text-gray-400">
                  实时自我校准推理逻辑，确保输出的一致性与高可靠性。
                </div>
              </div>

              <div class="rounded-r-xl border-l-4 border-black bg-[#F9F9F9] p-4 shadow-sm">
                <div class="mb-1 text-xs font-bold text-black">多 Agent 协同研判</div>
                <div class="text-[11px] text-gray-400">
                  不同角色 Agent 针对风险点进行多维“背靠背”审理，消除盲点。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
