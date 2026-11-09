import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Ambient.module.css'

/**
 * 전역 연출
 * - 포인터 위치를 CSS 변수(--mx, --my: -1~1)로 노출 → .px-* 패럴랙스
 * - 조준선 커서 (마우스 기기에서만)
 * - 라우트 전환 시 오렌지/블랙 사선 와이프
 */
export function Ambient() {
  const cursor = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const root = document.documentElement
    let frame = 0
    let x = 0
    let y = 0
    let hot = false

    const render = () => {
      frame = 0
      root.style.setProperty('--mx', ((x / window.innerWidth) * 2 - 1).toFixed(3))
      root.style.setProperty('--my', ((y / window.innerHeight) * 2 - 1).toFixed(3))
      const el = cursor.current
      if (el) {
        el.style.transform = `translate(${x}px, ${y}px)`
        el.classList.toggle(styles.hot, hot)
      }
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      hot = !!(e.target as Element | null)?.closest?.('a, button')
      cursor.current?.classList.add(styles.visible)
      if (!frame) frame = requestAnimationFrame(render)
    }
    const onLeave = () => cursor.current?.classList.remove(styles.visible)
    const onDown = () => cursor.current?.classList.add(styles.press)
    const onUp = () => cursor.current?.classList.remove(styles.press)

    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <>
      <div key={pathname} className={styles.wipe} aria-hidden>
        <span className={styles.wipeDark} />
        <span className={styles.wipeOrange} />
      </div>
      <div ref={cursor} className={styles.cursor} aria-hidden>
        <span className={styles.ring} />
        <span className={styles.dot} />
      </div>
    </>
  )
}
