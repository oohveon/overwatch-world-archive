import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Crosshair } from '../components/Crosshair'
import { FitText } from '../components/FitText'
import { Gnb } from '../components/Gnb'
import { Stage } from '../components/Stage'
import { HEROES } from '../data/heroes'
import { FACTION_FILTERS, RELATIONS, WORLD_HEROES, type Faction } from '../data/world'
import { asset, at } from '../lib/layout'
import styles from './World.module.css'

const ROSTER_X = [40, 214, 388, 562, 736, 911, 1085, 1259, 1433, 1607]
const CENTER = { x: 300, y: 184, w: 310, h: 312 }

/** WORLD — Figma "Hero relationship"(135:2754) */
export default function World() {
  const [params, setParams] = useSearchParams()
  const initial = Math.max(0, WORLD_HEROES.findIndex((h) => h.id === params.get('hero')))
  const [index, setIndex] = useState(initial)
  const [filter, setFilter] = useState<Faction | 'ALL'>('ALL')
  const hero = WORLD_HEROES[index]
  const tracer = WORLD_HEROES[0]

  const select = (i: number) => {
    const next = (i + WORLD_HEROES.length) % WORLD_HEROES.length
    setIndex(next)
    setParams({ hero: WORLD_HEROES[next].id }, { replace: true })
  }
  const selectId = (id: string) => select(WORLD_HEROES.findIndex((h) => h.id === id))
  const inFilter = (f: Faction) => filter === 'ALL' || filter === f
  const hasHeroPage = HEROES.some((h) => h.id === hero.id)

  return (
    <Stage width={1920} height={1080} label="오버워치 영웅 관계도">
      <span className="deco" style={at(413, 1058, 45, 3, { background: 'var(--red)' })} />
      {[
        [1415, 690],
        [1010, 815],
        [450, 710],
        [450, 360],
        [435, 185],
      ].map(([x, y]) => (
        <Crosshair key={`${x}-${y}`} cx={x + 10} cy={y + 10} size={20} color="#b8b8b8" />
      ))}
      <span className="deco" style={at(1596, 156, 228, 14, { background: 'var(--orange)' })} />
      <img className="deco" src={asset('world/panels.svg')} alt="" style={at(0, 0, 1920, 1080)} />
      <img className="deco" src={asset('world/diagonals.svg')} alt="" style={at(0, 0, 1920, 1080)} />
      <Gnb active="world" stageWidth={1920} />

      {/* 소개 + 진영 필터 */}
      <section style={at(96, 240, 310, 620)} aria-label="관계도 소개">
        <p className={styles.kicker} style={at(0, 0)}>HERO</p>
        <h1 className={styles.title} style={at(0, 40, 310)}>
          HERO
          <br />
          RELATIONSHIP
        </h1>
        <p className={styles.titleKr} style={at(0, 178)}>영웅들의 관계</p>
        <span className="deco" style={at(0, 220, 286, 1, { background: 'var(--grey-4)' })} />
        <p className={styles.intro} style={at(0, 250, 280)}>
          오버워치의 영웅들은 서로 다른 배경과 신념을 가지고 있지만, 때로는 동료로, 때로는 적으로 얽혀 있습니다.
        </p>
        <div role="radiogroup" aria-label="진영 필터">
          {FACTION_FILTERS.map((f, i) => (
            <button
              key={f.key}
              role="radio"
              aria-checked={filter === f.key}
              className={`${styles.filter} ${filter === f.key ? styles.filterOn : ''}`}
              style={at(0, 385 + 42 * i, 285, 42)}
              onClick={() => setFilter(f.key)}
            >
              <span className={styles.filterDot} />
              <span className={styles.filterName}>{f.key}</span>
              <span className={styles.filterCount}>{f.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 관계도 */}
      <section style={at(470, 164, 940, 712)} aria-label="트레이서 관계도">
        {RELATIONS.map((r) => {
          const on = r.heroId === hero.id
          const color = r.tone === 'accent' ? 'var(--red)' : 'var(--grey-4)'
          return (
            <div key={r.heroId} className={`${styles.relation} ${on ? styles.relationOn : ''}`}>
              <p className={styles.relLabel} style={at(r.labelAt[0], r.labelAt[1])}>{r.label}</p>
              <p className={styles.relCode} style={at(r.labelAt[0], r.labelAt[1] + 17)}>{r.code}</p>
              {r.lines.map(([x, y, w, h]) => (
                <span key={`${x}-${y}-${w}-${h}`} className={`deco ${styles.relLine}`} style={at(x, y, w, h, { background: color })} />
              ))}
              <span
                className={`deco ${styles.relDot}`}
                style={at(r.endpoint[0], r.endpoint[1], 8, 8, { background: r.tone === 'accent' ? 'var(--red)' : 'var(--ink-3)' })}
              />
            </div>
          )
        })}

        {RELATIONS.map((r) => {
          const h = WORLD_HEROES.find((w) => w.id === r.heroId)!
          const on = h.id === hero.id
          return (
            <button
              key={h.id}
              className={`${styles.mapCard} ${on ? styles.mapCardOn : ''} ${inFilter(h.faction) ? '' : styles.dim}`}
              style={at(r.card.x, r.card.y, r.card.w, r.card.h)}
              onClick={() => selectId(h.id)}
              aria-pressed={on}
              aria-label={`${h.ko} — 트레이서와의 관계: ${r.label}`}
            >
              <img src={h.mapImage} alt="" style={at(r.image.x - r.card.x, r.image.y - r.card.y, r.image.w, r.image.h)} />
              <span className={styles.mapEn} style={at(12, r.card.h - 48)}>{h.en}</span>
              <span className={styles.mapKo} style={at(12, r.card.h - 23)}>{h.ko}</span>
              <span className={styles.mapNo} style={at(r.card.w - 39, r.card.h - 48)}>{h.no}</span>
            </button>
          )
        })}

        <button
          className={`${styles.mapCard} ${styles.center} ${hero.id === tracer.id ? styles.mapCardOn : ''}`}
          style={at(CENTER.x, CENTER.y, CENTER.w, CENTER.h)}
          onClick={() => select(0)}
          aria-label="트레이서"
        >
          <img src={tracer.mapImage} alt="" style={at(4, 0, 301, 239)} />
          <span className={styles.centerEn} style={at(12, 249)}>TRACER</span>
          <span className={styles.mapKo} style={at(12, 289)}>트레이서</span>
          <span className={styles.centerNo} style={at(271, 249)}>01</span>
        </button>
      </section>

      {/* 선택 영웅 패널 */}
      <aside className={styles.panel} style={at(1450, 170, 374, 716)} aria-live="polite" aria-label="선택한 영웅">
        <span className="deco" style={at(0, 0, 5, 64, { background: 'var(--red)' })} />
        <div key={hero.id} className={styles.panelBody}>
          <p className={styles.panelNo} style={at(28, 13)}>{hero.no}</p>
          <p className={styles.panelKicker} style={at(28, 52)}>SELECTED HERO</p>
          <h2 className={styles.panelEn} style={at(28, 77)}>
            <FitText text={hero.en} maxSize={64} maxWidth={318} lineRatio={1} />
          </h2>
          <p className={styles.panelKo} style={at(28, 145)}>{hero.ko}</p>
          <div className={styles.panelImage} style={at(28, 190, 318, 184)}>
            {hero.panelImage ? (
              <img src={hero.panelImage} alt={`${hero.ko} 이미지`} style={at(-5, -5, 328, 190)} />
            ) : (
              <img src={hero.mapImage ?? hero.portrait} alt={`${hero.ko} 이미지`} className={styles.panelPortrait} />
            )}
          </div>
          <dl className={styles.facts} style={at(28, 391, 318)}>
            {hero.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className={`${styles.panelDesc} pre`} style={at(28, 560, 318)}>{hero.description}</p>
        </div>
        <Link to={hasHeroPage ? `/hero?hero=${hero.id}` : '/hero'} className={styles.viewBtn} style={at(28, 650, 318, 48)}>
          <span>VIEW DETAILS</span>
          <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden>
            <path d="M0 6H24M19 1L24 6L19 11" stroke="#F5F5F5" fill="none" />
          </svg>
        </Link>
        <img className="deco" src={asset('world/panel-corners.svg')} alt="" style={at(0, 0, 374, 716)} />
      </aside>

      {/* 로스터 */}
      <nav style={at(56, 906, 1808, 150)} aria-label="영웅 로스터">
        <span className="deco" style={at(40, -15, 1728, 1, { background: 'var(--grey-4)' })} />
        <button className={styles.rosterArrow} style={at(0, 49, 32, 40)} onClick={() => select(index - 1)} aria-label="이전 영웅">
          <svg viewBox="0 0 32 40" aria-hidden><path d="M19 14L13 20L19 26" /></svg>
        </button>
        <button className={styles.rosterArrow} style={at(1776, 49, 32, 40)} onClick={() => select(index + 1)} aria-label="다음 영웅">
          <svg viewBox="0 0 32 40" aria-hidden><path d="M13 14L19 20L13 26" /></svg>
        </button>
        {WORLD_HEROES.map((h, i) => (
          <button
            key={h.id}
            className={`${styles.rosterCard} ${i === index ? styles.rosterOn : ''} ${inFilter(h.faction) ? '' : styles.dim}`}
            style={at(ROSTER_X[i], 0, 148, 148)}
            onClick={() => select(i)}
            aria-pressed={i === index}
            aria-label={`${h.no} ${h.ko}`}
          >
            <img src={h.portrait} alt="" style={at(26, 5, 96, 96)} />
            <span className={styles.rosterEn} style={at(12, 105)}>{h.en}</span>
            <span className={styles.rosterKo} style={at(12, 130)}>{h.ko}</span>
            <span className={styles.rosterNo} style={at(122, 105)}>{h.no}</span>
          </button>
        ))}
      </nav>
    </Stage>
  )
}
