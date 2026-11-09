import { useState } from 'react'
import { Link } from 'react-router-dom'
import { asset, at } from '../lib/layout'
import { useMenu } from './menuContext'
import { NAV_ITEMS, type NavKey } from './nav'
import styles from './Gnb.module.css'

type Props = {
  active: NavKey
  /** 상단 흰 띠를 깔 프레임 전체 너비 */
  stageWidth: number
}

const ITEM_X = NAV_ITEMS.map((_, i) => 560 + i * 144) // 80px 아이템 + 64px 간격
const BRACKET_W = 114

/** 1920 프레임용 GNB (Figma "World Archive / GNB", 64,32 / 1792×72) */
export function Gnb({ active, stageWidth }: Props) {
  const [hover, setHover] = useState<NavKey | null>(null)
  const { open } = useMenu()
  const target = NAV_ITEMS.findIndex((n) => n.key === (hover ?? active))

  return (
    <>
      <div className={styles.band} style={at(0, 0, stageWidth, 120)} />
      <header className={styles.gnb} style={at(64, 32, 1792, 72)}>
        <Link to="/" className={styles.brand} style={at(0, 2, 320, 44)} aria-label="Overwatch World Archive 홈">
          <img src={asset('common/logo.png')} alt="" width={40} height={40} />
          <span className={styles.brandText}>
            <span className={styles.brandName}>OVERWATCH</span>
            <span className={styles.brandSub}>WORLD ARCHIVE</span>
            <span className={styles.brandStatus}>DATABASE / ACTIVE</span>
          </span>
        </Link>

        <nav aria-label="주요 메뉴">
          <img
            className={`deco ${styles.brackets}`}
            src={asset('common/active-brackets.svg')}
            alt=""
            style={at(ITEM_X[target] + 40 - BRACKET_W / 2, 2, BRACKET_W + 1, 57)}
          />
          {[838, 982, 1126].map((x) => (
            <span key={x} className={`deco ${styles.divider}`} style={at(x, 8, 1, 46)} />
          ))}
          {NAV_ITEMS.map((item, i) => (
            <Link
              key={item.key}
              to={item.to}
              className={styles.item}
              style={at(ITEM_X[i], 9, 80, 40)}
              aria-current={item.key === active ? 'page' : undefined}
              onMouseEnter={() => setHover(item.key)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(item.key)}
              onBlur={() => setHover(null)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.utility} style={at(1595, 9, undefined, 40)}>
          <span className={styles.lang}>
            KR <span aria-hidden>⌄</span>
          </span>
          <button className={styles.menu} onClick={open} aria-haspopup="dialog">
            Menu
            <img src={asset('common/menu-icon.svg')} alt="" width={18} height={16} />
          </button>
        </div>
      </header>
    </>
  )
}

const WIDE_ITEMS = [
  { x: 1205, w: 55 },
  { x: 1362, w: 61 },
  { x: 1532, w: 50 },
  { x: 1672, w: 65 },
  { x: 1826, w: 80 },
]

/** 3200 Story 프레임 전용 GNB (Figma "01 / Global navigation") */
export function GnbWide({ active }: { active: NavKey }) {
  const [hover, setHover] = useState<NavKey | null>(null)
  const { open } = useMenu()
  const target = WIDE_ITEMS[NAV_ITEMS.findIndex((n) => n.key === (hover ?? active))]

  return (
    <header className={styles.wide}>
      <Link to="/" className={styles.wideBrand} aria-label="Overwatch World Archive 홈">
        <img src={asset('common/logo.png')} alt="" style={at(181, 42, 39, 39)} />
        <span style={at(237, 33)} className={styles.wideName}>OVERWATCH</span>
        <span style={at(237, 54)} className={styles.wideName}>WORLD ARCHIVE</span>
        <span style={at(237, 75)} className={styles.wideStatus}>SYSTEM // ACTIVE</span>
      </Link>

      <nav aria-label="주요 메뉴">
        <img
          className={`deco ${styles.brackets}`}
          src={asset('common/active-brackets.svg')}
          alt=""
          style={at(target.x + target.w / 2 - BRACKET_W / 2, 35, BRACKET_W + 1, 57)}
        />
        {NAV_ITEMS.map((item, i) => (
          <Link
            key={item.key}
            to={item.to}
            className={`${styles.wideItem} ${item.key === active ? styles.wideActive : ''}`}
            style={at(WIDE_ITEMS[i].x - 20, 36, WIDE_ITEMS[i].w + 40, 54)}
            aria-current={item.key === active ? 'page' : undefined}
            onMouseEnter={() => setHover(item.key)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(item.key)}
            onBlur={() => setHover(null)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <span className={styles.wideLang} style={at(2874, 58)}>
        KR
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden>
          <path d="M0.5 0.5L5 5L9.5 0.5" stroke="#232323" strokeWidth="1.5" fill="none" />
        </svg>
      </span>
      <button className={styles.wideMenu} style={at(3008, 40, 64, 64)} onClick={open} aria-label="Menu" aria-haspopup="dialog">
        <span style={at(10, 14, 44, 3)} />
        <span style={at(10, 32, 44, 3)} />
        <span style={at(10, 50, 44, 3)} />
      </button>
    </header>
  )
}
