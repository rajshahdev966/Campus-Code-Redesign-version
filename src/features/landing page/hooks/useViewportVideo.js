import { useEffect, useRef, useState } from 'react'

export default function useViewportVideo() {
  const videoRef = useRef(null)
  const visibleRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let scrollTimer

    const playWhenSettled = () => {
      window.clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(() => {
        if (visibleRef.current && !document.hidden && !reducedMotion.matches) {
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
      }
    }, { threshold: 0.55 })

    const syncVisibility = () => {
      if (document.hidden || reducedMotion.matches) video.pause()
      else if (visibleRef.current) playWhenSettled()
    }
    observer.observe(video)
    document.addEventListener('visibilitychange', syncVisibility)
    reducedMotion.addEventListener('change', syncVisibility)
    window.addEventListener('scroll', playWhenSettled, { passive: true })
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncVisibility)
      reducedMotion.removeEventListener('change', syncVisibility)
      window.removeEventListener('scroll', playWhenSettled)
      window.clearTimeout(scrollTimer)
      video.pause()
    }
  }, [])

  async function startPlayback() {
    try { await videoRef.current.play() }
    catch { setPlaying(false) }
  }

  function toggleSound() {
    const nextMuted = !videoRef.current.muted
    videoRef.current.muted = nextMuted
    setMuted(nextMuted)
  }

  return { videoRef, playing, muted, setPlaying, startPlayback, toggleSound }
}
