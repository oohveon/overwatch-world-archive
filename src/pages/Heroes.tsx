import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { DuoImage } from '../components/DuoImage'
import { Gnb } from '../components/Gnb'
import { Stage } from '../components/Stage'
import { HEROES } from '../data/heroes'
import { WORLD_HEROES } from '../data/world'
import { asset, at } from '../lib/layout'
import { useArrowKeys } from '../lib/useArrowKeys'
import styles from './Heroes.module.css'

// 하단 셀렉터 그룹 위치 (Figma: TRACER 65 / GENJI 538 / WINSTON 1022 / REAPER 1498 / MERCY 1980)
const SELECTOR_X = [65, 538, 1022, 1498, 1980]
const SELECTOR_Y = 810

/** HERO — Figma "OVERWATCH HEROES"(135:2478) */
export default function Heroes() {
  const [params, setParams] = useSearchParams()
  const [index, setIndexState] = useState(() => Math.max(0, HEROES.findIndex((h) => h.id === params.get('hero'))))
  const hero = HEROES[index]
  const setIndex = (i: number) => {
    setIndexState(i)
    setParams({ hero: HEROES[i].id }, { replace: true })
  }
  const go = (i: number) => setIndex((i + HEROES.length) % HEROES.length)

  // 키보드 ←/→ 로 영웅 이동
  useArrowKeys(
    () => go(index - 1),
    () => go(index + 1),
  )

  return (
    <Stage width={2700} height={1080} label="오버워치 영웅 소개">
      <img className="deco" src={asset('hero/hud.svg')} alt="" style={at(0, 0, 2700, 1080)} />
      <Gnb active="hero" stageWidth={2700} />
      <img className="deco px-1" src={asset('hero/bg-big.svg')} alt="" style={at(327, 0, 2083, 1080)} />

      {/* 히어로 비주얼 */}
      <section style={at(472.5, 148.5, 1498.5, 629.1)} aria-label={`${hero.ko} 비주얼`}>
        <img className="deco px-1" src={asset('hero/visual-back.svg')} alt="" style={at(0, 0, 1498.5, 629.1)} />
        <p key={`n-${hero.id}`} className={`${styles.bigName} px-3`} style={at(148.5, 128.25)} aria-hidden>
          {hero.en}
        </p>
        <img className="deco" src={asset('hero/visual-front.svg')} alt="" style={at(0, 0, 1498.5, 629.1)} />
        <div className={styles.hudLabel} style={at(284.85, 35.1)}>
          <svg width="24" height="49" viewBox="0 0 24.3 48.6" aria-hidden>
            <path d="M24.3 0.5H0.5V48.1H24.3" stroke="#DDD" strokeWidth="1.08" fill="none" />
          </svg>
          <span className="pre">{`HERO VISUAL\n${hero.en}`}</span>
        </div>
        {/* 흑백 실루엣으로 등장 → 컬러로 차오름 */}
        <DuoImage
          key={`i-${hero.id}`}
          className={`${styles.heroImage} px-2`}
          src={hero.image}
          alt={hero.ko}
          delay={200}
          style={at(242.5, -21.5, 939, 626)}
          imgStyle={{ objectPosition: 'top center' }}
        />
      </section>

      {/* 소개 */}
      <section style={at(101.25, 195.75, 445.5, 580.5)} aria-label="영웅 소개">
        <img src={asset('hero/section-marker.svg')} alt="" style={at(0, 0, 25.65, 29.7)} />
        <div className={styles.intro} style={at(49.95, 0, 445.5)}>
          <p className={styles.introKicker}>HEROES</p>
          <h1 className={styles.introTitle}>
            MEET
            <br />
            THE HEROES
          </h1>
          <p className={styles.introTagline}>
            세 상 을 &nbsp;더 &nbsp;밝 은 &nbsp;내 일 로.
            <span />
          </p>
          <p className={`${styles.introBody} pre`}>
            {'각기 다른 배경과 신념을 가진 영웅들이\n세상을 더 나은 방향으로 이끌기 위해 싸우고 있습니다.\n지금, 그들의 이야기를 만나보세요.'}
          </p>
        </div>
        <p className={`${styles.orangeNote} pre`} style={at(36.45, 476.55)}>{'ARCHIVE\nOUR HEROES\nSHAPES\nA BRIGHTER\nTOMORROW.'}</p>
      </section>

      {/* 프로필 */}
      <section className={styles.profile} style={at(2027.7, 167.4, 594, 594)} aria-label={`${hero.ko} 프로필`} aria-live="polite">
        <div key={hero.id} className={styles.profileBody} style={at(0, 0, 405)}>
          <div className={styles.identifier}>
            <span className={styles.idNo}>{hero.no}</span>
            <span className={styles.idEn}>{hero.en}</span>
          </div>
          <h2 className={styles.name}>
            {hero.ko}
            <span>{hero.realName}</span>
          </h2>
          <p className={styles.quote}>{hero.quote}</p>
          <hr className={styles.divider} />
          <dl className={styles.bio}>
            <div>
              <dt>본명</dt>
              <dd>{hero.realName === hero.en ? hero.en : hero.realName.replace(/\b\w+/g, (w) => w[0] + w.slice(1).toLowerCase())}</dd>
            </div>
            <div>
              <dt>역할군</dt>
              <dd>{hero.role}</dd>
            </div>
            <div>
              <dt>소속</dt>
              <dd>{hero.affiliation}</dd>
            </div>
          </dl>
          <p className={`${styles.bioText} pre`}>{hero.bio}</p>
          <hr className={styles.divider} />
          <p className={styles.abilityTitle}>ABILITY</p>
          <ul className={styles.abilities}>
            {hero.abilities.map((a, i) => (
              <li key={a.name}>
                <span className={styles.abilityPanel}>
                  {a.icon ? <img src={a.icon} alt="" /> : <span className={styles.abilityNo}>{String(i + 1).padStart(2, '0')}</span>}
                </span>
                {a.name}
              </li>
            ))}
          </ul>
          <Link to={WORLD_HEROES.some((w) => w.id === hero.id) ? `/world?hero=${hero.id}` : '/world'} className={styles.detailsBtn}>
            자세히 보기
            <svg width="34" height="18" viewBox="0 0 34 18" aria-hidden>
              <path d="M0 9H32M24 1L32 9L24 17" stroke="#F7F7F7" strokeWidth="1.35" fill="none" />
            </svg>
          </Link>
        </div>
        <p key={`t-${hero.id}`} className={`${styles.orangeNote} ${styles.tagline} pre`} style={at(503.55, 151.2)}>
          {hero.tagline}
        </p>
      </section>

      {/* 셀렉터 */}
      <nav aria-label="영웅 선택">
        <span className="deco" style={at(176.85, 1011.15, 2342.25, 1.35, { background: '#929292' })} />
        <button className={styles.arrow} style={at(44.55, 876.15, 60.75, 60.75)} onClick={() => go(index - 1)} aria-label="이전 영웅">
          <svg viewBox="0 0 61 61" aria-hidden>
            <path d="M44 30.5H17M27 20L17 30.5L27 41" />
          </svg>
        </button>
        <button className={styles.arrow} style={at(2609.55, 876.15, 60.75, 60.75)} onClick={() => go(index + 1)} aria-label="다음 영웅">
          <svg viewBox="0 0 61 61" aria-hidden>
            <path d="M17 30.5H44M34 20L44 30.5L34 41" />
          </svg>
        </button>
        {HEROES.map((h, i) => {
          const on = i === index
          return (
            <button
              key={h.id}
              className={`${styles.selector} ${on ? styles.selectorOn : ''}`}
              style={at(SELECTOR_X[i], SELECTOR_Y, 507.6, 213.3)}
              onClick={() => setIndex(i)}
              aria-pressed={on}
              aria-label={`${h.no} ${h.ko}`}
            >
              <span className={styles.field} style={at(102.6, 8.1, 405, 168.75)}>
                <img src={asset('hero/selector-field.svg')} alt="" style={at(0, 0, 405, 168.75)} />
                <span className={styles.fieldRole} style={at(338.85, 5.4)}>{h.role}</span>
              </span>
              <span className={styles.selLabel} style={at(110.7, 71.55)}>
                <span className={styles.selNo}>{h.no}</span>
                <span className={styles.selKo}>{h.ko}</span>
                <span className={styles.selEn}>{h.en}</span>
                <span className={styles.selRole}>{h.role}</span>
              </span>
              <span className="deco" style={at(74.25, 201.15, 348.3, 1.35, { background: '#929292' })} />
              {on && (
                <>
                  <svg className="deco" style={at(0, 105.3, 60.75, 95.85)} viewBox="0 0 60.75 95.85" aria-hidden>
                    <path d="M45 0H60.75L15.75 95.85H0Z" fill="#929292" />
                  </svg>
                  <svg className={`deco ${styles.selRail}`} style={at(76.95, 194.4, 267.3, 13.5)} viewBox="0 0 267.3 13.5" aria-hidden>
                    <path d="M6.75 0H267.3L260.55 13.5H0Z" fill="#ED6516" />
                  </svg>
                  <svg className="deco" style={at(58.05, 191.7, 33.75, 21.6)} viewBox="0 0 33.75 21.6" aria-hidden>
                    <path d="M8 0H33.75L25.75 21.6H0Z" fill="#262626" />
                  </svg>
                </>
              )}
              <svg className="deco" style={at(on ? 410.4 : 403.65, 191.7, 22.95, 21.6)} viewBox="-2 -2 26.95 25.6" aria-hidden>
                <path d="M0 10.8L5.7 0H17.2L22.95 10.8L17.2 21.6H5.7Z" fill="#F0F0F0" stroke={on ? '#262626' : '#929292'} strokeWidth="3.375" />
              </svg>
              <span className={styles.thumb} style={at(102.6, 8.1, 405, 168.75)}>
                <img
                  src={h.image}
                  alt=""
                  style={at(h.thumb.x - 102.6, h.thumb.y - 8.1, h.thumb.w, h.thumb.h)}
                />
              </span>
            </button>
          )
        })}
      </nav>
    </Stage>
  )
}
