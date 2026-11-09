import { asset } from '../lib/layout'

/**
 * ARCHIVE 페이지 데이터 — Figma "Overwatch world archive"(135:2653).
 * 트레이서 소개 문구는 Figma 원문, 나머지 영상의 부제·소개는 초안이다.
 */
export type VideoCategory = 'HERO INTRO' | 'STORY' | 'CINEMATIC' | 'ARCHIVE LOG'

export type Video = {
  no: string
  file: string
  title: string
  subtitle: string
  kind: string
  category: VideoCategory
  duration: string
  description: string
  thumb: string
  cover: string
}

const thumb = (n: string) => asset(`archive/v-${n}.webp`)

export const VIDEOS: Video[] = [
  {
    no: '01', file: 'FILE 002', title: 'TRACER ORIGIN', subtitle: '트레이서 - 새로운 시작', kind: 'HERO INTRODUCTION',
    category: 'HERO INTRO', duration: '02:18',
    description: '시간을 넘어 다시 우리 곁으로 돌아온 영웅.\n이름은 트레이서.\n그녀의 빛나는 도전, 그리고 미래를 향한\n첫 시작을 만나보세요.',
    thumb: thumb('01'), cover: asset('archive/v-main.webp'),
  },
  {
    no: '02', file: 'FILE 003', title: 'REINHARDT ORIGIN', subtitle: '라인하르트 - 명예의 맹세', kind: 'HERO INTRODUCTION',
    category: 'HERO INTRO', duration: '03:05',
    description: '시대가 바뀌어도 꺾이지 않는 기사도.\n노병 라인하르트가 다시 망치를 든\n이유를 들어 보세요.',
    thumb: thumb('02'), cover: thumb('02'),
  },
  {
    no: '03', file: 'FILE 004', title: 'MERCY ORIGIN', subtitle: '메르시 - 생명의 수호자', kind: 'HERO INTRODUCTION',
    category: 'HERO INTRO', duration: '02:49',
    description: '전장의 한가운데에서도 생명을 먼저 생각하는\n의사 앙겔라 치글러.\n수호천사가 된 그녀의 이야기를 만나보세요.',
    thumb: thumb('03'), cover: thumb('03'),
  },
  {
    no: '04', file: 'FILE 005', title: 'OVERWATCH FORMED', subtitle: '오버워치의 창설', kind: 'STORY ARCHIVE',
    category: 'STORY', duration: '04:32',
    description: '옴닉 사태에 맞서 하나로 모인 영웅들.\n국제 기동 부대 오버워치가\n탄생하던 순간을 기록했습니다.',
    thumb: thumb('04'), cover: thumb('04'),
  },
  {
    no: '05', file: 'FILE 006', title: 'WINSTON ORIGIN', subtitle: '윈스턴 - 달에서 온 과학자', kind: 'HERO INTRODUCTION',
    category: 'HERO INTRO', duration: '02:55',
    description: '달 기지에서 태어난 천재 과학자 윈스턴.\n그가 다시 영웅들을 부르게 된\n이야기를 만나보세요.',
    thumb: thumb('05'), cover: thumb('05'),
  },
  {
    no: '06', file: 'FILE 007', title: 'SHOOTING STAR', subtitle: '디바 - 별똥별', kind: 'ANIMATED SHORT',
    category: 'CINEMATIC', duration: '03:48',
    description: '부산을 지키는 메카 조종사 송하나.\n화려한 무대 뒤에 감춰진\n그녀의 각오를 담은 단편입니다.',
    thumb: thumb('06'), cover: thumb('06'),
  },
]

export const VIDEO_CATEGORIES: ('ALL' | VideoCategory)[] = ['ALL', 'HERO INTRO', 'STORY', 'CINEMATIC', 'ARCHIVE LOG']
