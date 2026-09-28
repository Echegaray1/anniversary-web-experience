'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, X } from 'lucide-react'

const EMOJIS = ['🌷', '💙', '🌷', '💙', '🌺', '✨']
const SPARK_COLORS = ['#5ef2ff', '#ffb6d9', '#a8d8ff', '#fff4b8']

function makeShow() {
  const burstEmojis = [0, 0.45, 0.9, 1.5].flatMap((delay, wave) =>
    Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * Math.PI * 2 + wave * 0.3 + Math.random() * 0.2
      const dist = 160 + Math.random() * 260
      return {
        id: `${wave}-${i}`,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: 26 + Math.random() * 46,
        rotate: Math.random() * 360 - 180,
        delay: delay + Math.random() * 0.15,
      }
    }),
  )

  const rockets = Array.from({ length: 9 }, (_, r) => ({
    id: r,
    left: 10 + Math.random() * 80,
    top: 10 + Math.random() * 55,
    delay: 0.3 + r * 0.35,
    color: SPARK_COLORS[r % SPARK_COLORS.length],
    sparks: Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * Math.PI * 2
      const dist = 50 + Math.random() * 50
      return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist }
    }),
  }))

  return { burstEmojis, rockets }
}

export function FinaleFireworks({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [round, setRound] = useState(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const show = useMemo(() => (open ? makeShow() : null), [open, round])

  return (
    <AnimatePresence>
      {open && show && (
        <motion.div
          key="finale"
          role="dialog"
          aria-modal="true"
          aria-label="Final de la sorpresa"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] overflow-hidden bg-[#050827]/75 backdrop-blur-[3px]"
        >
          <div key={round} aria-hidden="true" className="pointer-events-none absolute inset-0">
            <motion.span
              className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ffffff,#5ef2ff_40%,transparent_70%)]"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 5, 7], opacity: [1, 0.6, 0] }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />

            {show.rockets.map((r) => (
              <span key={r.id} className="absolute" style={{ left: `${r.left}%`, top: `${r.top}%` }}>
                {r.sparks.map((s, i) => (
                  <motion.span
                    key={i}
                    className="absolute size-2 rounded-full"
                    style={{ backgroundColor: r.color, boxShadow: `0 0 10px 2px ${r.color}` }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 1 }}
                    animate={{ x: s.x, y: s.y + 30, opacity: [0, 1, 1, 0], scale: [1, 1, 0.3] }}
                    transition={{ duration: 1.5, delay: r.delay, ease: 'easeOut', repeat: 2, repeatDelay: 1.8 }}
                  />
                ))}
              </span>
            ))}

            {show.burstEmojis.map((p) => (
              <span
                key={p.id}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ fontSize: p.size }}
              >
                <motion.span
                  className="glow-emoji block leading-none"
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: p.x,
                    y: p.y,
                    scale: [0, 1.6, 1.1],
                    opacity: [0, 1, 1, 0],
                    rotate: p.rotate,
                  }}
                  transition={{ duration: 2.4, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  {p.emoji}
                </motion.span>
              </span>
            ))}
          </div>

          <div className="relative flex h-full items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.6, type: 'spring', stiffness: 140, damping: 14 }}
              className="glass flex w-full max-w-[380px] flex-col items-center gap-4 rounded-[2rem] px-6 py-8 text-center"
            >
              <span aria-hidden="true" className="text-5xl glow-emoji">{'💙'}</span>
              <h2 className="font-display neon-text text-4xl leading-tight text-white">
                Feliz 1er Mes, Amiara
              </h2>
              <p className="text-pretty text-base leading-relaxed text-[#d6ecff]">
                {'Gracias por ser mi Ohana. Por muchos meses más de estrellas, tulipanes y aventuras juntos. 🌷'}
              </p>
              <div className="mt-2 flex w-full gap-3">
                <button
                  type="button"
                  onClick={() => setRound((r) => r + 1)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5ef2ff] to-[#ffb6d9] px-4 py-3 font-bold text-[#070b34] shadow-[0_0_18px_rgb(94_242_255/0.7)] transition active:scale-95"
                >
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Otra vez
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#5ef2ff] px-4 py-3 font-bold text-[#5ef2ff] transition active:scale-95"
                >
                  <X className="size-4" aria-hidden="true" />
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
