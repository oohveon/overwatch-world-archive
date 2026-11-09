import { asset } from '../lib/layout'

export type Chapter = {
  id: string
  en: string
  /** 상세 페이지 대제목 줄바꿈 */
  headline: string
  ko: string
  /** 타임라인 상단 미리보기 패널 설명 */
  summary: string
  /** 상세 페이지 본문 */
  description: string
  facts: { label: string; value: string }[]
  image: string
  /** 상세 페이지 보조 이미지. 없으면 자리 표시자 카드를 그린다. */
  subImages?: string[]
  duration?: string
}

const img = (id: string) => asset(`chapters/${id}.webp`)

// 텍스트 출처: Figma "01 OMNIC CRISIS — STORY DETAIL"(135:2183), "0N … — Story detail"(84:14560~15226)
export const CHAPTERS: Chapter[] = [
  {
    id: '01',
    en: 'OMNIC CRISIS',
    headline: 'OMNIC\nCRISIS',
    ko: '옴닉 사태',
    summary: '인류와 기계 생명체 옴닉이\n차이를 둘러싸고 충돌한 끝에,\n전 세계는 전례 없는 위기에 빠졌다.',
    description:
      '인류가 건설한 옴닉이 자아를 갖고\n독립을 요구하면서 전 세계적으로 충돌이 시작되었다.\n옴닉 사태는 인류 역사상 가장 큰 위기 중 하나로,\n이후 오버워치가 창설되는 계기가 되었다.',
    facts: [
      { label: 'ERA', value: '옴닉 사태' },
      { label: 'LOCATION', value: '전 세계 주요 도시' },
      { label: 'KEY FIGURES', value: '옴닉 유닛 / 인류 연합군' },
      { label: 'OUTCOME', value: '장기적 전쟁 상태, 인류의 생존 위기' },
    ],
    image: img('01'),
    subImages: [img('01-sub-1'), img('01-sub-2'), img('01-sub-3')],
    duration: '00:42',
  },
  {
    id: '02',
    en: 'OVERWATCH FORMED',
    headline: 'OVERWATCH\nFORMED',
    ko: '오버워치의 창설',
    summary: '개별 국가의 싸움은 하나의 공동 작전으로\n이어집니다. 오버워치는 새로운 연대의\n상징이 됩니다.',
    description:
      '유엔은 옴닉 사태에 대응하기 위해 국제 기동 부대 오버워치를 결성합니다. 각자의 능력을 지닌 영웅들이 힘을 모아 인류를 위협하는 위기에 맞섭니다.',
    facts: [
      { label: 'CHAPTER', value: '오버워치의 창설' },
      { label: 'SCOPE', value: '오버워치 세계관' },
      { label: 'KEY FIGURES', value: '초기 오버워치 대원들' },
      { label: 'STORY CONTEXT', value: '옴닉 사태에 맞선 연대' },
    ],
    image: img('02'),
    duration: '02:08',
  },
  {
    id: '03',
    en: 'GOLDEN AGE',
    headline: 'GOLDEN\nAGE',
    ko: '전성기',
    summary: '위기를 넘긴 세계는 재건을 시작합니다.\n오버워치의 역할도 전투에서\n평화와 발전으로 넓어집니다.',
    description:
      '옴닉 사태 이후 오버워치는 평화 유지와 구조, 과학 연구를 이어갑니다. 세계 곳곳에서 활약하는 영웅들은 더 나은 미래를 향한 희망의 상징이 됩니다.',
    facts: [
      { label: 'CHAPTER', value: '전성기' },
      { label: 'SCOPE', value: '오버워치 세계관' },
      { label: 'KEY FIGURES', value: '오버워치 요원 / 연구자들' },
      { label: 'STORY CONTEXT', value: '평화 유지와 재건' },
    ],
    image: img('03'),
  },
  {
    id: '04',
    en: 'BLACKWATCH',
    headline: 'BLACK\nWATCH',
    ko: '블랙워치',
    summary: '빛나는 영웅들의 활동 뒤에는 비밀 임무가\n존재했습니다. 블랙워치는 조직의 이상과\n방식 사이의 긴장을 드러냅니다.',
    description:
      '오버워치의 비밀 작전 부대 블랙워치는 공개적인 방식으로 해결하기 어려운 임무를 수행합니다. 그 활동이 드러나며 조직을 향한 의문과 갈등이 깊어집니다.',
    facts: [
      { label: 'CHAPTER', value: '블랙워치' },
      { label: 'SCOPE', value: '오버워치 세계관' },
      { label: 'KEY FIGURES', value: '가브리엘 레예스 / 블랙워치' },
      { label: 'STORY CONTEXT', value: '비밀 작전과 내부 갈등' },
    ],
    image: img('04'),
  },
  {
    id: '05',
    en: 'DISBANDED',
    headline: 'DISBANDED',
    ko: '오버워치의 해체',
    summary: '한때 희망의 상징이었던 조직은 무너집니다.\n흩어진 영웅들은 서로 다른 길을\n걷게 됩니다.',
    description:
      '논란과 내부 갈등으로 오버워치를 향한 신뢰가 흔들립니다. 스위스 본부의 폭발과 조직을 둘러싼 조사 이후, 오버워치는 해체되고 활동도 금지됩니다.',
    facts: [
      { label: 'CHAPTER', value: '오버워치의 해체' },
      { label: 'SCOPE', value: '오버워치 세계관' },
      { label: 'KEY FIGURES', value: '오버워치 / 국제 사회' },
      { label: 'STORY CONTEXT', value: '조직 해체와 활동 금지' },
    ],
    image: img('05'),
  },
  {
    id: '06',
    en: 'RECALL',
    headline: 'RECALL',
    ko: '재결성의 부름',
    summary: '공식적인 활동이 금지된 상황에서도,\n윈스턴은 도움이 필요한 세계를\n외면하지 않기로 합니다.',
    description:
      '새로운 위협이 커지는 가운데 윈스턴은 옛 오버워치 요원들에게 소집 메시지를 보냅니다. 세상을 다시 지키기 위한 부름에 영웅들이 응답하기 시작합니다.',
    facts: [
      { label: 'CHAPTER', value: '재결성의 부름' },
      { label: 'SCOPE', value: '오버워치 세계관' },
      { label: 'KEY FIGURES', value: '윈스턴 / 옛 오버워치 요원들' },
      { label: 'STORY CONTEXT', value: '영웅들을 향한 소집' },
    ],
    image: img('06'),
  },
  {
    id: '07',
    en: 'NEW ERA',
    headline: 'NEW\nERA',
    ko: '새로운 시대',
    summary: '과거의 경험과 새로운 세대의 힘이\n만납니다. 세계를 지키려는 선택은\n지금도 이어집니다.',
    description:
      '다시 모인 영웅들은 새로운 동료들과 함께 세계의 위협에 맞섭니다. 널 섹터의 공격 등 계속되는 위기 속에서 오버워치의 이야기는 새로운 시대를 향해 나아갑니다.',
    facts: [
      { label: 'CHAPTER', value: '새로운 시대' },
      { label: 'SCOPE', value: '오버워치 세계관' },
      { label: 'KEY FIGURES', value: '재결성된 오버워치 / 새로운 동료들' },
      { label: 'STORY CONTEXT', value: '새로운 위협에 맞선 협력' },
    ],
    image: img('07'),
  },
]

export const chapterIndex = (id: string | null | undefined) => {
  const i = CHAPTERS.findIndex((c) => c.id === id)
  return i < 0 ? 0 : i
}
