type Props = {
  cx: number
  cy: number
  size: number
  color?: string
  strokeWidth?: number
  dot?: string
}

/** 기술 도면 느낌의 십자 표식 (Figma "Technical / crosshair") */
export function Crosshair({ cx, cy, size, color = '#b2b2b2', strokeWidth = 1, dot }: Props) {
  const r = size / 2
  return (
    <svg
      className="deco"
      style={{ left: cx - r, top: cy - r }}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
    >
      <path d={`M0 ${r}H${size}M${r} 0V${size}`} stroke={color} strokeWidth={strokeWidth} />
      {dot && <rect x={r - 1} y={r - 1} width={2} height={2} fill={dot} />}
    </svg>
  )
}
