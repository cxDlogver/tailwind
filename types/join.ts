export interface Job {
  id: string
  title: string
  category: 'Engineering' | 'Product' | 'Design' | 'Marketing' | 'Content' | 'Sales'
  location: string
  type: string
  description?: string
  requirements?: string[]
  responsibilities?: string[]
}

export interface CoreValue {
  id: string
  number: string
  title: string
  description: string
  imageUrl?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  tag: string
  imageUrl: string
}

export interface City {
  name: string
  country: string
}

export const RECENT_JOBS: Job[] = [
  {
    id: '1',
    title: '全栈工程师',
    category: 'Engineering',
    location: '北京',
    type: '远程 / 混合办公',
  },
  { id: '2', title: '资深产品经理', category: 'Product', location: '上海', type: '实地办公' },
  { id: '3', title: 'UI/UX 设计师', category: 'Design', location: '杭州', type: '实地办公' },
  { id: '4', title: '营销经理', category: 'Marketing', location: '深圳', type: '远程办公' },
  { id: '5', title: 'DevOps 架构师', category: 'Engineering', location: '广州', type: '混合办公' },
  { id: '6', title: '内容策略师', category: 'Content', location: '成都', type: '远程办公' },
  // 实习生与校园招聘职位
  { id: '7', title: '前端开发实习生', category: 'Engineering', location: '北京', type: '实习' },
  { id: '8', title: '产品助理实习生', category: 'Product', location: '上海', type: '实习' },
  { id: '9', title: '用户研究实习研究生', category: 'Design', location: '深圳', type: '实习' },
  { id: '10', title: '新媒体运营实习生', category: 'Content', location: '广州', type: '实习' },
  {
    id: '11',
    title: '2025届校园招聘 - 技术管培生',
    category: 'Engineering',
    location: '北京',
    type: '全职',
  },
]

export const CORE_VALUES: CoreValue[] = [
  {
    id: 'v1',
    number: '01',
    title: '薪酬体系：让每一份付出，都换回看得见的公平与尊严',
    description:
      '我们提供极具竞争力的薪酬标准，并建立透明的回报机制，确保你的每一份专业贡献都被清晰计量并赋予对等价值。',
    imageUrl:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'v2',
    number: '02',
    title: '职业成长：构建清晰的晋升航道，在确定性中预见更好的自己',
    description:
      '无论是深耕技术的极客还是统筹全局的领军者，我们提供双轨并行的成长空间与明确的职级对标，让未来清晰可见。',
    imageUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'v3',
    number: '03',
    title: '高效协作：以专业为导向的沟通，极力规避那些无意义的消耗',
    description:
      '我们倡导极简主义的协作文化，通过流程自动化与专业化分工，减少无效会议与沟通成本，让灵感在专注中即刻落地。',
    imageUrl:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'v4',
    number: '04',
    title: '长效激励：共享核心贡献红利，让每一个音符都参与未来合奏',
    description:
      '核心贡献者不仅拥有眼前的激励，更能通过股权与期权计划共享公司的长期发展红利，真正成为事业的合伙人。',
    imageUrl:
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'v5',
    number: '05',
    title: '健康节奏：尊重个人时间的主权，在高效与生活间寻找动态平衡',
    description:
      '我们不崇尚盲目的加班文化，而是通过科学的目标管理确保工作节奏健康合理，全力支持成员探索工作之外的精彩可能。',
    imageUrl:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'v6',
    number: '06',
    title: '团队关系：温暖互助的社区氛围，用一场团建治愈所有技术焦虑',
    description:
      '友好、透明且充满人文关怀的团队环境，结合定期的创意团建活动，让每一个冰冷的技术细节都流淌着人的温度。',
    imageUrl:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
  },
]

export const BLOG_POSTS: BlogPost[] = [
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

export const CITIES: City[] = [
  { name: '北京', country: '中国' },
  { name: '多伦多', country: '加拿大' },
  { name: '东京', country: '日本' },
  { name: '米兰', country: '意大利' },
  { name: '悉尼', country: '澳大利亚' },
  { name: '纽约', country: '美国' },
  { name: '伦敦', country: '英国' },
  { name: '柏林', country: '德国' },
]
