'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const SONG_SRC = '/music/its-been-a-long-long-time.mp3'
const VOLUME = 0.6
const GESTURE_EVENTS = ['pointerup', 'touchend', 'click', 'keydown'] as const

export function useAmbientMusic() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const wantsPlayRef = useRef(false)
  const primedRef = useRef(false)
  const retryRef = useRef<(() => void) | null>(null)

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(SONG_SRC)
      audio.loop = true
      audio.preload = 'auto'
      audio.volume = VOLUME
      audio.addEventListener('play', () => setPlaying(!audio.muted))
      audio.addEventListener('pause', () => setPlaying(false))
      audio.addEventListener('volumechange', () => setPlaying(!audio.paused && !audio.muted))
      audioRef.current = audio
    }
    return audioRef.current
  }, [])

  const clearRetry = useCallback(() => {
    if (!retryRef.current) return
    GESTURE_EVENTS.forEach((type) => document.removeEventListener(type, retryRef.current!, true))
    retryRef.current = null
  }, [])

  // Mobile browsers only allow audio that was started during a user gesture.
  // Calling this from the long-press handlers "unlocks" the audio element so
  // the song can start by itself once the surprise opens.
  const prime = useCallback(() => {
    if (primedRef.current || wantsPlayRef.current) return
    const audio = getAudio()
    audio.muted = true
    audio
      .play()
      .then(() => {
        primedRef.current = true
        if (!wantsPlayRef.current) {
          audio.pause()
          audio.currentTime = 0
        }
        audio.muted = false
      })
      .catch(() => {
        audio.muted = false
      })
  }, [getAudio])

  const play = useCallback(() => {
    wantsPlayRef.current = true
    const audio = getAudio()
    audio.muted = false
    audio
      .play()
      .then(clearRetry)
      .catch(() => {
        setPlaying(false)
        if (retryRef.current) return
        const retry = () => {
          if (!wantsPlayRef.current) return clearRetry()
          audio.muted = false
          audio.play().then(clearRetry).catch(() => {})
        }
        retryRef.current = retry
        GESTURE_EVENTS.forEach((type) => document.addEventListener(type, retry, true))
      })
  }, [getAudio, clearRetry])

  const pause = useCallback(() => {
    wantsPlayRef.current = false
    clearRetry()
    audioRef.current?.pause()
  }, [clearRetry])

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play])

  useEffect(
    () => () => {
      clearRetry()
      audioRef.current?.pause()
      audioRef.current = null
    },
    [clearRetry],
  )

  return { playing, play, prime, toggle }
}
