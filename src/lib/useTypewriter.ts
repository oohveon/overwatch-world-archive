import { useEffect, useState } from 'react'

/**
 * steps 길이만큼 0 → steps-1 로 증가하는 인덱스.
 * Figma 변형 세트(Variant1..N)로 만든 타이핑 애니메이션을 그대로 재생할 때 사용.
 */
export function useTypewriter(steps: number, { delay = 0, interval = 90 } = {}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let timer: number
    let i = 0
    const tick = () => {
      i += 1
      setIndex(i)
      if (i < steps - 1) timer = window.setTimeout(tick, interval)
    }
    timer = window.setTimeout(tick, delay)
    return () => window.clearTimeout(timer)
  }, [steps, delay, interval])

  return { index, done: index >= steps - 1 }
}
