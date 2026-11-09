import { useEffect, useRef } from 'react'

/** 키보드 ←/→ 에 최신 콜백을 연결한다. */
export function useArrowKeys(onLeft: () => void, onRight: () => void) {
  const handlers = useRef({ onLeft, onRight })

  useEffect(() => {
    handlers.current = { onLeft, onRight }
  })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlers.current.onLeft()
      if (e.key === 'ArrowRight') handlers.current.onRight()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
