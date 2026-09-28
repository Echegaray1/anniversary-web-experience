'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Mail, RotateCcw } from 'lucide-react'

const LETTER =
  "¡Feliz 1er Mes, Amiara! 💙 En este corto tiempo te has convertido en alguien sumamente especial. Tú ya eres un lugar seguro para mí. Como dice Stitch: 'Ohana significa familia, y la familia nunca te abandona'. Te quiero muchísimo mi niña."

const TYPE_SPEED_MS = 45

export function TypewriterLetter() {
  const chars = useMemo(() => Array.from(LETTER), [])
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, amount: 0.4 })
  const [count, setCount] = useState(0)
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (!inView) return
    setCount(0)
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= chars.length) {
          window.clearInterval(id)
          return c
        }
        return c + 1
      })
    }, TYPE_SPEED_MS)
    return () => window.clearInterval(id)
  }, [inView, run, chars.length])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [count])

  const finished = count >= chars.length

  return (
    <div ref={containerRef} className="glass relative rounded-[2rem] p-5">
      <div className="absolute -top-5 left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#5ef2ff] bg-[#ffb6d9] shadow-[0_0_16px_rgb(255_182_217/0.8)]">
        <Mail className="size-5 text-[#1b2a78]" aria-hidden="true" />
      </div>

      <div className="mb-3 mt-3 flex items-center justify-between">
        <h3 className="font-display text-2xl text-white pink-glow-text">Querida Amiara</h3>
        <span aria-hidden="true" className="text-xl">{'🌺'}</span>
      </div>

      <div
        ref={scrollRef}
        className="max-h-64 overflow-y-auto rounded-2xl border border-[#a8d8ff]/40 bg-[#070b34]/45 p-4"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgb(168 216 255 / 0.16) 31px, rgb(168 216 255 / 0.16) 32px)',
        }}
      >
        <p className="sr-only">{LETTER}</p>
        <p aria-hidden="true" className="min-h-40 text-pretty text-lg font-medium leading-8 text-[#eefcff]">
          {chars.slice(0, count).join('')}
          <span className="animate-caret ml-0.5 inline-block h-5 w-0.5 translate-y-1 bg-[#5ef2ff] shadow-[0_0_8px_#5ef2ff]" />
        </p>
        {finished && (
          <p className="mt-4 text-right font-display text-xl text-[#ffb6d9] pink-glow-text">
            {'— Con todo mi amor 💙'}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-[#a8d8ff]">
        <span aria-hidden="true" className="flex gap-1">
          <span>{'🌷'}</span>
          <span>{'👽'}</span>
          <span>{'🌷'}</span>
        </span>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          disabled={!finished}
          className="flex items-center gap-1.5 rounded-full border border-[#5ef2ff]/60 px-4 py-2 font-semibold text-[#5ef2ff] transition active:scale-95 disabled:opacity-40"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Leer de nuevo
        </button>
      </div>
    </div>
  )
}
