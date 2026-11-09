import { useRef, useState, type WheelEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Crosshair } from '../components/Crosshair'
import { DuoImage } from '../components/DuoImage'
import { GnbWide } from '../components/Gnb'
import { Stage } from '../components/Stage'
import { CHAPTERS, chapterIndex } from '../data/chapters'
import { asset, at } from '../lib/layout'
import { useArrowKeys } from '../lib/useArrowKeys'
import { useTypewriter } from '../lib/useTypewriter'
import styles from './Story.module.css'

// Figma 변형 세트 "02"(135:3738) — 인트로 타이핑 단계
const LINE_1 = ['T', 'TH', 'THE', 'THE H', 'THE HI', 'THE HIS', 'THE HIST', 'THE HISTO', 'THE HISTOR', 'THE HISTORY']
const LINE_2 = ['O', 'OF', 'OF O', 'OF OV', 'OF OVE', 'OF OVER', 'OF OVERW', 'OF OVERWA', 'OF OVERWATC', 'OF OVERWATCH']
const LINE_KR = ['세', '세상', '세상을', '세상을 더', '세상을 더 밝', '세상을 더 밝은', '세상을 더 밝은 내', '세상을 더 밝은 내일', '세상을 더 밝은 내일로', '세상을 더 밝은 내일로.']

const CARD_X0 = 122
const CARD_STEP = 420
const cardX = (i: number) => CARD_X0 + CARD_STEP * i

const VIDEO_CLIP = 'polygon(165.958px 0.6px, 1113.07px 0.6px, 950.048px 357.641px, 0.94px 357.641px)'
const THUMB_CLIP = 'polygon(76.414px 0, 384.835px 0, 295.757px 154px, 0 153.133px)'

/** STORY — Figma "OVERWATCH / STORY"(135:2372) + 인터랙션 명세(84:15457) */
export default function Story() {
  const [params, setParams] = useSearchParams()
  const [selected, setSelected] = useState(() => chapterIndex(params.get('c')))
  const [hover, setHover] = useState<number | null>(null)
  const [manualPlay, setManualPlay] = useState(false)
  const intro = useTypewriter(LINE_1.length, { delay: 450, interval: 120 })

  const previewIndex = hover ?? selected
  const preview = CHAPTERS[previewIndex]
  const playing = hover !== null || manualPlay

  // 선택은 URL(?c=)에도 남겨서 상세 → BACK TO TIMELINE 시 그대로 복원
  const select = (i: number) => {
    const next = Math.max(0, Math.min(CHAPTERS.length - 1, i))
    setSelected(next)
    setManualPlay(false)
    setParams({ c: CHAPTERS[next].id }, { replace: true })
  }

  // 키보드 ←/→ 와 타임라인 위 마우스 휠로 챕터 이동
  useArrowKeys(
    () => select(selected - 1),
    () => select(selected + 1),
  )
  const wheelLock = useRef(0)

  const onWheel = (e: WheelEvent<HTMLElement>) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    if (Math.abs(delta) < 8 || e.timeStamp - wheelLock.current < 450) return
    wheelLock.current = e.timeStamp
    select(selected + (delta > 0 ? 1 : -1))
  }

  return (
    <Stage width={3200} height={1080} label="오버워치 스토리 타임라인">
      {/* 00 / 배경 */}
      <img className="deco px-1" src={asset('story/bg-big.svg')} alt="" style={at(362, -317, 2705, 1723)} />
      <img className="deco" src={asset('story/upper-contour.svg')} alt="" style={at(505, 0, 1823, 279)} />
      <img className="deco" src={asset('story/stripe-top.svg')} alt="" style={at(2303, 0, 224, 180)} />
      <img className="deco" src={asset('story/stripe-left.svg')} alt="" style={at(833, 321, 133, 260)} />
      <img className="deco" src={asset('story/ribbon-bottom.svg')} alt="" style={at(2140, 1039, 260, 41)} />
      <img className="deco" src={asset('story/grid.svg')} alt="" style={at(0, 0, 3200, 1080)} />
      <Crosshair cx={724} cy={80} size={34} dot="#737373" />
      <Crosshair cx={1020} cy={430} size={30} dot="#737373" />
      <Crosshair cx={3137} cy={460} size={40} dot="#737373" />
      <Crosshair cx={80} cy={545} size={54} dot="#737373" />
      <Crosshair cx={2718} cy={197} size={24} dot="#737373" />

      {/* 02 / 인트로 */}
      <section className={styles.intro} style={at(92, 217, 615, 355)} aria-label="스토리 소개">
        <img src={asset('story/flag.svg')} alt="" style={at(0, 0, 30, 34)} />
        <p className={styles.introKicker} style={at(54, -4)}>STORY</p>
        <h1 className={styles.introTitle} aria-label="THE HISTORY OF OVERWATCH">
          <span style={at(54, 41)} aria-hidden>{LINE_1[intro.index]}</span>
          <span style={at(54, 118)} aria-hidden className={intro.done ? '' : 'caret'}>
            {LINE_2[intro.index]}
          </span>
        </h1>
        <p className={styles.introTagline} style={at(56, 210)}>{LINE_KR[intro.index]}</p>
        <span className={`deco ${styles.introRule} ${intro.done ? styles.ruleOn : ''}`} style={at(390, 226, 70, 1.5)} />
        <p className={`${styles.introBody} pre`} style={at(54, 265, 570)}>
          {'오버워치의 시작은 한 번의 위기로부터 출발했습니다.\n그리고 지금도, 더 나은 내일을 향한 이야기는 계속되고 있습니다.\n가운데의 타임라인을 따라, 새로운 세계의 기록을 탐험해보세요.'}
        </p>
      </section>

      <GnbWide active="story" />

      {/* 03 / 상단 미리보기 */}
      <section style={at(855, 164, 1925, 430)} aria-label="챕터 미리보기" aria-live="polite">
        <img className="deco" src={asset('story/outer-contour.svg')} alt="" style={at(0, 0, 1926, 432)} />
        <img className="deco" src={asset('story/top-rail.svg')} alt="" style={at(171, 0, 1230, 20)} />
        <img className="deco" src={asset('story/top-rail-shaded.svg')} alt="" style={at(1229, 0, 167, 18)} />

        <div className={`${styles.video} ${playing ? styles.playing : ''}`} style={at(171, 27, 1114, 359, { clipPath: VIDEO_CLIP })}>
          <DuoImage src={preview.image} alt={`${preview.ko} 장면`} className={styles.videoImage} scan />
          <div className={styles.videoShade} />
          {playing && (
            <div className={styles.progress} style={at(230, 318, 690, 3)}>
              <span key={preview.id} />
            </div>
          )}
        </div>
        <svg className="deco" style={at(171, 27, 1114, 359)} viewBox="0 0 1114 359" aria-hidden>
          <path d="M165.958 0.6H1113.07L950.048 357.641H0.938L165.958 0.6Z" stroke="#707070" strokeWidth="1.2" fill="none" />
        </svg>

        <p className={styles.videoMeta} style={at(367, 56)}>
          <span className={styles.videoKicker}>{playing ? 'PLAYING PREVIEW' : 'STORY VIDEO'}</span>
          <span>{preview.en}</span>
          <span>{preview.duration ?? `CHAPTER ${preview.id}`}</span>
        </p>

        <button
          className={styles.play}
          style={at(675, 154, 104, 104)}
          onClick={() => setManualPlay((p) => !p)}
          aria-label={playing ? '미리보기 일시 정지' : '미리보기 재생'}
        >
          {playing ? (
            <svg viewBox="0 0 104 104" aria-hidden>
              <circle cx="52" cy="52" r="51" stroke="#F7F7F7" strokeWidth="2" fill="none" />
              <rect x="40" y="35" width="8" height="34" fill="#FAFAFA" />
              <rect x="56" y="35" width="8" height="34" fill="#FAFAFA" />
            </svg>
          ) : (
            <img src={asset('story/play.svg')} alt="" />
          )}
        </button>

        <Link to={`/story/${preview.id}`} className={styles.expand} style={at(1203, 47, 34, 34)} aria-label={`${preview.ko} 상세 보기`}>
          <img src={asset('story/expand-arrow.svg')} alt="" style={at(4, -3, 31, 31)} />
        </Link>
        <img className="deco" src={asset('story/video-mark.svg')} alt="" style={at(158, 341, 27, 61)} />

        <img className="deco" src={asset('story/panel.svg')} alt="" style={at(1118, 56, 680, 350)} />
        <img className="deco" src={asset('story/panel-rail.svg')} alt="" style={at(1285, 56, 380, 2)} />
        <div key={preview.id} className={styles.panelText}>
          <p className={styles.panelNo} style={at(1312, 75)}>{preview.id}</p>
          <p className={styles.panelEn} style={at(1312, 133)}>{preview.en}</p>
          <h2 className={styles.panelKo} style={at(1312, 159)}>{preview.ko}</h2>
          <p className={`${styles.panelBody} pre`} style={at(1312, 228, 470)}>{preview.summary}</p>
        </div>
        <Link to={`/story/${preview.id}`} className={styles.details} style={at(1312, 331, 182, 50)}>
          자세히 보기
          <img src={asset('story/details-arrow.svg')} alt="" width={30} height={14} />
        </Link>
        <img className="deco" src={asset('story/panel-hatch.svg')} alt="" style={at(1148, 374, 20, 16)} />
        <img className="deco" src={asset('story/outer-end.svg')} alt="" style={at(1792, 352, 38, 78)} />
      </section>

      {/* 04 / 아카이브 메모 */}
      <aside className={styles.note} style={at(2902, 198, 290, 187)}>
        <span className="deco" style={at(0, 0, 1, 183, { background: '#b2b2b2' })} />
        <span className="deco" style={at(0, 183, 104, 1, { background: '#b2b2b2' })} />
        <p className={styles.noteTitle} style={at(23, 40)}>ARCHIVE</p>
        <p className={`${styles.noteBody} pre`} style={at(23, 78)}>{'OUR HISTORY\nSHAPES A BRIGHTER\nTOMORROW.'}</p>
      </aside>

      {/* 05 / 타임라인 */}
      <section style={at(0, 657, 3200, 249)} aria-label="챕터 타임라인" onWheel={onWheel}>
        <span className="deco" style={at(47, 238, 3018, 1.5, { background: '#929292' })} />
        {hover !== null && hover !== selected && (
          <span className={`deco ${styles.trackHover}`} style={at(cardX(hover) - 64, 234, 382, 10)} />
        )}
        <span className={`deco ${styles.trackActive}`} style={at(cardX(selected) - 64, 234, 382, 10)} />
        <img className={`deco ${styles.rail}`} src={asset('story/chapter-rail.svg')} alt="" style={at(cardX(selected) - 10, 0, 345, 231)} />

        <ol className={styles.cards}>
          {CHAPTERS.map((c, i) => {
            const isSelected = i === selected
            return (
              <li key={c.id} style={at(cardX(i), 0, 436, 242)}>
                <button
                  className={`${styles.card} ${isSelected ? styles.cardSelected : ''} ${hover === i ? styles.cardHover : ''}`}
                  onClick={() => select(i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  aria-pressed={isSelected}
                  aria-label={`${c.id} ${c.ko} ${c.en}`}
                >
                  <svg className={styles.cardPanel} viewBox="0 0 438 221" aria-hidden>
                    <path d="M111.812 0.5H436.812L308.812 220.5H0.8125L111.812 0.5Z" />
                  </svg>
                  <span className={styles.thumb} style={at(39.5, 6, 385, 154, { clipPath: THUMB_CLIP })}>
                    <img src={c.image} alt="" />
                  </span>
                  <span className={styles.cardNo} style={at(37, 152)}>{c.id}</span>
                  <span className={styles.cardTitle} style={at(c.id === '01' ? 86 : 93, 168)}>
                    <span className={styles.cardEn}>{c.en}</span>
                    <span className={styles.cardKo}>{c.ko}</span>
                  </span>
                  <img
                    src={asset(isSelected ? 'story/hex-selected.svg' : 'story/hex-default.svg')}
                    alt=""
                    style={at(33.5, 224.5, 33, 29)}
                  />
                  {isSelected && (
                    <span className={styles.activeRail} style={at(187, -15, 251, 15)}>
                      <img src={asset('story/card-active-rail.svg')} alt="" />
                      <span>VIDEO</span>
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ol>
      </section>

      {/* 06 / 하단 */}
      <p className={`${styles.footer} pre`} style={at(71, 987)}>{'OVERWATCH WORLD ARCHIVE\nSTORY TIMELINE'}</p>
      <button
        className={styles.arrow}
        style={at(2960, 960, 72, 72)}
        onClick={() => select(selected - 1)}
        disabled={selected === 0}
        aria-label="이전 챕터"
      >
        <svg width="25" height="22" viewBox="0 0 25 22" aria-hidden>
          <path d="M25 10.9353H1.05044M10.422 21.3481L1.05044 10.9353L10.422 0.522422" strokeWidth="1.56" fill="none" />
        </svg>
      </button>
      <button
        className={styles.arrow}
        style={at(3067, 960, 72, 72)}
        onClick={() => select(selected + 1)}
        disabled={selected === CHAPTERS.length - 1}
        aria-label="다음 챕터"
      >
        <svg width="25" height="22" viewBox="0 0 25 22" aria-hidden>
          <path d="M0 10.9353H23.9496M14.578 21.3481L23.9496 10.9353L14.578 0.522422" strokeWidth="1.56" fill="none" />
        </svg>
      </button>
    </Stage>
  )
}
