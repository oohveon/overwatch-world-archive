import { asset } from '../lib/layout'

/**
 * WORLD(영웅 관계) 페이지 데이터 — Figma "Hero relationship"(135:2754).
 * 트레이서 정보와 관계도는 Figma 원문이고, 나머지 영웅의 프로필·소개 문구는 초안이다.
 */
export type Faction = 'OVERWATCH' | 'TALON' | 'NULL SECTOR' | 'INDEPENDENT'

export type WorldHero = {
  id: string
  no: string
  en: string
  ko: string
  faction: Faction
  facts: { label: string; value: string }[]
  description: string
  portrait: string
  /** 관계도 카드 이미지 */
  mapImage?: string
  /** 상세 패널 이미지 */
  panelImage?: string
}

const roster = (id: string) => asset(`world/roster/${id}.webp`)
const map = (id: string) => asset(`world/map-${id}.webp`)

const facts = (realName: string, role: string, base: string, affiliation: string, status = 'ACTIVE') => [
  { label: 'REAL NAME', value: realName },
  { label: 'ROLE', value: role },
  { label: 'BASE', value: base },
  { label: 'AFFILIATION', value: affiliation },
  { label: 'STATUS', value: status },
]

export const WORLD_HEROES: WorldHero[] = [
  {
    id: 'tracer', no: '01', en: 'TRACER', ko: '트레이서', faction: 'OVERWATCH',
    facts: facts('LENA OXTON', 'DAMAGE', 'LONDON, UK', 'OVERWATCH'),
    description: '시간을 넘나드는 오버워치의 영웅.\n언제나 밝은 에너지와 용기를 잃지 않는 그녀는\n지금 이 순간에도 더 나은 미래를 위해 싸웁니다.',
    portrait: roster('tracer'), mapImage: map('tracer'), panelImage: asset('world/panel-tracer.webp'),
  },
  {
    id: 'reinhardt', no: '02', en: 'REINHARDT', ko: '라인하르트', faction: 'OVERWATCH',
    facts: facts('REINHARDT WILHELM', 'TANK', 'STUTTGART, GERMANY', 'OVERWATCH'),
    description: '명예와 정의를 신조로 삼는 노병.\n거대한 방벽 뒤에서 언제나 동료들을\n가장 앞에서 지켜 냅니다.',
    portrait: roster('reinhardt'), mapImage: map('reinhardt'),
  },
  {
    id: 'winston', no: '03', en: 'WINSTON', ko: '윈스턴', faction: 'OVERWATCH',
    facts: facts('WINSTON', 'TANK', 'WATCHPOINT: GIBRALTAR', 'OVERWATCH'),
    description: '달 기지에서 태어난 천재 과학자.\n흩어진 요원들을 다시 불러 모아\n오버워치의 재결성을 이끌었습니다.',
    portrait: roster('winston'), mapImage: map('winston'),
  },
  {
    id: 'mercy', no: '04', en: 'MERCY', ko: '메르시', faction: 'OVERWATCH',
    facts: facts('ANGELA ZIEGLER', 'SUPPORT', 'ZÜRICH, SWITZERLAND', 'OVERWATCH'),
    description: '치유 기술의 새 지평을 연 의사.\n전장의 한가운데에서도 생명을\n먼저 생각하는 수호천사입니다.',
    portrait: roster('mercy'), mapImage: map('mercy'),
  },
  {
    id: 'genji', no: '05', en: 'GENJI', ko: '겐지', faction: 'OVERWATCH',
    facts: facts('GENJI SHIMADA', 'DAMAGE', 'NEPAL', 'OVERWATCH'),
    description: '사이버네틱 몸을 받아들인 닌자.\n수행 끝에 찾은 마음의 균형으로\n다시 세계를 위해 검을 듭니다.',
    portrait: roster('genji'), mapImage: map('genji'),
  },
  {
    id: 'soldier76', no: '06', en: 'SOLDIER: 76', ko: '솔저: 76', faction: 'INDEPENDENT',
    facts: facts('JACK MORRISON', 'DAMAGE', 'UNKNOWN', 'VIGILANTE'),
    description: '오버워치의 몰락 뒤에 숨은 진실을 쫓는\n전직 사령관. 홀로 싸우는 자경단으로\n여전히 정의를 좇고 있습니다.',
    portrait: roster('soldier76'),
  },
  {
    id: 'widowmaker', no: '07', en: 'WIDOWMAKER', ko: '위도우메이커', faction: 'TALON',
    facts: facts('AMÉLIE LACROIX', 'DAMAGE', 'ANNECY, FRANCE', 'TALON'),
    description: '탈론이 만들어 낸 냉혹한 저격수.\n감정을 지운 채 표적을 쫓으며\n오버워치와 끊임없이 부딪힙니다.',
    portrait: roster('widowmaker'), mapImage: map('widowmaker'),
  },
  {
    id: 'sombra', no: '08', en: 'SOMBRA', ko: '솜브라', faction: 'TALON',
    facts: facts('OLIVIA COLOMAR', 'DAMAGE', 'DORADO, MEXICO', 'TALON (FORMER)'),
    description: '세계의 비밀을 파고드는 해커.\n누구의 편도 아닌 자신만의 목적을 위해\n정보의 흐름을 움직입니다.',
    portrait: roster('sombra'), mapImage: map('sombra'),
  },
  {
    id: 'dva', no: '09', en: 'D.VA', ko: '디바', faction: 'INDEPENDENT',
    facts: facts('HANA SONG', 'TANK', 'BUSAN, SOUTH KOREA', 'MEKA'),
    description: '프로게이머 출신 메카 조종사.\n한국을 위협하는 거대 옴닉에 맞서\n최전선을 지키고 있습니다.',
    portrait: roster('dva'),
  },
  {
    id: 'ana', no: '10', en: 'ANA', ko: '아나', faction: 'OVERWATCH',
    facts: facts('ANA AMARI', 'SUPPORT', 'CAIRO, EGYPT', 'OVERWATCH'),
    description: '오버워치 창립 멤버이자 전설적인 저격수.\n오랜 침묵을 깨고 다시 전장으로 돌아와\n동료들을 지원합니다.',
    portrait: roster('ana'),
  },
]

/** 트레이서 중심 관계도 (Figma "Hero relationship map") — 카드 배치·선 좌표는 맵 프레임 기준 */
export type Relation = {
  heroId: string
  label: string
  code: string
  card: { x: number; y: number; w: number; h: number }
  image: { x: number; y: number; w: number; h: number }
  tone: 'neutral' | 'accent'
  /** 직교 연결선: [x, y, w, h][] + 끝점 */
  lines: [number, number, number, number][]
  endpoint: [number, number]
  labelAt: [number, number]
}

export const RELATIONS: Relation[] = [
  { heroId: 'winston', label: 'MENTOR', code: '// 01', tone: 'neutral', card: { x: 55, y: 0, w: 220, h: 182 }, image: { x: 66, y: -1, w: 198, h: 135 }, lines: [[397, 93, 1, 91], [275, 93, 123, 1]], endpoint: [271, 89], labelAt: [300, 77] },
  { heroId: 'reinhardt', label: 'TEAMMATE', code: '// 01', tone: 'neutral', card: { x: 658, y: 0, w: 243, h: 182 }, image: { x: 664, y: 0, w: 231, h: 134 }, lines: [[530, 93, 1, 91], [530, 93, 128, 1]], endpoint: [654, 89], labelAt: [548, 77] },
  { heroId: 'mercy', label: 'FRIEND', code: '// 02', tone: 'accent', card: { x: 0, y: 236, w: 220, h: 212 }, image: { x: 7, y: 236, w: 206, h: 161 }, lines: [[220, 316, 80, 1]], endpoint: [216, 312], labelAt: [230, 290] },
  { heroId: 'genji', label: 'TRUST', code: '// 01', tone: 'neutral', card: { x: 715, y: 236, w: 220, h: 212 }, image: { x: 721, y: 237, w: 208, h: 165 }, lines: [[610, 316, 105, 1]], endpoint: [711, 312], labelAt: [640, 290] },
  { heroId: 'widowmaker', label: 'RIVAL', code: '// 02', tone: 'accent', card: { x: 25, y: 508, w: 250, h: 190 }, image: { x: 45, y: 508, w: 210, h: 141 }, lines: [[395, 496, 1, 76], [275, 571, 121, 1]], endpoint: [271, 567], labelAt: [300, 548] },
  { heroId: 'sombra', label: 'CONFLICT', code: '// 02', tone: 'accent', card: { x: 656, y: 508, w: 250, h: 190 }, image: { x: 669, y: 508, w: 223, h: 142 }, lines: [[530, 571, 126, 1], [530, 496, 1, 76]], endpoint: [652, 567], labelAt: [550, 548] },
]

export const FACTION_FILTERS: { key: Faction | 'ALL'; count: string }[] = [
  { key: 'ALL', count: '/ 42' },
  { key: 'OVERWATCH', count: '/ 14' },
  { key: 'TALON', count: '/ 8' },
  { key: 'NULL SECTOR', count: '/ 6' },
  { key: 'INDEPENDENT', count: '/ 14' },
]
