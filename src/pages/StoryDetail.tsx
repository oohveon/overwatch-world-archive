import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { FitText } from '../components/FitText'
import { Gnb } from '../components/Gnb'
import { Stage } from '../components/Stage'
import { CHAPTERS } from '../data/chapters'
import { asset, at } from '../lib/layout'
import styles from './StoryDetail.module.css'

const SUB_CLIP = 'polygon(0 0, 322.75px 0, 350px 27.25px, 350px 100%, 0 100%)'
const SUB_X = [8, 381, 742]

/** STORY DETAIL — Figma "01 OMNIC CRISIS — STORY DETAIL"(135:2183) 레이아웃을 7개 챕터가 공유 */
export default function StoryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const index = CHAPTERS.findIndex((c) => c.id === id)
  const chapter = CHAPTERS[index]
  const prev = CHAPTERS[index - 1]
  const next = CHAPTERS[index + 1]
  // 챕터가 바뀌면 메인 이미지는 자동으로 0번으로 돌아간다
  const [main, setMain] = useState({ id, idx: 0 })
  const mainIdx = main.id === id ? main.idx : 0
  const setMainIdx = (idx: number) => setMain({ id, idx })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prev) navigate(`/story/${prev.id}`)
      if (e.key === 'ArrowRight' && next) navigate(`/story/${next.id}`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, navigate])

  if (!chapter) return <Navigate to="/story" replace />

  const gallery = [chapter.image, ...(chapter.subImages ?? [])]
  const subs = gallery.filter((_, i) => i !== mainIdx)

  return (
    <Stage width={1920} height={1080} label={`${chapter.ko} 상세`}>
      <img className="deco" src={asset('detail/bg-big.svg')} alt="" style={at(198.4, -43.6, 1473, 1253)} />

      {/* 하단 이전 / 진행 / 다음 */}
      <nav className={styles.bottom} style={at(685, 960, 1143, 101)} aria-label="챕터 이동">
        {prev ? (
          <Link to={`/story/${prev.id}`} className={styles.step} style={at(0, 25)}>
            <img src={asset('detail/arrow-prev.svg')} alt="" width={36} height={36} />
            <span className={styles.stepText}>
              <span className={styles.stepLabel}>PREVIOUS</span>
              <span className={styles.stepName}>{`${prev.id}. ${prev.en}`}</span>
            </span>
          </Link>
        ) : (
          <span className={`${styles.step} ${styles.stepOff}`} style={at(0, 25)}>
            <img src={asset('detail/arrow-prev.svg')} alt="" width={36} height={36} />
            <span className={styles.stepText}>
              <span className={styles.stepLabel}>PREVIOUS</span>
              <span className={styles.stepName}>NO PREVIOUS</span>
            </span>
          </span>
        )}

        <div className={styles.progress} style={at(380, 18, 325)}>
          <span className={styles.progressText}>{`${chapter.id} / ${String(CHAPTERS.length).padStart(2, '0')}`}</span>
          <span className={styles.segments}>
            {CHAPTERS.map((c, i) => (
              <Link
                key={c.id}
                to={`/story/${c.id}`}
                className={i === index ? styles.segOn : styles.seg}
                aria-label={`${c.id} ${c.en}`}
              />
            ))}
          </span>
        </div>

        {next ? (
          <Link to={`/story/${next.id}`} className={`${styles.step} ${styles.stepNext}`} style={at(913, 25)}>
            <span className={styles.stepText}>
              <span className={styles.stepLabel}>NEXT</span>
              <span className={styles.stepName}>{`${next.id}. ${next.en}`}</span>
            </span>
            <img src={asset('detail/arrow-next.svg')} alt="" width={36} height={36} />
          </Link>
        ) : (
          <span className={`${styles.step} ${styles.stepNext} ${styles.stepOff}`} style={at(913, 25)}>
            <span className={styles.stepText}>
              <span className={styles.stepLabel}>NEXT</span>
              <span className={styles.stepName}>마지막 챕터</span>
            </span>
            <img src={asset('detail/arrow-next.svg')} alt="" width={36} height={36} />
          </span>
        )}
      </nav>

      {/* 우측 챕터 인덱스 */}
      <nav className={styles.index} style={at(1690, 219, 173)} aria-label="스토리 인덱스">
        {CHAPTERS.map((c, i) => (
          <Link key={c.id} to={`/story/${c.id}`} className={i === index ? styles.indexOn : styles.indexItem} aria-current={i === index ? 'page' : undefined}>
            {`${c.id}. ${c.en}`}
          </Link>
        ))}
      </nav>

      {/* 아카이브 이미지 */}
      <section style={at(674, 178, 1112, 754)} aria-label="기록 이미지">
        <p className={styles.record} style={at(742, 0)}>
          WORLD ARCHIVE
          <br />
          HISTORICAL RECORD
        </p>
        <div className={styles.main} style={at(0, 62, 980, 483)}>
          <img key={gallery[mainIdx]} src={gallery[mainIdx]} alt={`${chapter.ko} 기록 이미지`} />
        </div>
        {SUB_X.map((x, i) => {
          const src = subs[i]
          return src ? (
            <button
              key={x}
              className={styles.sub}
              style={at(x, 561, 350, 192, { clipPath: SUB_CLIP })}
              onClick={() => setMainIdx(gallery.indexOf(src))}
              aria-label={`보조 이미지 ${i + 1}을 크게 보기`}
            >
              <img src={src} alt="" />
            </button>
          ) : (
            <div key={x} className={styles.subEmpty} style={at(x, 561, 350, 192, { clipPath: SUB_CLIP })} aria-hidden>
              <svg viewBox="0 0 350 192" preserveAspectRatio="none">
                <path d="M0 0L350 192M350 0L0 192" stroke="#cfcfcf" />
              </svg>
              <span>{`SUB IMAGE 0${i + 1}`}</span>
              <span className={styles.subEmptyKr}>(기록 이미지)</span>
            </div>
          )
        })}
        {SUB_X.map((x) => (
          <svg key={`o${x}`} className="deco" style={at(x, 561, 350, 192)} viewBox="0 0 350 192" aria-hidden>
            <path d="M322.752 0.6L349.4 27.248V191.4H0.6V0.6H322.752Z" stroke="#999" strokeWidth="1.2" fill="none" />
          </svg>
        ))}
      </section>

      {/* 좌측 이벤트 정보 */}
      <article style={at(79, 159, 484, 815)} key={chapter.id} className={styles.info}>
        <Link to={`/story?c=${chapter.id}`} className={styles.back} style={at(0, 0, 252, 38)}>
          <img src={asset('detail/arrow-back.svg')} alt="" width={32} height={32} />
          BACK TO TIMELINE
        </Link>
        <header style={at(0, 74, 484)} className={styles.heading}>
          <p className={styles.kicker}>STORY ARCHIVE</p>
          <p className={styles.number} aria-hidden>{chapter.id}</p>
          <h1 className={styles.headline}>
            <FitText text={chapter.headline} maxSize={131} maxWidth={560} />
          </h1>
        </header>
        <div className={styles.koTitle} style={at(0, 492, undefined, 38)}>
          <h2>{chapter.ko}</h2>
          <span />
        </div>
        <p className={`${styles.body} pre`} style={at(0, 543, 484)}>{chapter.description}</p>
        <dl className={styles.facts} style={at(0, 670, 453)}>
          {chapter.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </article>

      <img className="deco" src={asset('detail/tech.svg')} alt="" style={at(0, 0, 1920, 1080)} />
      <Gnb active="story" stageWidth={1920} />
    </Stage>
  )
}
