import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Gnb } from '../components/Gnb'
import { Stage } from '../components/Stage'
import { asset, at } from '../lib/layout'
import { useTypewriter } from '../lib/useTypewriter'
import styles from './Home.module.css'

// Figma 변형 세트 "Overwatch"(149:4757): O → OV → … → OVERWATCH
const WORD = 'OVERWATCH'
const STEPS = Array.from({ length: WORD.length }, (_, i) => WORD.slice(0, i + 1))

const COPY = {
  in: {
    title: (
      <>
        THE WORLD
        <br />
        NEEDED HEROES.
      </>
    ),
    sub: 'THE WORLD NEEDED HEROES.\nTHIS IS THEIR STORY.',
  },
  out: {
    title: (
      <>
        THE WORLD
        <br />
        NEEDS <em>YOU.</em>
      </>
    ),
    sub: 'THE WORLD NEEDS YOU.\nTHIS IS OUR STORY.',
  },
}

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return [now.getHours(), now.getMinutes(), now.getSeconds()].map((n) => String(n).padStart(2, '0')).join(' : ')
}

/** HOME — Figma "World archive — IN"(135:2306) → "World archive — OUT"(149:4784) */
export default function Home() {
  const { index, done } = useTypewriter(STEPS.length, { delay: 1600, interval: 110 })
  const clock = useClock()
  const phase = index === 0 ? 'in' : 'out'
  const copy = COPY[phase]

  return (
    <Stage width={1920} height={1080} label="Overwatch World Archive 홈">
      {/* 배경 그래픽 + 키 비주얼 */}
      <img className="deco" src={asset('home/bg.svg')} alt="" style={at(0, 0, 1920, 1080)} />
      <img
        className={`deco ${styles.keyVisual}`}
        src={asset('home/heroes.webp')}
        alt="라인하르트, 트레이서, 솔저: 76이 함께 선 키 비주얼"
        style={at(481, 146, 1439, 832)}
      />

      {/* 메인 타이포 */}
      <h1 className={`${styles.word} ${done ? '' : 'caret'}`} style={at(69, 452)} aria-label="OVERWATCH">
        {STEPS[index]}
      </h1>
      <div className={styles.copy} style={at(69, 632, 505)} key={phase}>
        <p className={styles.headline}>{copy.title}</p>
        <p className={`${styles.sub} pre`}>{copy.sub}</p>
        <p className={`${styles.subKr} pre`}>{'세계를 지켜온 영웅들의 기록.\n오버워치의 세계와 이야기를 탐색하세요.'}</p>
      </div>

      <Gnb active="home" stageWidth={1920} />

      <div className={styles.info} style={at(66, 201, 300)}>
        <p className={styles.infoTitle}>001 / GLOBAL FORCE</p>
        <p className={styles.infoSub}>WORLD ARCHIVE / ORGANIZATION</p>
      </div>

      <div className={styles.location} style={at(68, 871, 550)}>
        <div className={styles.locationImage}>
          <img src={asset('home/location.webp')} alt="오버워치 지브롤터 기지 전경" />
        </div>
        <div className={styles.locationText}>
          <p className={styles.label}>LOCATION INFO</p>
          <p className={`${styles.locationLines} pre`}>
            {'OVERWATCH HQ\nGIBRALTAR / EUROPE\nWATCHPOINT : GIBRALTAR\n36°08′ N  /  05°21′ W\n'}
            <time>{clock}</time>
          </p>
        </div>
      </div>

      <dl className={styles.meta} style={at(1602, 858, 254)}>
        <div>
          <dt className={styles.label}>TIMELINE / ERA</dt>
          <dd className={styles.era}>2076 — PRESENT</dd>
        </div>
        <div>
          <dt className={styles.keyword}>KEYWORD</dt>
          <dd className={`${styles.keywords} pre`}>{'COOPERATION / HEROES\nA BETTER WORLD\nARCHIVE ACCESS : OPEN'}</dd>
        </div>
      </dl>

      <Link to="/story" className={styles.scroll} style={at(919, 986, 82)}>
        SCROLL
        <span aria-hidden>↓</span>
      </Link>

      <p className={styles.footer} style={at(68, 1026)}>
        <span>© OVERWATCH WORLD ARCHIVE</span>
        <span>DATABASE VER. 01</span>
      </p>

      <img className="deco" src={asset('home/line-1.svg')} alt="" style={at(972.26, 666.5, 216, 209)} />
      <img className="deco" src={asset('home/line-2.svg')} alt="" style={at(1366, 881, 163, 202)} />
      <img className="deco" src={asset('home/line-3.svg')} alt="" style={at(1262.5, 859, 105, 25)} />

      <div style={at(1563, 674, 293)}>
        {phase === 'in' ? (
          <Link to="/story" className={styles.cta}>
            ENTER ARCHIVE
            <img src={asset('home/cta-arrow.svg')} alt="" width={36} height={20} />
          </Link>
        ) : (
          <a className={styles.cta} href="https://overwatch.blizzard.com" target="_blank" rel="noreferrer">
            PLAY OVERWATCH
            <img src={asset('home/cta-arrow.svg')} alt="" width={36} height={20} />
          </a>
        )}
      </div>
    </Stage>
  )
}
