import type { CSSProperties } from 'react'

/** Figma 프레임 좌표(px) 그대로 절대 배치하기 위한 헬퍼 */
export function at(x: number, y: number, w?: number, h?: number, extra?: CSSProperties): CSSProperties {
  return { position: 'absolute', left: x, top: y, width: w, height: h, ...extra }
}

/** public/ 아래 에셋 경로 */
export const asset = (path: string) => `/assets/${path}`
