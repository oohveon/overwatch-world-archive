# Overwatch World Archive

Figma 「OVERWATCH story discover」 디자인을 React(Vite + TypeScript)로 구현한 웹페이지.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
```

## 화면

| 경로 | 화면 | Figma 프레임 |
| --- | --- | --- |
| `/` | Home (IN → OUT 타이핑 전환) | World archive — IN / OUT (135:2306, 149:4784) |
| `/story?c=01` | 스토리 타임라인 | OVERWATCH / STORY (135:2372) |
| `/story/:id` | 챕터 상세 (01–07) | 01 OMNIC CRISIS — STORY DETAIL (135:2183) |
| `/hero?hero=tracer` | 영웅 소개 | OVERWATCH HEROES (135:2478) |
| `/world?hero=tracer` | 영웅 관계도 | Hero relationship (135:2754) |
| `/archive` | 영상 아카이브 | Overwatch world archive (135:2653) |

각 화면은 Figma 프레임 크기(1920×1080 / Story 3200×1080 / Hero 2700×1080) 그대로 레이아웃한 뒤
`Stage` 컴포넌트가 뷰포트에 맞춰 균일하게 축소·확대한다. 좌표는 모두 Figma px 값이다.

## 구조

```
src/
  components/  Stage, Gnb(GnbWide), MenuOverlay, Crosshair, FitText
  data/        chapters · heroes · world · videos  ← 텍스트/이미지 데이터
  pages/       화면별 컴포넌트 + CSS Module
public/assets/ 페이지별 이미지·SVG
```

## 근사 SVG (Figma에서 내보내 교체 필요)

Figma API 호출 한도 때문에 아래 장식 레이어는 원본 SVG를 받지 못해 좌표·미리보기를 기준으로 다시 그렸다.
Figma에서 해당 레이어를 선택해 **Export → SVG**로 내보낸 뒤 같은 파일명으로 덮어쓰면 코드 수정 없이 교체된다.

| 파일 | Figma 레이어 |
| --- | --- |
| `hero/hud.svg` | Archive HUD (135:2479) — GNB 부분 제외 |
| `hero/bg-big.svg` | 149:6257 |
| `hero/visual-back.svg` | Diagonal backdrop ~ Diagonal cut (135:2563–2568) |
| `hero/visual-front.svg` | Lower diagonal overlay ~ Hero baseline (135:2570–2577) |
| `hero/selector-field.svg` | Hero Selector › Hero portrait field |
| `archive/panels.svg` | Footer panel, Player baseline/crown, Technical panels (135:2660–2663) |
| `archive/grid.svg` | Architectural grid (135:2664) |
| `archive/player-frame.svg` | Player technical frame (135:2705) |
| `archive/player-slashes.svg` | Player red slashes (135:2719) |
| `world/panels.svg` | Geometric panels (135:2763) |
| `world/diagonals.svg` | Architectural diagonals (135:2764) |
| `world/panel-corners.svg` | Corner ornaments (135:2842) |

## 디자인에 없어 초안으로 채운 데이터

- `data/heroes.ts` — 트레이서 외 영웅(겐지·윈스턴·리퍼·메르시)의 대사, 소개, 태그라인
- `data/world.ts` — 트레이서 외 9명의 프로필 값과 소개 문구
- `data/videos.ts` — TRACER ORIGIN 외 영상의 부제와 소개
- 챕터 02–07 상세의 보조 이미지는 자리 표시자 카드로 표시
