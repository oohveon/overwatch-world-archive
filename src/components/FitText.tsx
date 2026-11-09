import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

type Props = {
  text: string
  maxSize: number
  maxWidth: number
  /** line-height / font-size 비율 (기본: Russo One 131px / 102px) */
  lineRatio?: number
  className?: string
  style?: CSSProperties
}

/** 가장 긴 줄이 maxWidth를 넘지 않도록 글자 크기를 줄인다 (줄바꿈은 \n). */
export function FitText({ text, maxSize, maxWidth, lineRatio = 102 / 131, className, style }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [size, setSize] = useState(maxSize)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      // 최대 크기로 잠깐 바꿔 자연 너비를 잰 뒤 원래 값으로 되돌린다 (state가 같으면 리렌더가 없으므로)
      const prev = el.style.fontSize
      el.style.fontSize = `${maxSize}px`
      const natural = el.scrollWidth
      el.style.fontSize = prev
      setSize(natural > maxWidth ? Math.floor((maxSize * maxWidth) / natural) : maxSize)
    }
    fit()
    document.fonts?.ready.then(fit)
  }, [text, maxSize, maxWidth])

  return (
    <span
      ref={ref}
      className={className}
      style={{ ...style, display: 'inline-block', whiteSpace: 'pre', fontSize: size, lineHeight: `${lineRatio * size}px` }}
    >
      {text}
    </span>
  )
}
