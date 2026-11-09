import { asset } from '../lib/layout'

/**
 * HERO 페이지(Figma "OVERWATCH HEROES" 135:2478) 데이터.
 * 트레이서는 Figma 원문 그대로이고, 나머지 영웅의 대사·소개·태그라인은 디자인에 없어 작성한 초안이다.
 */
export type Hero = {
  id: string
  no: string
  ko: string
  en: string
  realName: string
  role: string
  quote: string
  affiliation: string
  bio: string
  tagline: string
  abilities: { name: string; icon?: string }[]
  image: string
  /** 하단 셀렉터 카드 안에서의 이미지 박스 (그룹 기준 좌표, Figma 값) */
  thumb: { x: number; y: number; w: number; h: number }
}

const heroImg = (id: string) => asset(`hero/${id}.webp`)

export const HEROES: Hero[] = [
  {
    id: 'tracer',
    no: '01',
    ko: '트레이서',
    en: 'TRACER',
    realName: 'LENA OXTON',
    role: '공격',
    quote: '“안녕, 친구들! 세상을 구할 시간이야!”',
    affiliation: '오버워치 (전 오버워치 요원)',
    bio: '오버워치를 대표하는 마스코트이자 초창기 시네마틱\n트레일러의 주인공. 시간을 조작하는 능력을 통해\n언제나 한발 앞서 움직이며 전장을 누빈다.',
    tagline: 'SPEED\nCONNECTS\nOUR\nTOMORROW.',
    abilities: [
      { name: '점멸', icon: asset('hero/ability-1.png') },
      { name: '시간 역행', icon: asset('hero/ability-2.png') },
      { name: '펄스 폭탄', icon: asset('hero/ability-3.png') },
    ],
    image: heroImg('tracer'),
    thumb: { x: 183.4, y: 8, w: 250, h: 167 },
  },
  {
    id: 'genji',
    no: '02',
    ko: '겐지',
    en: 'GENJI',
    realName: 'GENJI SHIMADA',
    role: '공격',
    quote: '“내 안의 용이 깨어난다.”',
    affiliation: '오버워치 (전 블랙워치)',
    bio: '시마다 가문의 후계자였으나 형과의 결투 끝에\n사이버네틱 몸을 얻은 닌자. 수행을 통해\n인간과 기계 사이의 균형을 찾아냈다.',
    tagline: 'BALANCE\nFORGES\nTHE\nBLADE.',
    abilities: [{ name: '질풍참' }, { name: '튕겨내기' }, { name: '용검' }],
    image: heroImg('genji'),
    thumb: { x: 154.25, y: 14, w: 347, h: 163 },
  },
  {
    id: 'winston',
    no: '03',
    ko: '윈스턴',
    en: 'WINSTON',
    realName: 'WINSTON',
    role: '돌격',
    quote: '“과학의 힘을 보여 주지!”',
    affiliation: '오버워치',
    bio: '달 기지에서 유전자 실험으로 태어난 천재 과학자.\n해체된 오버워치를 다시 불러 모으며\n세계를 지키기 위한 부름을 시작했다.',
    tagline: 'SCIENCE\nLEAPS\nTOWARD\nHOPE.',
    abilities: [{ name: '점프 팩' }, { name: '방벽 생성기' }, { name: '원시의 분노' }],
    image: heroImg('winston'),
    thumb: { x: 180, y: 11, w: 307, h: 166 },
  },
  {
    id: 'reaper',
    no: '04',
    ko: '리퍼',
    en: 'REAPER',
    realName: 'GABRIEL REYES',
    role: '공격',
    quote: '“죽음이 찾아왔다.”',
    affiliation: '탈론 (전 블랙워치 지휘관)',
    bio: '블랙워치를 이끌던 지휘관이었으나\n스위스 본부 사건 이후 그림자 속 존재가 되었다.\n오버워치에 얽힌 진실을 쫓는 복수자.',
    tagline: 'SHADOWS\nNEVER\nFORGET.',
    abilities: [{ name: '망령화' }, { name: '그림자 밟기' }, { name: '죽음의 꽃' }],
    image: heroImg('reaper'),
    thumb: { x: 152, y: 27, w: 356, h: 150 },
  },
  {
    id: 'mercy',
    no: '05',
    ko: '메르시',
    en: 'MERCY',
    realName: 'ANGELA ZIEGLER',
    role: '지원',
    quote: '“영웅은 죽지 않아요.”',
    affiliation: '오버워치',
    bio: '나노 생물학으로 치유 기술의 새 지평을 연 의사.\n발키리 슈트를 입고 전장의 동료들을\n끝까지 지켜 내는 수호천사.',
    tagline: 'HEALING\nGUARDS\nOUR\nFUTURE.',
    abilities: [{ name: '수호천사' }, { name: '부활' }, { name: '발키리' }],
    image: heroImg('mercy'),
    thumb: { x: 150, y: 22, w: 356, h: 155 },
  },
]
