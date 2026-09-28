'use client'

import { AnimatePresence, motion } from 'framer-motion'

export type Bubble = { id: number; x: number; y: number; emoji: string; drift: number }

export function TapBubbles({ bubbles }: { bubbles: Bubble[] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {bubbles.map((b) => (
          <motion.span
            key={b.id}
            className="absolute"
            style={{ left: b.x, top: b.y }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="absolute -left-6 -top-6 size-12 rounded-full border-2 border-[#5ef2ff]"
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <motion.span
              className="glow-emoji absolute -left-4 -top-5 block text-3xl"
              initial={{ scale: 0, y: 0, x: 0, rotate: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.4, 1],
                y: -180,
                x: [0, b.drift, -b.drift / 2, b.drift],
                rotate: b.drift > 0 ? 20 : -20,
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            >
              {b.emoji}
            </motion.span>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
