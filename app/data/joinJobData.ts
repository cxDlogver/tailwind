import type { HireStep } from '@/types/joinJobType'

export const HIRE_STEPS: HireStep[] = [
  {
    number: '01',
    title: '发起连接',
    subtitle: '简历初筛',
    description:
      '将你的简历投递至 xushuangshuang@yjsafe.cn。我们寻找的不仅仅是履历，更是你对解决复杂“安全难题”的热情，以及在每一行代码中追求极致确定的态度。',
    icon: 'lucide:send',
    tag: 'Establish Connection',
    details:
      '初筛通常在 3 个工作日内完成。我们会认真审视你在技术深度、逻辑架构以及内容安全领域的独到见解。',
  },
  {
    number: '02',
    title: '逻辑共鸣',
    subtitle: '专业导师面',
    description:
      '你的直属导师将与你开启一场深度对话。我们避开那些枯燥的教条，直接切入核心：探讨技术边界、系统美学，以及在不确定的环境中如何构建最稳固的防线。',
    icon: 'lucide:terminal',
    tag: 'Technical Alignment',
    details:
      '我们更倾向于实战案例的拆解，通过探讨真实的业务痛点，寻找那个能在复杂逻辑中游刃有余的你。',
  },
  {
    number: '03',
    title: '愿景对标',
    subtitle: '部门负责人面',
    description:
      '这一阶段，我们将探讨更宏观的职业路径与团队愿景。我们寻找的是能为缔零科技注入新变量、并认可“极致协作、高度透明”价值观的长期战略伙伴。',
    icon: 'lucide:users',
    tag: 'Vision & Culture',
    details: '在这里，你可以畅谈你对行业未来的预判，以及你希望在这里实现什么样的职业突破。',
  },
  {
    number: '04',
    title: '正式入伙',
    subtitle: '发放 Offer',
    description:
      '当所有逻辑达成闭环，那份承载着我们共同期待的 Offer 将正式发出。欢迎加入，准备好与我们一起重塑数字空间的底层安全标准了吗？',
    icon: 'lucide:shield-check',
    tag: 'Official Onboarding',
    details: '我们将为你配备全方位的入职指引与“导师陪伴计划”，助你快速融入，开启职业生涯的新乐章。',
  },
]
