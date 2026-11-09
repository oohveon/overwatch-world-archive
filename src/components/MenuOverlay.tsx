import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MenuContext } from './menuContext'
import { NAV_ITEMS } from './nav'
import styles from './MenuOverlay.module.css'

/** GNB의 Menu 버튼이 여는 전체 화면 내비게이션. Stage(transform) 바깥에 렌더링한다. */
export function MenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  return (
    <MenuContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      {isOpen && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="전체 메뉴">
          <button className={styles.close} onClick={() => setOpen(false)} aria-label="메뉴 닫기">
            CLOSE <span aria-hidden>✕</span>
          </button>
          <p className={styles.kicker}>OVERWATCH WORLD ARCHIVE // INDEX</p>
          <nav>
            <ol className={styles.list}>
              {NAV_ITEMS.map((item, i) => (
                <li key={item.key} style={{ animationDelay: `${i * 50}ms` }}>
                  <Link to={item.to} className={styles.link} onClick={() => setOpen(false)}>
                    <span className={styles.no}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.label}>{item.label}</span>
                    <span className={styles.ko}>{item.ko}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      )}
    </MenuContext.Provider>
  )
}
