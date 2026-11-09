import { useEffect, useState, type CSSProperties } from 'react'
import styles from './DuoImage.module.css'

type Props = {
  src: string
  alt: string
  /** false면 흑백 상태로 머문다. true가 되는 순간 컬러가 사선으로 차오른다. */
  active?: boolean
  /** 경계를 따라 지나가는 오렌지 스캔 라인 (사각형 이미지에만 권장) */
  scan?: boolean
  delay?: number
  className?: string
  style?: CSSProperties
  imgStyle?: CSSProperties
}

/**
 * 흑백 사본 위로 컬러 이미지가 사선 와이프로 드러나는 이미지.
 * src가 바뀌면 다시 흑백에서 시작한다.
 */
export function DuoImage(props: Props) {
  return <DuoInner key={props.src} {...props} />
}

function DuoInner({ src, alt, active = true, scan = false, delay = 0, className, style, imgStyle }: Props) {
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (!active) return
    const id = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(id)
  }, [active])

  return (
    <span
      className={`${styles.wrap} ${on && active ? styles.on : ''} ${className ?? ''}`}
      style={{ ...style, ['--duo-delay' as string]: `${delay}ms` }}
    >
      <img src={src} alt="" aria-hidden className={styles.mono} style={imgStyle} />
      <img src={src} alt={alt} className={styles.color} style={imgStyle} />
      {scan && <span className={styles.scan} aria-hidden />}
    </span>
  )
}
