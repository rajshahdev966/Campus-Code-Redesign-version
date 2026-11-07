import { useEffect, useRef, useState } from 'react'

export default function useViewportVideo() {
  const videoRef = useRef(null)
  const visibleRef = useRef(false)
  const pausedByUser = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let scrollTimer

    const playWhenSettled = () => {
      window.clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => {
        if (visibleRef.current && !pausedByUser.current && !reducedMotion.matches) {
          video.play().catch(() => {
            // Keep the play button available when the browser blocks autoplay.
          })
        }
      }, 180)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.55
      if (visibleRef.current) {
        playWhenSettled()
      } else {
        window.clearTimeout(scrollTimer)
        video.pause()
        pausedByUser.current = false
      }
    }, { threshold: 0.55 })

    observer.observe(video)
    window.addEventListener('scroll', playWhenSettled, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', playWhenSettled)
      window.clearTimeout(scrollTimer)
      video.pause()
    }
  }, [])

  async function togglePlayback() {
    const video = videoRef.current
    if (video.paused) {
      pausedByUser.current = false
      try {
        await video.play()
      } catch {
        video.controls = true
      }
    } else {
      pausedByUser.current = true
      video.pause()
    }
  }

  function toggleSound() {
    const nextMuted = !videoRef.current.muted
    videoRef.current.muted = nextMuted
    setMuted(nextMuted)
  }

  return { videoRef, playing, muted, setPlaying, togglePlayback, toggleSound }
}
