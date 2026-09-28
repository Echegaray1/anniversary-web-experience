'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const SONG_SRC = '/music/its-been-a-long-long-time.mp3'
const VOLUME = 0.6

export function useAmbientMusic() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(SONG_SRC)
      audio.loop = true
      audio.preload = 'auto'
      audio.volume = VOLUME
      audio.addEventListener('play', () => setPlaying(true))
      audio.addEventListener('pause', () => setPlaying(false))
      audioRef.current = audio
    }
    return audioRef.current
  }

  const play = useCallback(() => {
    getAudio()
      .play()
      .catch(() => setPlaying(false))
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play])

  useEffect(
    () => () => {
      audioRef.current?.pause()
      audioRef.current = null
    },
    [],
  )

  return { playing, play, toggle }
}
