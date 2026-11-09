import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NAV_ITEMS } from '../components/nav'

const ORDER = NAV_ITEMS.map((n) => n.to)
const LOCK_MS = 1100 // 라우트 와이프(0.85s)가 끝날 때까지 추가 입력 무시
const WHEEL_THRESHOLD = 40
const SWIPE_THRESHOLD = 60

function pageIndex(pathname: string) {
  if (pathname === '/') return 0
  return ORDER.findIndex((to, i) => i > 0 && (pathname === to || pathname.startsWith(`${to}/`)))
}

/**
 * 휠(아래/위)·세로 스와이프로 GNB 순서대로 페이지를 넘긴다.
 * 내부에서 휠을 직접 쓰는 영역(Story 타임라인)은 이벤트 전파를 막아 제외한다.
 */
export function usePagedScroll() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const state = useRef({ pathname, lockUntil: 0, acc: 0, touchY: null as number | null })

  useEffect(() => {
    state.current.pathname = pathname
    state.current.acc = 0
  }, [pathname])

  useEffect(() => {
    const s = state.current

    const go = (dir: 1 | -1) => {
      s.acc = 0
      if (document.querySelector('[role="dialog"]')) return
      const now = performance.now()
      if (now < s.lockUntil) return
      const i = pageIndex(s.pathname)
      const next = ORDER[i + dir]
      if (i < 0 || !next) return
      s.lockUntil = now + LOCK_MS
      navigate(next)
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return
      if (performance.now() < s.lockUntil) return
      s.acc += e.deltaY
      if (Math.abs(s.acc) >= WHEEL_THRESHOLD) go(s.acc > 0 ? 1 : -1)
    }
    const onTouchStart = (e: TouchEvent) => {
      s.touchY = e.touches[0]?.clientY ?? null
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (s.touchY === null) return
      const dy = s.touchY - (e.changedTouches[0]?.clientY ?? s.touchY)
      s.touchY = null
      if (Math.abs(dy) >= SWIPE_THRESHOLD) go(dy > 0 ? 1 : -1)
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [navigate])
}
