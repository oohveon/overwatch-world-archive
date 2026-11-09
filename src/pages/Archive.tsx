import { useMemo, useState } from 'react'
import { Crosshair } from '../components/Crosshair'
import { Gnb } from '../components/Gnb'
import { Stage } from '../components/Stage'
import { VIDEOS, VIDEO_CATEGORIES, type VideoCategory } from '../data/videos'
import { asset, at } from '../lib/layout'
import styles from './Archive.module.css'

/** ARCHIVE — Figma "Overwatch world archive"(135:2653) */
export default function Archive() {
  const [category, setCategory] = useState<'ALL' | VideoCategory>('ALL')
  const [selectedNo, setSelectedNo] = useState(VIDEOS[0].no)
  const [playing, setPlaying] = useState(false)

  const list = useMemo(() => (category === 'ALL' ? VIDEOS : VIDEOS.filter((v) => v.category === category)), [category])
  const video = VIDEOS.find((v) => v.no === selectedNo) ?? VIDEOS[0]

  const choose = (no: string) => {
    setSelectedNo(no)
    setPlaying(false)
  }
  const step = (dir: number) => {
    if (!list.length) return
    const i = list.findIndex((v) => v.no === selectedNo)
    choose(list[(Math.max(i, 0) + dir + list.length) % list.length].no)
  }

  return (
    <Stage width={1920} height={1080} label="오버워치 영상 아카이브">
      <span className="deco" style={at(412, 1051, 45, 3, { background: 'var(--red)' })} />
      <Crosshair cx={1831} cy={744} size={22} color="#b8b8b8" />
      <Crosshair cx={1511} cy={209} size={22} color="#b8b8b8" />
      <Crosshair cx={226} cy={683} size={22} color="#b8b8b8" />
      <Crosshair cx={381} cy={241} size={22} color="#b8b8b8" />
      <img className="deco" src={asset('archive/panels.svg')} alt="" style={at(0, 0, 1920, 1080)} />
      <img className="deco" src={asset('archive/grid.svg')} alt="" style={at(0, 0, 1920, 1080)} />
      <Gnb active="archive" stageWidth={1920} />

      {/* 소개 */}
      <section style={at(96, 280, 330, 420)} aria-label="아카이브 소개">
        <h1 className={styles.title} style={at(0, 0)}>ARCHIVE</h1>
        <p className={styles.titleKr} style={at(0, 94)}>영상 아카이브</p>
        <span className="deco" style={at(0, 145, 267, 1, { background: 'var(--ink-3)' })} />
        <p className={styles.intro} style={at(0, 178, 318)}>
          오버워치의 영웅 소개 영상과 세계관을 담은 스토리 아카이브를 감상해보세요. 지금도, 그들의 이야기는 계속되고 있습니다.
        </p>
        <p className={`${styles.system} pre`} style={at(0, 355)}>{'WORLD ARCHIVE SYSTEM\nVIDEO DATABASE'}</p>
      </section>

      {/* 플레이어 */}
      <section style={at(466, 238, 940, 466)} aria-label="영상 플레이어">
        <img className="deco" src={asset('archive/player-frame.svg')} alt="" style={at(-15, -14, 970, 494)} />
        <div className={`${styles.screen} ${playing ? styles.screenPlaying : ''}`} style={at(0, 0, 940, 466)}>
          <img key={video.no} src={video.cover} alt={`${video.title} 영상 썸네일`} />
        </div>
        <div className={styles.meta} style={at(25, 22, 210, 92)}>
          <span className="deco" style={at(0, 0, 8, 30, { border: '2px solid var(--red)' })} />
          <span className={styles.metaFile} style={at(22, -3)}>{video.file}</span>
          <span className={styles.metaLine} style={at(22, 33)}>HERO VIDEO</span>
          <span className={styles.metaLine} style={at(22, 50)}>{video.title}</span>
          <span className={styles.metaLine} style={at(22, 67)}>{video.duration}</span>
        </div>
        <button
          className={styles.play}
          style={at(416, 179, 108, 108)}
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? '일시 정지' : '재생'}
        >
          <svg viewBox="0 0 104 104" aria-hidden>
            <circle cx="52" cy="52" r="51" stroke="#F7F7F7" strokeWidth="2" fill="rgba(0,0,0,0.12)" />
            {playing ? (
              <>
                <rect x="40" y="35" width="8" height="34" fill="#FAFAFA" />
                <rect x="56" y="35" width="8" height="34" fill="#FAFAFA" />
              </>
            ) : (
              <path d="M44 33V69L72 51L44 33Z" fill="#FAFAFA" />
            )}
          </svg>
        </button>
        <div style={at(42, 425, 856, 25)}>
          <span className="deco" style={at(0, 17, 692, 1, { background: 'var(--paper-2)' })} />
          <span key={`${video.no}-${playing}`} className={`deco ${styles.played} ${playing ? styles.playedRun : ''}`} style={at(0, 17, 692, 2)} />
          <button className={styles.playText} style={at(752, 0, 104, 25)} onClick={() => setPlaying((p) => !p)}>
            <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden>
              <path d="M1 1L7 7.5L1 14M8 1L14 7.5L8 14" stroke="var(--red)" strokeWidth="2" fill="none" />
            </svg>
            {playing ? 'PAUSE' : 'PLAY'}
          </button>
        </div>
        <img className="deco" src={asset('archive/player-slashes.svg')} alt="" style={at(-27, -14, 994, 494)} />
      </section>

      {/* 상세 */}
      <section key={video.no} className={styles.details} style={at(1456, 288, 368, 390)} aria-live="polite">
        <svg className="deco" style={at(-16, -17, 384, 48)} viewBox="0 0 384 48" aria-hidden>
          <path d="M0.5 47.5L26 0.5H384" stroke="var(--red)" fill="none" />
        </svg>
        <p className={styles.no} style={at(0, 4)}>{video.no}</p>
        <p className={styles.kind} style={at(0, 53)}>{video.kind}</p>
        <h2 className={styles.videoTitle} style={at(0, 80)}>{video.title}</h2>
        <p className={styles.subtitle} style={at(0, 137)}>{video.subtitle}</p>
        <p className={`${styles.desc} pre`} style={at(0, 190, 368)}>{video.description}</p>
        <button className={styles.watch} style={at(0, 322, 326, 62)} onClick={() => setPlaying(true)}>
          <svg className="deco" style={at(-7, -7, 340, 76)} viewBox="0 0 340 76" aria-hidden>
            <path d="M0.5 22V0.5H30M339.5 54V75.5H310" stroke="var(--ink-3)" fill="none" />
          </svg>
          <span style={at(65, 20)}>WATCH NOW</span>
          <svg style={at(267, 25, 25, 12)} viewBox="0 0 25 12" aria-hidden>
            <path d="M0 6H24M19 1L24 6L19 11" stroke="#F5F5F5" fill="none" />
          </svg>
        </button>
      </section>

      {/* 라이브러리 */}
      <section style={at(96, 751, 1728, 281)} aria-label="영상 목록">
        <span className="deco" style={at(0, 0, 1728, 1, { background: 'var(--grey-4)' })} />
        <div className={styles.categories} style={at(0, 13, undefined, 44)} role="tablist">
          {VIDEO_CATEGORIES.map((c, i) => (
            <span key={c} className={styles.category}>
              {i > 0 && <span className={styles.sep} />}
              <button role="tab" aria-selected={category === c} className={category === c ? styles.catOn : styles.cat} onClick={() => setCategory(c)}>
                {c}
              </button>
            </span>
          ))}
        </div>
        <p className={styles.total} style={at(1452, 27)}>TOTAL 24 FILES</p>
        <div className={styles.pager} style={at(1626, 13)}>
          <button onClick={() => step(-1)} aria-label="이전 영상">
            <svg viewBox="0 0 47 40" aria-hidden><path d="M26 14L20 20L26 26" /></svg>
          </button>
          <button onClick={() => step(1)} aria-label="다음 영상">
            <svg viewBox="0 0 47 40" aria-hidden><path d="M21 14L27 20L21 26" /></svg>
          </button>
        </div>
        <ul className={styles.cards} style={at(0, 70, 1728, 211)}>
          {list.map((v) => (
            <li key={v.no}>
              <button className={`${styles.card} ${v.no === selectedNo ? styles.cardOn : ''}`} onClick={() => choose(v.no)} aria-pressed={v.no === selectedNo}>
                <span className={styles.cardThumb} style={at(5, 5, 261.33, 141)}>
                  <img src={v.thumb} alt="" />
                </span>
                <span className={styles.cardNo} style={at(14, 160)}>{v.no}</span>
                <span className={styles.cardTitle} style={at(55, 166, 203)}>{v.title}</span>
                <span className={styles.cardTime} style={at(55, 190)}>{v.duration}</span>
              </button>
            </li>
          ))}
          {!list.length && <li className={styles.empty}>등록된 영상이 없습니다.</li>}
        </ul>
      </section>
    </Stage>
  )
}
