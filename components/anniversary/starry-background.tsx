import type { CSSProperties } from 'react'
import { seededRandom } from '@/lib/seeded-random'

const rand = seededRandom(626)
const round = (n: number) => Math.round(n * 100) / 100

const STARS = Array.from({ length: 80 }, () => ({
  x: round(rand() * 100),
  y: round(rand() * 100),
  size: round(rand() * 2.2 + 0.6),
  delay: round(rand() * 5),
  dur: round(2 + rand() * 3),
}))

const ORBS = [
  { x: 12, y: 18, size: 140, color: 'rgb(94 242 255 / 0.35)', dur: 16 },
  { x: 78, y: 32, size: 110, color: 'rgb(255 182 217 / 0.3)', dur: 19 },
  { x: 30, y: 62, size: 170, color: 'rgb(168 216 255 / 0.28)', dur: 22 },
  { x: 85, y: 78, size: 120, color: 'rgb(94 242 255 / 0.3)', dur: 17 },
  { x: 8, y: 90, size: 90, color: 'rgb(255 182 217 / 0.3)', dur: 14 },
]

const TULIPS = Array.from({ length: 11 }, () => ({
  x: round(rand() * 92 + 2),
  delay: round(-rand() * 20),
  dur: round(14 + rand() * 12),
  size: round(14 + rand() * 14),
  sway: `${Math.round(rand() * 60 - 30)}px`,
}))

export function StarryBackground() {
  return (
    <div aria-hidden="true" className="app-frame pointer-events-none z-0 overflow-hidden">
      <div
        className="animate-sky absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(180deg, #050827 0%, #0b1356 30%, #13307e 55%, #1b6fa8 80%, #2fc6d8 100%)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#5ef2ff]/25 to-transparent" />

      <div className="absolute left-1/2 top-[9%] size-20 -translate-x-1/2 rounded-full bg-[#fff4b8] opacity-90 shadow-[0_0_40px_14px_rgb(255_244_184/0.45),0_0_120px_40px_rgb(94_242_255/0.25)]" />

      {STARS.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-white"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              boxShadow: '0 0 6px 1px rgb(168 216 255 / 0.9)',
              '--delay': `${s.delay}s`,
              '--dur': `${s.dur}s`,
            } as CSSProperties
          }
        />
      ))}

      {ORBS.map((o, i) => (
        <span
          key={i}
          className="animate-orb absolute rounded-full blur-2xl"
          style={
            {
              left: `${o.x}%`,
              top: `${o.y}%`,
              width: o.size,
              height: o.size,
              marginLeft: -o.size / 2,
              marginTop: -o.size / 2,
              background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
              '--dur': `${o.dur}s`,
              '--delay': `${-i * 3}s`,
            } as CSSProperties
          }
        />
      ))}

      {TULIPS.map((t, i) => (
        <span
          key={i}
          className="animate-tulip-fall glow-emoji absolute top-0"
          style={
            {
              left: `${t.x}%`,
              fontSize: t.size,
              '--delay': `${t.delay}s`,
              '--dur': `${t.dur}s`,
              '--sway': t.sway,
            } as CSSProperties
          }
        >
          {'🌷'}
        </span>
      ))}
    </div>
  )
}
