'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

const HOLD_MS = 3000
const RADIUS = 62
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function UnlockScreen({
  onUnlock,
  onGesture,
}: {
  onUnlock: () => void
  onGesture?: () => void
}) {
  const [progress, setProgress] = useState(0)
  const [holding, setHolding] = useState(false)
  const [done, setDone] = useState(false)
  const frameRef = useRef<number | null>(null)
  const startRef = useRef(0)

  const stop = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = null
    setHolding(false)
    setProgress((p) => (p >= 1 ? 1 : 0))
  }, [])

  const start = useCallback(() => {
    if (done || frameRef.current) return
    setHolding(true)
    startRef.current = performance.now()
    const tick = (now: number) => {
      const next = Math.min((now - startRef.current) / HOLD_MS, 1)
      setProgress(next)
      if (next >= 1) {
        frameRef.current = null
        setHolding(false)
        setDone(true)
        navigator.vibrate?.([40, 60, 120])
        window.setTimeout(onUnlock, 900)
        return
      }
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
  }, [done, onUnlock])

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <motion.section
      key="unlock"
      className="relative z-20 flex min-h-dvh items-center justify-center px-5 py-10"
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        className="glass relative flex w-full flex-col items-center gap-6 rounded-[2.25rem] px-6 pb-9 pt-10 text-center"
      >
        <span className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#ffb6d9]/70 bg-[#0b1356]/80 px-4 py-1 text-xs font-semibold tracking-wide text-[#ffb6d9] shadow-[0_0_14px_rgb(255_182_217/0.5)]">
          <Sparkles className="size-3.5" aria-hidden="true" />
          Experimento 626 de amor
        </span>

        <div className="flex items-center gap-2 text-2xl" aria-hidden="true">
          <span className="glow-emoji">{'🌷'}</span>
          <span className="glow-emoji">{'🌺'}</span>
          <span className="glow-emoji">{'🌷'}</span>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a8d8ff]">
            Aloha, mi amor
          </p>
          <h1 className="font-display neon-text text-5xl leading-tight text-white">
            Para Amiara
          </h1>
          <p className="text-pretty text-base leading-relaxed text-[#d6ecff]">
            {'Una sorpresa aterrizó desde otro planeta solo para ti 👽💙'}
          </p>
        </div>

        <button
          type="button"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId)
            onGesture?.()
            start()
          }}
          onPointerUp={() => {
            onGesture?.()
            stop()
          }}
          onPointerCancel={stop}
          onLostPointerCapture={stop}
          onKeyDown={(e) => {
            if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
              e.preventDefault()
              onGesture?.()
              start()
            }
          }}
          onKeyUp={(e) => {
            if (e.key === ' ' || e.key === 'Enter') stop()
          }}
          onContextMenu={(e) => e.preventDefault()}
          aria-label="Mantén presionado para abrir tu sorpresa"
          className="group flex touch-none select-none flex-col items-center gap-5 rounded-3xl outline-none [-webkit-touch-callout:none] focus-visible:ring-2 focus-visible:ring-[#5ef2ff]"
        >
          <motion.span
            animate={{ scale: holding ? 0.94 : done ? 1.12 : 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
            className="relative flex size-40 items-center justify-center"
          >
            {!holding && !done && (
              <>
                <span className="animate-pulse-ring absolute inset-3 rounded-full border-2 border-[#5ef2ff]" />
                <span
                  className="animate-pulse-ring absolute inset-3 rounded-full border-2 border-[#ffb6d9]"
                  style={{ animationDelay: '0.9s' }}
                />
              </>
            )}

            <svg viewBox="0 0 140 140" className="absolute inset-0 -rotate-90" aria-hidden="true">
              <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="rgb(94 242 255 / 0.18)" strokeWidth="8" />
              <circle
                cx="70"
                cy="70"
                r={RADIUS}
                fill="none"
                stroke="url(#unlock-grad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
                style={{
                  transition: holding ? 'none' : 'stroke-dashoffset 0.45s ease-out',
                  filter: 'drop-shadow(0 0 6px rgb(94 242 255 / 0.9))',
                }}
              />
              <defs>
                <linearGradient id="unlock-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#5ef2ff" />
                  <stop offset="100%" stopColor="#ffb6d9" />
                </linearGradient>
              </defs>
            </svg>

            <span className="relative flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-[#5ef2ff] via-[#5b8def] to-[#ffb6d9] shadow-[0_0_30px_rgb(94_242_255/0.8),inset_0_0_20px_rgb(255_255_255/0.4)]">
              <Heart
                className="size-12 fill-white text-white drop-shadow-[0_0_8px_rgb(255_255_255/0.9)]"
                aria-hidden="true"
              />
            </span>
          </motion.span>

          <span className="max-w-[16rem] text-balance text-lg font-bold leading-snug text-white">
            {done
              ? '¡Sorpresa desbloqueada! 💙'
              : 'Mantén presionado para abrir tu sorpresa 💙'}
          </span>
          <span className="sr-only" aria-live="polite">
            {done ? 'Sorpresa desbloqueada' : ''}
          </span>
        </button>

        <p className="text-xs text-[#a8d8ff]/80">
          {holding ? `${Math.ceil((1 - progress) * 3)}...` : 'Mantén 3 segundos'}
        </p>
      </motion.div>
    </motion.section>
  )
}
