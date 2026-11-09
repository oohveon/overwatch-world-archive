import { useEffect, useState, type ReactNode } from 'react'
import styles from './Stage.module.css'

type Props = {
  /** Figma 프레임 너비 */
  width: number
  /** Figma 프레임 높이 */
  height: number
  label: string
  children: ReactNode
}

function useViewport() {
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return size
}

/**
 * Figma 프레임 크기 그대로 레이아웃한 뒤, 뷰포트에 맞춰(contain) 균일하게 축소·확대한다.
 * 프레임 안 좌표는 모두 디자인 px 기준.
 */
export function Stage({ width, height, label, children }: Props) {
  const { w, h } = useViewport()
  const scale = Math.min(w / width, h / height)
  const x = (w - width * scale) / 2
  const y = (h - height * scale) / 2

  return (
    <main className={styles.viewport} aria-label={label}>
      <div
        className={`${styles.stage} page-enter`}
        style={{ width, height, transform: `translate(${x}px, ${y}px) scale(${scale})` }}
      >
        {children}
      </div>
    </main>
  )
}
