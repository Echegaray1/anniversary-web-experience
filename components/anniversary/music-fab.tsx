'use client'

import { motion } from 'framer-motion'
import { Music, Music2 } from 'lucide-react'

export function MusicFab({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <div className="app-frame pointer-events-none z-50">
      <motion.button
        type="button"
        onClick={onToggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pausar música' : 'Reproducir música'}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileTap={{ scale: 0.85 }}
        className="pointer-events-auto absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 flex size-14 items-center justify-center rounded-full border-2 border-[#5ef2ff] bg-gradient-to-br from-[#5b8def] to-[#ffb6d9] shadow-[0_0_22px_rgb(94_242_255/0.8)]"
      >
        {playing && (
          <span className="animate-pulse-ring absolute inset-0 rounded-full border-2 border-[#5ef2ff]" />
        )}
        <motion.span
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { duration: 3, repeat: Infinity, ease: 'linear' } : { duration: 0.4 }}
          className="flex"
        >
          {playing ? (
            <Music2 className="size-6 text-white" aria-hidden="true" />
          ) : (
            <Music className="size-6 text-white opacity-80" aria-hidden="true" />
          )}
        </motion.span>
      </motion.button>
    </div>
  )
}
