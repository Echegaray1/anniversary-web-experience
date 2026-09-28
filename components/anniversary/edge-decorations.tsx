import type { CSSProperties } from 'react'

function StitchEar({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 170" className={className} style={style}>
      <path
        d="M50 168 C 16 132, 2 66, 26 4 C 46 34, 76 70, 94 128 C 84 150, 68 164, 50 168 Z"
        fill="#5b8def"
        stroke="#5ef2ff"
        strokeWidth="2.5"
      />
      <path
        d="M52 150 C 30 124, 22 78, 32 34 C 46 58, 64 86, 76 124 C 70 138, 62 148, 52 150 Z"
        fill="#ffb6d9"
      />
      <path d="M58 60 L 70 52 L 66 70 Z" fill="#070b34" />
    </svg>
  )
}

function Leaf({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style}>
      <defs>
        <linearGradient id="leaf-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0f6f7a" />
          <stop offset="100%" stopColor="#3fe0c5" />
        </linearGradient>
      </defs>
      <path
        d="M6 94 C 6 40, 46 6, 96 4 C 96 54, 60 94, 6 94 Z"
        fill="url(#leaf-grad)"
        stroke="#5ef2ff"
        strokeWidth="1.5"
        opacity="0.92"
      />
      <path d="M6 94 L 90 10" stroke="#b8fff4" strokeWidth="1.6" fill="none" opacity="0.8" />
      {[22, 38, 54, 70].map((p) => (
        <path
          key={p}
          d={`M${p} ${100 - p - 6} l ${-6} ${-16} M${p} ${100 - p - 6} l ${16} ${6}`}
          stroke="#b8fff4"
          strokeWidth="1.1"
          fill="none"
          opacity="0.6"
        />
      ))}
    </svg>
  )
}

function ClawMarks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 90" className={className}>
      {[6, 18, 30].map((x, i) => (
        <path
          key={x}
          d={`M${x} ${6 + i * 3} C ${x + 8} 30, ${x + 6} 60, ${x - 2} ${84 - i * 3}`}
          stroke="#5ef2ff"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </svg>
  )
}

export function EdgeDecorations() {
  return (
    <div aria-hidden="true" className="app-frame pointer-events-none z-10 overflow-hidden">
      <StitchEar
        className="animate-ear absolute -left-5 -top-6 w-16 origin-bottom drop-shadow-[0_0_10px_rgb(94_242_255/0.6)]"
        style={{ '--r': '-28deg' } as CSSProperties}
      />
      <StitchEar
        className="animate-ear absolute -right-5 -top-6 w-16 origin-bottom -scale-x-100 drop-shadow-[0_0_10px_rgb(94_242_255/0.6)]"
        style={{ '--r': '28deg', animationDelay: '1.4s' } as CSSProperties}
      />

      <ClawMarks className="absolute -left-1 top-[38%] w-6 opacity-60 drop-shadow-[0_0_8px_rgb(94_242_255/0.9)]" />
      <ClawMarks className="absolute -right-1 top-[58%] w-6 -scale-x-100 opacity-50 drop-shadow-[0_0_8px_rgb(94_242_255/0.9)]" />

      <div className="absolute -bottom-4 -left-6 h-36 w-36">
        <Leaf
          className="animate-sway absolute bottom-0 left-0 w-28 origin-bottom-left drop-shadow-[0_0_8px_rgb(63_224_197/0.55)]"
          style={{ '--r': '-6deg' } as CSSProperties}
        />
        <Leaf
          className="animate-sway absolute bottom-2 left-10 w-20 origin-bottom-left drop-shadow-[0_0_8px_rgb(63_224_197/0.55)]"
          style={{ '--r': '28deg', animationDelay: '-2s' } as CSSProperties}
        />
        <span className="glow-emoji absolute bottom-10 left-6 text-2xl">{'🌺'}</span>
      </div>

      <div className="absolute -right-8 top-[24%] h-28 w-28">
        <Leaf
          className="animate-sway absolute right-0 top-0 w-24 origin-bottom-right -scale-x-100 opacity-80 drop-shadow-[0_0_8px_rgb(63_224_197/0.55)]"
          style={{ '--r': '14deg', animationDelay: '-3s' } as CSSProperties}
        />
      </div>

      <div className="absolute -left-8 top-[70%] h-24 w-24">
        <Leaf
          className="animate-sway absolute left-0 top-0 w-20 opacity-70 drop-shadow-[0_0_8px_rgb(63_224_197/0.55)]"
          style={{ '--r': '-20deg', animationDelay: '-1s' } as CSSProperties}
        />
      </div>
    </div>
  )
}
