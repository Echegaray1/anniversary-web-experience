'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const NOTE: Record<string, number> = {
  C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.0, A4: 440.0,
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99,
  C3: 130.81, F3: 174.61, G3: 196.0, A3: 220.0,
}

// A soft, ukulele-like island lullaby (original melody), one note per beat.
const MELODY = [
  'E5', 'D5', 'C5', 'A4', 'G4', 'A4', 'C5', null,
  'D5', 'E5', 'G5', 'E5', 'D5', 'C5', 'D5', null,
  'E5', 'D5', 'C5', 'A4', 'G4', 'E4', 'G4', null,
  'A4', 'C5', 'D5', 'C5', 'A4', 'G4', 'C5', null,
]
const BASS = ['C3', 'A3', 'F3', 'G3']
const BEAT = 0.38

export function useAmbientMusic() {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const timerRef = useRef<number | null>(null)
  const stepRef = useRef(0)

  const pluck = (ctx: AudioContext, out: AudioNode, freq: number, at: number, dur: number, vol: number) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.0001, at)
    gain.gain.exponentialRampToValueAtTime(vol, at + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur)
    osc.connect(gain).connect(out)
    osc.start(at)
    osc.stop(at + dur + 0.05)
  }

  const play = useCallback(() => {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return
    const ctx = ctxRef.current ?? new Ctx()
    ctxRef.current = ctx
    if (!masterRef.current) {
      masterRef.current = ctx.createGain()
      masterRef.current.connect(ctx.destination)
    }
    const master = masterRef.current
    void ctx.resume()
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.setTargetAtTime(0.18, ctx.currentTime, 0.3)

    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      const step = stepRef.current++
      const at = ctx.currentTime + 0.05
      const note = MELODY[step % MELODY.length]
      if (note) {
        pluck(ctx, master, NOTE[note], at, 0.9, 0.35)
        pluck(ctx, master, NOTE[note] * 2, at, 0.4, 0.05)
      }
      if (step % 8 === 0) {
        const bass = BASS[Math.floor(step / 8) % BASS.length]
        pluck(ctx, master, NOTE[bass], at, BEAT * 7, 0.3)
        pluck(ctx, master, NOTE[bass] * 1.5, at + BEAT * 2, BEAT * 4, 0.12)
      }
    }, BEAT * 1000)
    setPlaying(true)
  }, [])

  const pause = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = null
    const ctx = ctxRef.current
    if (ctx && masterRef.current) masterRef.current.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.2)
    setPlaying(false)
  }, [])

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play])

  useEffect(
    () => () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
      void ctxRef.current?.close()
    },
    [],
  )

  return { playing, play, toggle }
}
