export type NavKey = 'home' | 'story' | 'hero' | 'world' | 'archive'

export const NAV_ITEMS: { key: NavKey; label: string; ko: string; to: string }[] = [
  { key: 'home', label: 'HOME', ko: '홈', to: '/' },
  { key: 'story', label: 'STORY', ko: '스토리 타임라인', to: '/story' },
  { key: 'hero', label: 'HERO', ko: '영웅 소개', to: '/hero' },
  { key: 'world', label: 'WORLD', ko: '영웅들의 관계', to: '/world' },
  { key: 'archive', label: 'ARCHIVE', ko: '영상 아카이브', to: '/archive' },
]
