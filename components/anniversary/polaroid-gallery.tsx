'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { Flower2, Hand, Sparkle, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

type Memory = {
  src: string
  caption: string
  quote: string
  tilt: number
}

// Replace each `src` with your Stitch GIFs (e.g. /memories/stitch-1.gif).
const MEMORIES: Memory[] = [
  {
    src: '/memories/stitch-placeholder.svg',
    caption: 'Nuestro primer recuerdo',
    quote: 'Desde que llegaste, todo brilla un poquito más, como las estrellas sobre Hawái.',
    tilt: -3,
  },
  {
    src: '/memories/stitch-placeholder.svg',
    caption: 'Tu sonrisa',
    quote: 'Tu sonrisa es mi lugar favorito en todo el universo, y en todos los planetas.',
    tilt: 2.5,
  },
  {
    src: '/memories/stitch-placeholder.svg',
    caption: 'Nuestra Ohana',
    quote: 'Contigo quiero seguir sumando días, meses y aventuras. Esto apenas comienza.',
    tilt: -2,
  },
]

function Polaroid({
  memory,
  active,
  onTap,
}: {
  memory: Memory
  active: boolean
  onTap: () => boolean
}) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    if (!active) setFlipped(false)
  }, [active])

  return (
    <motion.button
      type="button"
      onClick={() => {
        if (onTap()) setFlipped((f) => !f)
      }}
      aria-label={`${memory.caption}. Toca para ${flipped ? 'ver la foto' : 'leer el mensaje'}`}
      aria-pressed={flipped}
      animate={{ scale: active ? 1 : 0.86, rotate: active ? memory.tilt : memory.tilt * 2, opacity: active ? 1 : 0.6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="relative mx-auto block w-full max-w-[250px] select-none outline-none [perspective:1200px] focus-visible:ring-2 focus-visible:ring-[#5ef2ff]"
    >
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 z-20 h-6 w-20 -translate-x-1/2 rotate-[-4deg] rounded-sm bg-[#ffb6d9]/70 shadow-[0_0_10px_rgb(255_182_217/0.6)]"
      />
      <motion.span
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 90, damping: 14 }}
        className="relative block aspect-[4/5] w-full [transform-style:preserve-3d]"
      >
        <span className="absolute inset-0 flex flex-col rounded-md bg-[#fdfbff] p-3 pb-0 shadow-[0_0_24px_rgb(94_242_255/0.55),0_16px_40px_rgb(3_6_30/0.6)] [backface-visibility:hidden]">
          <img
            src={memory.src || '/placeholder.svg'}
            alt={memory.caption}
            draggable={false}
            className="aspect-square w-full rounded-sm bg-[#a8d8ff] object-cover"
          />
          <span className="flex flex-1 items-center justify-center font-display text-xl text-[#1b2a78]">
            {memory.caption}
          </span>

          <span aria-hidden="true" className="pointer-events-none">
            <Star className="absolute -left-2 top-8 size-5 fill-[#fff4b8] text-[#e6c95c] drop-shadow" />
            <Sparkle className="absolute -right-2 top-20 size-5 fill-[#5ef2ff] text-[#2aa9c4]" />
            <Flower2 className="absolute bottom-3 left-3 size-5 text-[#ff8fc4]" />
            <span className="absolute bottom-2 right-3 text-lg">{'🌷'}</span>
            <span className="absolute -right-3 -top-2 text-lg">{'👽'}</span>
            <Star className="absolute bottom-12 -left-2.5 size-4 fill-[#ffb6d9] text-[#ff8fc4]" />
          </span>
        </span>

        <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-md border-2 border-[#5ef2ff] bg-gradient-to-br from-[#0d1a66] via-[#1b3a92] to-[#2b7fb8] p-6 text-center shadow-[0_0_28px_rgb(94_242_255/0.7)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span aria-hidden="true" className="text-3xl">{'💙'}</span>
          <span className="text-pretty font-display text-xl leading-relaxed text-white neon-text">
            {`“${memory.quote}”`}
          </span>
          <span aria-hidden="true" className="flex gap-2 text-lg">
            <span>{'🌷'}</span>
            <span>{'✨'}</span>
            <span>{'🌷'}</span>
          </span>
        </span>
      </motion.span>
    </motion.button>
  )
}

export function PolaroidGallery() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const [width, setWidth] = useState(0)
  const [index, setIndex] = useState(0)
  const x = useMotionValue(0)

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const controls = animate(x, -index * width, { type: 'spring', stiffness: 260, damping: 30 })
    return () => controls.stop()
  }, [index, width, x])

  const goTo = (i: number) => setIndex(Math.max(0, Math.min(MEMORIES.length - 1, i)))

  return (
    <div className="flex flex-col gap-4">
      <div ref={viewportRef} className="overflow-hidden py-6">
        <motion.div
          drag="x"
          style={{ x }}
          dragConstraints={{ left: -(MEMORIES.length - 1) * width, right: 0 }}
          dragElastic={0.18}
          onDragStart={() => {
            draggingRef.current = true
          }}
          onDragEnd={(_, info) => {
            const swipe = info.offset.x + info.velocity.x * 0.2
            const threshold = width / 5
            if (swipe < -threshold) goTo(index + 1)
            else if (swipe > threshold) goTo(index - 1)
            else animate(x, -index * width, { type: 'spring', stiffness: 260, damping: 30 })
            window.setTimeout(() => {
              draggingRef.current = false
            }, 60)
          }}
          className="flex touch-pan-y cursor-grab active:cursor-grabbing"
        >
          {MEMORIES.map((memory, i) => (
            <div key={i} className="w-full shrink-0 px-10" style={{ width: width || '100%' }}>
              <Polaroid
                memory={memory}
                active={i === index}
                onTap={() => {
                  if (draggingRef.current) return false
                  if (i !== index) {
                    goTo(i)
                    return false
                  }
                  return true
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Recuerdos">
        {MEMORIES.map((m, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={m.caption}
            onClick={() => goTo(i)}
            className="flex size-8 items-center justify-center"
          >
            <span
              className={cn(
                'block h-2.5 rounded-full transition-all duration-300',
                i === index
                  ? 'w-7 bg-[#5ef2ff] shadow-[0_0_10px_#5ef2ff]'
                  : 'w-2.5 bg-[#a8d8ff]/40',
              )}
            />
          </button>
        ))}
      </div>

      <p className="flex items-center justify-center gap-2 text-sm text-[#a8d8ff]">
        <Hand className="size-4" aria-hidden="true" />
        Desliza y toca una foto para voltearla
      </p>
    </div>
  )
}
