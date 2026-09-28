'use client'

import { useCallback, useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useAmbientMusic } from '@/hooks/use-ambient-music'
import { EdgeDecorations } from './edge-decorations'
import { FinaleFireworks } from './finale-fireworks'
import { MemoriesContent } from './memories-content'
import { MusicFab } from './music-fab'
import { StarryBackground } from './starry-background'
import { TapBubbles, type Bubble } from './tap-bubbles'
import { UnlockScreen } from './unlock-screen'

const BUBBLE_EMOJIS = ['🌷', '💙', '🌷', '💙', '🌷']
const MAX_BUBBLES = 24

export function AnniversaryExperience() {
  const [unlocked, setUnlocked] = useState(false)
  const [finale, setFinale] = useState(false)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const idRef = useRef(0)
  const music = useAmbientMusic()

  const spawn = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target.closest('button, a, [role="dialog"], [data-no-spawn]')) return
    const id = idRef.current++
    const bubble: Bubble = {
      id,
      x: e.clientX,
      y: e.clientY,
      emoji: BUBBLE_EMOJIS[id % BUBBLE_EMOJIS.length],
      drift: Math.random() * 50 - 25,
    }
    setBubbles((prev) => [...prev.slice(-MAX_BUBBLES + 1), bubble])
    window.setTimeout(() => setBubbles((prev) => prev.filter((b) => b.id !== id)), 1900)
  }, [])

  const handleUnlock = useCallback(() => {
    setUnlocked(true)
    music.play()
  }, [music])

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh bg-[radial-gradient(ellipse_at_top,#0d1450,#03051a_70%)]">
        <div onPointerDown={spawn} className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden select-none">
          <StarryBackground />
          <EdgeDecorations />

          <AnimatePresence mode="wait">
            {unlocked ? (
              <MemoriesContent key="content" onFinale={() => setFinale(true)} />
            ) : (
              <UnlockScreen key="unlock" onUnlock={handleUnlock} onGesture={music.prime} />
            )}
          </AnimatePresence>

          {unlocked && <MusicFab playing={music.playing} onToggle={music.toggle} />}
        </div>

        <TapBubbles bubbles={bubbles} />
        <FinaleFireworks open={finale} onClose={() => setFinale(false)} />
      </div>
    </MotionConfig>
  )
}
