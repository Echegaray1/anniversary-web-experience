'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Camera, Heart, MousePointerClick, Palmtree, Sparkles } from 'lucide-react'
import { PolaroidGallery } from './polaroid-gallery'
import { TypewriterLetter } from './typewriter-letter'

function SectionTitle({ icon, eyebrow, title }: { icon: ReactNode; eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.28em] text-[#ffb6d9]">
        {icon}
        {eyebrow}
      </span>
      <h2 className="font-display neon-text text-3xl text-white">{title}</h2>
    </div>
  )
}

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 90, damping: 16 } },
}

export function MemoriesContent({ onFinale }: { onFinale: () => void }) {
  return (
    <motion.main
      key="content"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }}
      className="relative z-20 flex flex-col gap-14 px-5 pb-32 pt-16"
    >
      <motion.header variants={reveal} className="flex flex-col items-center gap-3 text-center">
        <span className="glass flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-[#a8d8ff]">
          <Palmtree className="size-4 text-[#5ef2ff]" aria-hidden="true" />
          {'Noche hawaiana · 1 mes juntos'}
        </span>
        <h1 className="font-display neon-text text-balance text-5xl leading-tight text-white">
          {'Nuestro 1er Mes'}
        </h1>
        <p className="font-display pink-glow-text text-3xl text-[#ffb6d9]">{'Amiara 💙'}</p>
        <p className="mt-1 flex items-center gap-2 rounded-full bg-[#070b34]/50 px-4 py-2 text-sm text-[#d6ecff]">
          <MousePointerClick className="size-4 text-[#5ef2ff]" aria-hidden="true" />
          Toca la pantalla para hacer brotar tulipanes
        </p>
      </motion.header>

      <motion.section variants={reveal} aria-labelledby="memories-title" className="flex flex-col gap-2">
        <div id="memories-title">
          <SectionTitle
            icon={<Camera className="size-3.5" aria-hidden="true" />}
            eyebrow="Recuerdos"
            title="Nuestros momentos"
          />
        </div>
        <div className="-mx-5">
          <PolaroidGallery />
        </div>
      </motion.section>

      <motion.section variants={reveal} aria-labelledby="letter-title" className="flex flex-col gap-8">
        <div id="letter-title">
          <SectionTitle
            icon={<Heart className="size-3.5 fill-current" aria-hidden="true" />}
            eyebrow="Una carta"
            title="Para mi niña"
          />
        </div>
        <TypewriterLetter />
      </motion.section>

      <motion.section variants={reveal} className="flex flex-col items-center gap-5 text-center">
        <div className="glass flex items-center gap-3 rounded-2xl px-5 py-3">
          <Sparkles className="size-5 text-[#fff4b8]" aria-hidden="true" />
          <p className="text-sm font-semibold text-[#d6ecff]">
            {'Ohana significa familia 🌺'}
          </p>
        </div>

        <motion.button
          type="button"
          onClick={onFinale}
          whileTap={{ scale: 0.92 }}
          animate={{
            boxShadow: [
              '0 0 20px rgb(94 242 255 / 0.6), 0 0 50px rgb(255 182 217 / 0.35)',
              '0 0 34px rgb(94 242 255 / 0.95), 0 0 80px rgb(255 182 217 / 0.6)',
              '0 0 20px rgb(94 242 255 / 0.6), 0 0 50px rgb(255 182 217 / 0.35)',
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full overflow-hidden rounded-full border-2 border-white/70 bg-gradient-to-r from-[#5ef2ff] via-[#5b8def] to-[#ffb6d9] px-8 py-5 text-xl font-bold text-white [text-shadow:0_1px_8px_rgb(7_11_52/0.6)]"
        >
          {'Terminar sorpresa 🌺'}
        </motion.button>
        <p className="text-xs text-[#a8d8ff]/80">{'Hecho con todo mi amor, de mí para ti'}</p>
      </motion.section>
    </motion.main>
  )
}
